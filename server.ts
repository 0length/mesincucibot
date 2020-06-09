import { Bot, Context } from "https://deno.land/x/telegram/mod.ts"
import { DB } from "https://deno.land/x/sqlite/mod.ts"
import { token } from './token.ts'
import { language } from './language.ts'
// import { command } from './command.ts'

const db = new DB('')

// Creating Table for Setting
db.query('CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, value TEXT)')

// Creating Table for History
db.query('CREATE TABLE IF NOT EXISTS histories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')

// Seeding Settings
db.query("INSERT INTO settings (key, value) VALUES (?, ?)", ['language', 'id']);

const bot = new Bot(token)

for (const jos of db.query("SELECT value FROM settings where key='language'"))
console.log(jos);

// setting = {active_lang}

// console.log(settings);

// bot.start((ctx: Context) => {
//   ctx.reply(language[(settings.active_lang as string)].intro)
// })

// bot.launch()