interface Command {
    title: string
    desc: string
}

interface Language {
    intro: string,
    command: { [index: string]: Command}
    day: Array<string>
}
const language: {[index: string]: Language} = {
    id: {
        intro: "Perkenalkan Saya adalah Mesin Cuci Assistance",
        command: {
            history: {
                title: 'Riwayat : \n',
                desc: 'Memperlihatkan daftar riwayat pemakaian mesin cuci selama 12 jam terakhir.'
            },
            book_list: {
                title: 'Pemesanan : \n',
                desc: 'Memperlihatkan daftar urutan pemesanan.'
            }
        },
        day: ['sen', 'sel', 'rab', 'kam', 'jum', 'sab', 'ming']
    },
    en: {
        intro: "i am mesincucibot assistance",
        command: {
            history: {
                title: 'History : \n',
                desc: 'Showing a list of washing machine usage history for the past 12 hours.'
            }
        },
        day: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']
    }
}

export {language}