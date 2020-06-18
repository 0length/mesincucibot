import { Bot, Context, config } from './deps.ts'
import { language } from './language.ts'
import { commands } from './commands.ts'
import { Database } from './database.ts'

const bot = new Bot(config()['TOKEN'].toString())
const db = new Database()

const active_lang = await db.getSetting('active_lang')
const bot_name = config()['BOT_NAME'].toString()
bot.start(async (ctx: Context) => {
  ctx.reply(language[(active_lang as string)].intro)
})

commands.forEach((command) => {
  bot.command(command.cmd+bot_name, async (ctx: Context)=>{
    ctx.message && command.action(ctx, active_lang, bot_name)
  })
});

['help'+bot_name].map((item: string)=>{
  bot.command(item, async (ctx: Context)=>{
    ctx.reply(`
    Command List : \r\n\r\n\
    ${
      commands.map(({cmd, desc}, index)=>{
        return ++index + `. ${
          language[(active_lang as string)].command[desc].title
        } (/${cmd+bot_name})\r\n${
          language[(active_lang as string)].command[desc].desc
        }\r\n\r\n`
      })
    }
    `.split(',').join(''))
  })
})


bot.launch()