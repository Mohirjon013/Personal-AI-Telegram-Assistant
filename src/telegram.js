import { TelegramClient} from "telegram"
import { StringSession } from "telegram/sessions/index.js";
import input from "input";
import fs from "fs";
import path from "path";

import config from "./config.js";

const sessionPath = path.join("sessions", "telegram.session");
const savedSession = fs.existsSync(sessionPath) ? fs.readFileSync(sessionPath, "utf8") : "";
const stringSession = new StringSession(savedSession);

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
    const session = client.session.save();
    
    fs.writeFileSync(sessionPath, session, "utf8");
    
    console.log("✅ Telegram connected");
}