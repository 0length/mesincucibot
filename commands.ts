import { Context } from "https://deno.land/x/telegram/mod.ts"
import { language } from './language.ts'
import { Database } from './database.ts'
const db = new Database()

interface Command {
    cmd: string
    desc: string
    action: any
}
interface TimeReminder {
    [index: string]: number
}

const timeRiminder: TimeReminder ={'/30m':1800000, '/1h': 3600000, '/1.5h': 5400000 , '/2h':7200000 , '/2.5h': 9000000 }
const getUsername = (ctx: Context)=>(ctx.message?.from?.username?'@'+ctx.message.from.username:'unknow')
const commands: Array<Command> = [
    {
        cmd: 'history',
        desc: 'history',
        action: async (ctx: Context, active_lang: string)=>{
            ctx.reply(`
            ${language[(active_lang as string)].command.history.title}
            ${
                (await db.getHistory()).map(({id, name, time}: any, idx: number)=>((`\r\n\r\n${++idx}. ${name} ${time}`)))
            }
            `.split(',').join(''))
        }
    },
    {
        cmd: 'book_list',
        desc: 'key_holder',
        action:async (ctx: Context, active_lang: string)=>{
            ctx.reply(`
            ${language[(active_lang as string)].command.book_list.title}
            ${
                (await db.getBook()).map(({id, name}: any, idx: number)=>((`\r\n\r\n${++idx}. ${name} `)))
            }
            `.split(',').join(''))
        }
    },
    {
        cmd: 'book',
        desc: 'key_holder',
        action:async (ctx: Context, active_lang: string)=>{
            if(await db.cekBook(getUsername(ctx)).length<1){
                await db.setBook(getUsername(ctx))
                ctx.reply(`added to book list`)
            }else{
                ctx.reply(`already add to book list`)
            }
        }
    },
    {
        cmd: 'cancel',
        desc: 'key_holder',
        action:async (ctx: Context, active_lang: string)=>{
            if(await db.cekBook(getUsername(ctx)).length<1){
                ctx.reply(`never booked before`)
            }else{
                await db.delBook(getUsername(ctx))
                ctx.reply(`removed from book list`)
            }
        }
    },
    {
        cmd: 'be_key_bearer',
        desc: 'update_lang',
        action: async(ctx: Context)=>{
            await db.setSetting('key_bearer', getUsername(ctx))
            ctx.reply(getUsername(ctx)+' is the key bearer now')
        }
    },
    {
        cmd: 'key_bearer',
        desc: 'update_lang',
        action:async (ctx: Context)=>{
            ctx.reply((await db.getSetting('key_bearer'))+' is the key bearer now')
        }
    },
    {
        cmd: 'checkin',
        desc: 'checkin',
        action:async (ctx: Context)=>{
            if (ctx.message !== undefined && ctx.chat !== undefined) {
                if(!await db.getSetting('using_by').length){
                    await ctx.telegram.sendMessage({
                        chatId: ctx.chat.id,
                        text: '`One step again to Complete. Please Chose the time.`',
                        params: {
                            parse_mode: 'Markdown',
                            reply_to_message_id: ctx.message.message_id,
                            reply_markup: {
                                keyboard: [ ...Object.keys(timeRiminder).map((text: string)=>([{text}]))],
                                one_time_keyboard: true,
                                resize_keyboard: true,
                                remove_keyboard: true,
                                selective: true
                            },
                        }
                    })
                }else{
                    ctx.reply('Whasing machine is busy, you can /book to use next')
                }
                
            }
        }
    },
    ...Object.keys(timeRiminder).map((key: string)=>({
        cmd: key.substr(1),
        desc: 'reminder',
        action: async (ctx: Context, active_lang: string)=>{
            if(await db.cekBook(getUsername(ctx)).length<1){
                ctx.reply(`never booked before. but its okay`)
            }else{
                await db.delBook(getUsername(ctx))
                ctx.reply(`moved from book list to using`)
            }
            await db.setSetting('using_by', getUsername(ctx))
            await db.setSetting('start_from', `${language[active_lang].day[new Date().getDay()]} ${new Date().getHours()}.${new Date().getMinutes()} `)
            setTimeout(async() => {
                if (ctx.message !== undefined && ctx.chat !== undefined) {
                    await ctx.telegram.sendMessage({
                        chatId: ctx.chat.id,
                        text: "`@"+getUsername(ctx)+" 's laundry might be finished.",
                        params: {
                            parse_mode: 'Markdown',
                            reply_to_message_id: ctx.message.message_id,
                            reply_markup: {
                                keyboard: [[{text:'/checkout'}]],
                                one_time_keyboard: true,
                                resize_keyboard: true,
                                remove_keyboard: true,
                                selective: true
                            },
                        }
                    })
                } 
            }, 3000);
        }
    })),
    {
        cmd: 'checkout',
        desc: 'checkout',
        action:async (ctx: Context)=>{
            if (ctx.message !== undefined && ctx.chat !== undefined) {
                await db.setHistory(getUsername(ctx),`( ${await db.getSetting('start_from')}- ${new Date().getHours()}.${new Date().getMinutes()} )`)
                await db.setSetting('using_by','no body')
                await db.setSetting('start_from','not started yet')
                if(await db.getBook().length>0){
                    ctx.reply(await db.getBook()[0][1]+' can use now')
                }
                await ctx.telegram.sendMessage({
                    chatId: ctx.chat.id,
                    text: '`monospace`',
                    params: {
                        parse_mode: 'Markdown',
                        reply_to_message_id: ctx.message.message_id,
                        reply_markup: {
                            keyboard: [[{text:'no reminder'}], ...Object.keys(timeRiminder).map((text: string)=>([{text}]))],
                            one_time_keyboard: true,
                            resize_keyboard: true,
                            remove_keyboard: true,
                            selective: true
                        },
                    }
                })
            }
        }
    }
]

export { commands }