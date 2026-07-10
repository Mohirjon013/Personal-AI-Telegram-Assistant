import { TelegramClient} from "telegram"
import { StringSession } from "telegram/sessions/index.js"; // Bu login holatini saqlash uchun.
import { NewMessage } from "telegram/events/NewMessage.js"; // telegramdan kelgan new xabarni etib turadi
import { handleNewMessage } from "./handlers/message.handlers.js";
import input from "input";
import fs from "fs";
import path from "path";

import config from "./config.js";

const sessionPath = path.join("sessions", "telegram.session"); // Session qaysi faylda saqlanishini aytyapmiz.
const savedSession = fs.existsSync(sessionPath) ? fs.readFileSync(sessionPath, "utf8") : ""; // session bormi or not , agar bosa oqidi
const stringSession = new StringSession(savedSession); // Bu yerda GramJS uchun session object yaratyapmiz.

const client = new TelegramClient(
    stringSession,
    config.telegram.apiId,
    config.telegram.apiHash,
    {
        connectionRetries:5
    }
);

export default client;


export async function startTelegram(){
    await client.start({
        phoneNumber:async () => {
            return await input.text("📱 Phone number: ")
        },
        password: async () => {
            return await input.text("🔐 Password (if enabled): ")
        },
        phoneCode: async () => {
            return await input.text("💬 Verification code: ")
        },
        onError: (error) => {
            console.log(error);   
        }
    })

    client.addEventHandler(handleNewMessage,new NewMessage({})) // Qaysi eventlarni tinglash kerak?

    const session = client.session.save();
    
    fs.writeFileSync(sessionPath, session, "utf8");
    
    console.log("✅ Telegram connected");
}