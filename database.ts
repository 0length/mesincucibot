import { DB } from "https://deno.land/x/sqlite/mod.ts"
import * as log from "https://deno.land/std/log/mod.ts"
import { initSetting } from './setting.ts'
/** Sqlite Database */
export class Database {

    private readonly _db = new DB(this._name)
    private _logger = log;

    /** Send query to db */
    private async _query(q: string, p: Array<any>=[]): Promise<any>{
        return [...await this._db.query(q, p)]
    }

    constructor(private readonly _name: string = 'storage/database.db') {
    }

    /** Initial Runner */
    public async initial(): Promise<void> {
        this._logger.info(`Initialising for new Tables`)
        await this._migration()
        this._logger.info(`Seeding default data`)
        await this._seed()
    }
  
    /** Retrive Setting value by key */
    public async getSetting(key: string): Promise<any>{
        for (const value of [...await this._query(`SELECT value FROM settings where key='${key}'`)])
        return value
    }

    /** Update Setting value by key */
    public async setSetting(key: string, newVal: string): Promise<any>{
        for (const value of [...await this._query(`UPDATE settings SET value='${newVal}' where key='${key}'`)])
        return value
    }

    /** Add new History */
    public setHistory(name: string, time: string): Promise<any>{
        return this._query("INSERT INTO histories (name, time ) VALUES (?, ?)", [name, time])
    }

    /** Retrive History */
    public async getHistory(): Promise<any>{
        let result: any[] = []
        for (const [id, name, time ] of [...await this._query(`SELECT * FROM histories`)])
        result = [...result, {id, name, time}]
        return result
    }

     /** Add new Book */
     public setBook(name: string): Promise<any>{
        return this._query("INSERT INTO books (name) VALUES (?)", [name])
    }

    /** Retrive Books */
    public async getBook(): Promise<any>{
        let result: any[] = []
        for (const [id, name] of [...await this._query(`SELECT * FROM books`)])
        result = [...result, {id, name}]
        return result
    }

    public cekBook(name: string): Promise<any>{  
        return this._query(`SELECT * FROM books WHERE name='${name}'`)
    }

    /** Remove Book */
    public async delBook(name: string): Promise<any>{
        for (const value of [...await this._query(`DELETE FROM books WHERE name='${name}'`)])
        return value
    }

    /** Remove Book */
    public resetHistory(): Promise<any>{
        return this._query(`DELETE FROM histories`)
    }

    private async _migration(): Promise<void>{
        // Creating Table for Setting
        await this._query('CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, value TEXT)')
        // Creating Table for History
        await this._query('CREATE TABLE IF NOT EXISTS histories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, time TEXT)')
        // Creating Table for Book
        await this._query('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')
    }

    private async _seed(): Promise<void>{
        this._logger.info(`- Seeding for Setting`)
        for(const key of Object.keys(initSetting))
        await this._query("INSERT INTO settings (key, value) VALUES (?, ?)", [key, initSetting[key]]);
        // this._logger.info(`- Seeding for Histories`)
        // await this._query("INSERT INTO histories (name, time ) VALUES (?, ?)", ['@brunonovenus', '( sel 20.30-00.30 )']);
        // await this._query("INSERT INTO histories (name, time ) VALUES (?, ?)", ['@njoel', '( sel 20.30-00.30 )']);
        // await this._query("INSERT INTO histories (name, time ) VALUES (?, ?)", ['@mesincucibot', '( sel 20.30-00.30 )']);

    }
}