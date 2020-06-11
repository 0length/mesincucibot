import { Context } from "https://deno.land/x/telegram/mod.ts"
import { language } from './language.ts'
import { Database } from './database.ts'
const db = new Database()

export interface Command {
    cmd: string
    desc: string
    action: any
}
const commands: Array<Command> = [
    {
        cmd: 'history',
        desc: 'history',
        action: async (ctx: Context, active_lang: string)=>{
            ctx.reply(`
            ${language[(active_lang as string)].command.history.title}
            ${
                (await db.getHistory()).map(({id, name, time}: any)=>((`\r\n\r\n${id}. ${name} ${time}`)))
            }
            `.split(',').join(''))
        }
    },
    {
        cmd: 'book',
        desc: 'key_holder',
        action:(ctx: Context)=>{

        }
    },
    {
        cmd: 'be_key_bearer',
        desc: 'update_lang',
        action: async(ctx: Context)=>{
            const name = ctx && ctx.message && ctx.message.from && ctx.message.from.username?'@'+ctx.message.from.username:'unknow'
            await db.setSetting('key_bearer', name)
            ctx.reply(name+' is the key bearer now')
        }
    },
    {
        cmd: 'key_bearer',
        desc: 'update_lang',
        action:async (ctx: Context)=>{
            ctx.reply((await db.getSetting('key_bearer'))+' is the key bearer now')
        }
    },
    // {
    //     cmd: '',
    //     desc: 'checkin',
    //     action:(ctx: Context)=>{}
    // },
    // {
    //     cmd: '',
    //     desc: 'book',
    //     action:(ctx: Context)=>{}
    // },
    // {
    //     cmd: '',
    //     desc: 'list_book',
    //     action:(ctx: Context)=>{}
    // },
]

export { commands }