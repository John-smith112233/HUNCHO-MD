const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVA0ZEMzaFZQOWozSFNNbXFlMEhBVllsNUJCS1F5MDFZMm53VHpFeE9uaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibTgwRVJDODZjNFFxVnMwMmlTd1NMS1RnWFgydStxNlY4OVBJVTU2S2EwND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Q2ZUblhJcVdkZWcvZDlpOVdvK0N2aGNtUDFRckM1REpWV1F1Z1o3YUVVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqY0tKM3RmSXcxUlNOSmVsdGNDZy84RXZaa1JCOVAvSnY4QXUwbGE1dlhrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVHd3lPcEZTQzJhSlZEclNqNHhRQVNVdTlMQll2SDQ3TUxWdTYzMWNrV0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlZUjgyMC9GVW5UblR5RDdtL0dzbXdVU3dFSjVLR0N5UHRTTnY1Y2lObmM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0phNldQclZISCtiajB1MjdydzdkbVhCNnNsQXdNczc5clgvMWYzVDczYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmJEMTJYTEcrWHFsdHJsMy9pS0MxUDVvRXBpMDgydWZFWE1xU2cyM3pSTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdzYVBzVmJVMDVvQUxwWjJaRVV0dEU4ZGJSRG1XRmJ1N2x5cTNUZmZKNXlEN0NoZHJ5M1JNODhuYWhzc1dMM2VxYnZsTzM4WXpDck1wbDh0OXpTdEF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMsImFkdlNlY3JldEtleSI6Im1LREd5cS9xNDdsNnVuUWErWVJKSVdQSFVNZWcwQTZ1bUtONXFIS21SejA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InJaa3pTMW1HUnR5QVR6Qkt5Y25iRlEiLCJwaG9uZUlkIjoiOTdkOWRlZGYtNzlkYi00ZmU2LTk4NzYtNWFlMDE0YWUxMjU5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVjczB6SDUybWZGeVlGMURFYi9oWUFaNFBNTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZeitXak9CUVF1dlRadkVBR2VicTZXVmx3Unc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiM1RRNVhSQzMiLCJtZSI6eyJpZCI6IjIzMzUzMTcyNTE2MDo1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPekFzb0lERU9DdzA3TUdHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI1ZW9reWpidUs1alIzN1NhVjdDTGRkSVhHL1U2UVBpSEc1MmlwOHk1MnpFPSIsImFjY291bnRTaWduYXR1cmUiOiJxSHVBYWdpdWsxeHJIdmpZdnlEUUZvcWFvTkdZUmxYL3NFZWUzV3pzRCtHUG9KTFp5ZUZ1S1ZiZjJ4RFg3MDRxL0o1bThtQ05haWdWVzVXT1BWSVlEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQytqbWVwMGNrd1JubW5wK0FWSkkvR2FKUGV2d0s5dmFTZDM4V0p6TFhydWJpajRmSnFJMlcvODAwSzBzc2QxMVBXdE9WaTVJZDFqSG9QQmhlTzd2Q3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1MzE3MjUxNjA6NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlWHFKTW8yN2l1WTBkKzBtbGV3aTNYU0Z4djFPa0Q0aHh1ZG9xZk11ZHN4In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE4OTMzNjEzfQ==',
    PREFIXE: process.env.PREFIX || "/",
    OWNER_NAME: process.env.OWNER_NAME || "❌‿❌➳ᴹᴿ᭄ⅅÇ⚔️ ℒøℛⅅ ℬℛëëℤᎽ✧❤乂",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "233531725160",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '❌‿❌➳ᴹᴿ᭄ⅅÇ⚔️ ℒøℛⅅ ℬℛëëℤᎽ✧❤乂 MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
