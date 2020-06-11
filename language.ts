interface Command {
    title: string
    desc: string
}

interface Language {
    intro: string,
    command: { [index: string]: Command}
}
const language: {[index: string]: Language} = {
    'id': {
        intro: "Perkenalkan Saya adalah Mesin Cuci Assistance",
        command: {
            history: {
                title: 'History : \n',
                desc: 'Memperlihatkan daftar riwayat pemakaian mesin cuci selama 12 jam terakhir.'
            }
        }
    },
    'en': {
        'intro': "i am mesincucibot assistance",
        'command': {
            history: {
                desc: 'Checking history for 12 hour ago.',
                title: 'Showing a list of washing machine usage history for the past 12 hours.'
            }
        }
    }
}

export {language}