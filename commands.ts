import { Context, config } from "./deps.ts"
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
const no= async (key: string)=>((await db.getSetting(key))+''==='no body')
const noUsed = ()=>no('using_by')
const noWannaCheck = ()=>no('wanna_check')

const reset = (key: string)=>db.setSetting(key, 'no body')
const resetUsed = ()=>reset('using_by')
const resetWannaCheck = ()=>reset('wanna_check')

const commands: Array<Command> = [
    {
        cmd: 'history',
        desc: 'history',
        action: async (ctx: Context, active_lang: string)=>{
            ctx.reply(`
            ${language[(active_lang as string)].command.history.title}: \n
            ${
                (await db.getHistory()).map(({id, name, time}: any, idx: number)=>((`\r\n\r\n${++idx}. ${name} ${time}`)))
            }
            `.split(',').join(''))
        }
    },
    {
        cmd: 'book_list',
        desc: 'book_list',
        action:async (ctx: Context, active_lang: string)=>{
            ctx.reply(`
            ${language[(active_lang as string)].command.book_list.title} : \n
            ${
                (await db.getBook()).map(({id, name}: any, idx: number)=>((`\r\n\r\n${++idx}. ${name} `)))
            }
            `.split(',').join(''))
        }
    },
    {
        cmd: 'book',
        desc: 'book',
        action:async (ctx: Context, active_lang: string)=>{
            if((await db.cekBook(getUsername(ctx))).length<1){
                if((await db.getSetting('using_by')+'')===getUsername(ctx)) return ctx.reply(language[(active_lang as string)].command.book.other['used'])
                await db.setBook(getUsername(ctx))
                ctx.reply(language[(active_lang as string)].command.book.other['added'])
                if(await noUsed() && ((await db.getBook())[0].name+'' === getUsername(ctx))){
                    ctx.reply(language[(active_lang as string)].command.book.other['get_rest'])
                }
            }else{
                ctx.reply(language[(active_lang as string)].command.book.other['already'])
            }
        }
    },
    {
        cmd: 'cancel',
        desc: 'cancel',
        action:async (ctx: Context, active_lang: string)=>{
            if((await db.cekBook(getUsername(ctx))).length<1){
                ctx.reply(language[(active_lang as string)].command.cancel.other['never'])
            }else{
                await db.delBook(getUsername(ctx))
                ctx.reply(language[(active_lang as string)].command.cancel.other['removed'])
            }
        }
    },
    {
        cmd: 'be_key_bearer',
        desc: 'be_key_bearer',
        action: async(ctx: Context, active_lang: string)=>{
            await db.setSetting('key_bearer', getUsername(ctx))
            ctx.reply(getUsername(ctx)+language[(active_lang as string)].command.be_key_bearer.other['is'])
        }
    },
    {
        cmd: 'key_bearer',
        desc: 'key_bearer',
        action:async (ctx: Context, active_lang: string)=>{
            ctx.reply((await db.getSetting('key_bearer'))+language[(active_lang as string)].command.key_bearer.other['is'])
        }
    },
    {
        cmd: 'checkin',
        desc: 'checkin',
        action:async (ctx: Context, active_lang: string)=>{
            if (ctx.message !== undefined && ctx.chat !== undefined) {
                if(await noUsed()){
                    await db.setSetting('wanna_check', getUsername(ctx))
                    await ctx.telegram.sendMessage({
                        chatId: ctx.chat.id,
                        text: language[(active_lang as string)].command.checkin.other['on_step_again'],
                        params: {
                            parse_mode: 'Markdown',
                            reply_to_message_id: ctx.message.message_id,
                            reply_markup: {
                                keyboard: [ ...Object.keys(timeRiminder).map((text: string)=>([{text: text+config()['BOT_NAME'].toString()}]))],
                                one_time_keyboard: true,
                                resize_keyboard: true,
                                remove_keyboard: true,
                                selective: true
                            },
                        }
                    })
                }else{
                    ctx.reply(
                        `${
                            language[(active_lang as string)].command.checkin.other['is_used_by']
                        } ${
                            await db.getSetting('using_by')
                        }, ${
                            language[(active_lang as string)].command.checkin.other['you_can_book']
                        }`
                    )
                }
            }
        }
    },
    ...Object.keys(timeRiminder).map((key: string)=>({
        cmd: key.substr(1),
        desc: 'reminder',
        action: async (ctx: Context, active_lang: string)=>{

            if((await noWannaCheck())||(await db.getSetting('wanna_check')+''!==getUsername(ctx))){
                return ctx.reply(language[(active_lang as string)].command.reminder.other['never_check'])
            }

            await resetWannaCheck()

            if((await db.cekBook(getUsername(ctx))).length<1){
                ctx.reply(language[(active_lang as string)].command.reminder.other['never'])
            }else{
                await db.delBook(getUsername(ctx))
                ctx.reply(language[(active_lang as string)].command.reminder.other['moved'])
            }

            await db.setSetting('using_by', getUsername(ctx))

            await db.setSetting('start_from', `${language[active_lang].day[new Date().getDay()]} ${new Date().getHours()}.${new Date().getMinutes()<10?'0'+new Date().getMinutes():new Date().getMinutes()} `)
            ctx.reply(language[(active_lang as string)].command.reminder.other['checkin'])
            setTimeout(async() => {
                if (ctx.message !== undefined && ctx.chat !== undefined) {
                    await ctx.telegram.sendMessage({
                        chatId: ctx.chat.id,
                        text: getUsername(ctx)+language[(active_lang as string)].command.reminder.other['might_finish'],
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
            }, timeRiminder[key]);
        }
    })),
    {
        cmd: 'checkout',
        desc: 'checkout',
        action:async (ctx: Context, active_lang: string)=>{
            if (ctx.message !== undefined && ctx.chat !== undefined) {
                if((await db.getSetting('using_by')+''!==getUsername(ctx)))
                {
                    return ctx.reply(language[(active_lang as string)].command.checkout.other['no_use'])
                }

                await db.setHistory(getUsername(ctx),`( ${await db.getSetting('start_from')}- ${new Date().getHours()}.${new Date().getMinutes()} )`)
                await resetUsed()
                await db.setSetting('start_from','not started yet')
                ctx.reply(language[(active_lang as string)].command.checkout.other['checkout'])
                await ctx.telegram.sendMessage({
                    chatId: ctx.chat.id,
                    text: language[(active_lang as string)].command.checkout.other['get_rest'],
                    params: {
                        parse_mode: 'Markdown',
                        reply_to_message_id: ctx.message.message_id,
                    }
                })
                
                if((await db.getBook()).length>0){
                    ctx.reply((await db.getBook())[0].name+language[(active_lang as string)].command.checkout.other['can_use'])
                }
            }
        }
    },
    {
        cmd: 'force_checkout',
        desc: 'force_checkout',
        action:async (ctx: Context, active_lang: string)=>{
            if (ctx.message !== undefined && ctx.chat !== undefined) {
                await db.setHistory(getUsername(ctx),`( ${await db.getSetting('start_from')}- ${new Date().getHours()}.${new Date().getMinutes()} )`)
                await resetUsed()
                await db.setSetting('start_from','not started yet')
                ctx.reply(language[(active_lang as string)].command.checkout.other['checkout'])
                await ctx.telegram.sendMessage({
                    chatId: ctx.chat.id,
                    text: language[(active_lang as string)].command.checkout.other['get_rest'],
                    params: {
                        parse_mode: 'Markdown',
                        reply_to_message_id: ctx.message.message_id,
                    }
                })
                
                if((await db.getBook()).length>0){
                    ctx.reply((await db.getBook())[0].name+language[(active_lang as string)].command.checkout.other['can_use'])
                }
            }
        }
    }
]

export { commands }