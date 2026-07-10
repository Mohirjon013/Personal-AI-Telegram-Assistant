import dotenv from "dotenv";
dotenv.config();

import pool from "./database.js";
import { startTelegram } from "./telegram.js";



async function testConnection() {
    try{
        const result = await pool.query("SELECT NOW()")

        console.log("✅ Database connected: ", result.rows[0]);
    }
    catch(error){
        console.log("❌ Database connection error:", error.message);
    }
}

console.log("🚀 Mohirjon AI is starting...");
testConnection();


await startTelegram()