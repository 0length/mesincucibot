import { Bot, Context } from "https://deno.land/x/telegram/mod.ts"
import { token } from './token.ts'
import { language } from './language.ts'
import { commands } from './commands.ts'
import { Database } from './database.ts'

const bot = new Bot(token);
const db = new Database()
await db.initial()
// const settings = await db.getSetting('active_lang')
const active_lang = await db.getSetting('active_lang')

bot.start(async (ctx: Context) => {
  ctx.reply(language[(active_lang as string)].intro)
})

commands.forEach((command) => {
    bot.command(command.cmd, async (ctx: Context)=>{ ctx.message && command.action(ctx, active_lang) })
});

commands.forEach((command) => {
  bot.command(command.cmd+'@mesincucibot', async (ctx: Context)=>{ ctx.message && command.action(ctx, active_lang) })
});



bot.launch()