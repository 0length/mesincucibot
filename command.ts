export interface Command {
    cmd: string
    desc: string
    action: any
}

const command: Array<Command> = [
    {
        cmd: '',
        desc: 'history',
        action:''
    },
    {
        cmd: '',
        desc: 'key_holder',
        action:''
    },
    {
        cmd: '',
        desc: 'update_lang',
        action:''
    },
    {
        cmd: '',
        desc: 'checkin',
        action:''
    },
    {
        cmd: '',
        desc: 'book',
        action:''
    },
    {
        cmd: '',
        desc: 'list_book',
        action:''
    },
]

export { command }