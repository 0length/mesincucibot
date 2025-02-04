import { config } from './deps.ts'
interface Command {
    title: string
    desc: string
    other: {[index: string]: string}
}

interface Language {
    intro: string,
    command: { [index: string]: Command}
    day: Array<string>
}
const language: {[index: string]: Language} = {
    id: {
        intro: "Perkenalkan Saya adalah Mesin Cuci Assistance. /help"+config()['BOT_NAME'].toString()+" untuk melihat command list.",
        command: {
            'history': {
                title: 'Daftar Riwayat',
                desc: 'Memperlihatkan daftar riwayat pemakaian mesin cuci selama 12 jam terakhir.',
                other:{

                }
            },
            'book_list': {
                title: 'Daftar Pemesanan',
                desc: 'Memperlihatkan daftar urutan pemesanan.',
                other:{

                }
            },
            'book': {
                title: 'Pemesanan',
                desc: 'Melakukan pemesanan.',
                other: {
                    added: '✔️ di tambahkan',
                    already: 'sudah pernah memesan',
                    used: 'tidak bisa memesan lagi. karena sedang menggunakan',
                    get_rest: 'Mesin cuci sedang meng🍷 anda bisa /checkin sekarang',
                }
            },
            'cancel': {
                title: 'Batal',
                desc: 'Membatalkan Pesanan.',
                other: {
                    never: 'belum pernah memesan sebelumnya',
                    removed: `Sudah di ❌ dari daftar pesanan`
                }
            },
            'be_key_bearer': {
                title: 'Menjadi pembawa Kunci',
                desc: 'Menjadi pembawa 🔑 agar tidak susah mencari.',
                other: {
                    is: ' adalah pembawa 🔑',
                }
            },
            'key_bearer': {
                title: 'Melihat pembawa Kunci',
                desc: 'Melihat siapa yang pembawa 🔑.',
                other: {
                    is: ' adalah pembawa 🔑.',
                }
            },
            'checkin': {
                title: 'Mulai',
                desc: 'Mulai menggunakan mesin cuci.',
                other: {
                    on_step_again: 'Satu langkah lagi. Pilih ⏰ penggunaan',
                    is_used_by: 'Mesin cuci sedang di pakai oleh',
                    you_can_book: 'anda bisa /book (memesan) untuk menggunakan selanjutnya dan  /book_list (daftar pesanan ) untuk melihat daftar pesanan.',
                }
            },
            'reminder':{
                title: 'Waktu Pengingat',
                desc: 'Hanya dapat dilakukan bila sudah /checkin .',
                other: {
                    never_check: 'belum pernah checkin sebelumnya, tolong /checkin dulu. ',
                    never: 'belum pernah booking sebelumnya, tapi ndak papa.',
                    moved: 'dipindahkan dari daftar pesanan menjadi pemakai.',
                    might_finish: " memiliki 🧺 yang mungkin sudah selesai. 🔔",
                    checkin: '✔️ checkin.'
                }
            },
            'checkout':{
                title: 'Selesai',
                desc: 'Menyelesaikan pengunaan.',
                other: {
                    get_rest: ' Mesin cuci sudah meng🍷.',
                    can_use: ' bisa /checkin sekarang',
                    no_use: ' anda memang belum menggunakan',
                    checkout: '✔️ checkout.'
                }
            },
            'force_checkout':{
                title: 'Paksa Selesai',
                desc: 'Menyelesaikan pengunaan secara pakasa (dapat dilakukan siapapun).',
                other: {
                    get_rest: ' Mesin cuci sudah meng🍷.',
                    can_use: ' bisa /checkin sekarang',
                    no_use: ' anda memang belum menggunakan',
                    checkout: '✔️ checkout.'
                }
            }
        },
        day: ['sen', 'sel', 'rab', 'kam', 'jum', 'sab', 'ming']
    },
    en: {
        intro: "i am mesincucibot assistance",
        command: {
            'history': {
                title: 'History : \n',
                desc: 'Showing a list of washing machine usage history for the past 12 hours.',
                other:{

                }
            },
            'book_list': {
                title: 'Booking list : \n',
                desc: 'Showing booking list.',
                other:{

                }
            },
            'book': {
                title: 'Booking',
                desc: '',
                other: {
                    added: 'added to book list',
                    already: 'already add to book list',
                    used: 'tidak bisa memesan lagi. karena sedang menggunakan',
                    get_rest: 'Whasing machine is not in use, you can /checkin now.',
                }
            },
            'cancle': {
                title: '',
                desc: '',
                other: {
                    never: 'booked before',
                    removed: `removed from book list`
                }
            },
            'be_key_bearer': {
                title: '',
                desc: '',
                other: {
                    is: ' is the key bearer now',
                }
            },
            'key_bearer': {
                title: '',
                desc: '',
                other: {
                    is: ' is the key bearer now',
                }
            },
            'checkin': {
                title: '',
                desc: '',
                other: {
                    on_step_again: '`One step again to Complete. Please Chose the time.`',
                    is_used_by: 'Whasing machine washing machine is in use by',
                    you_can_book: 'you can /book first to use it next and /book_list to see sequence of your turn.',
                }
            },
            'reminder':{
                title: '',
                desc: '',
                other: {
                    never: '`never booked before. but its okay`',
                    moved: '`moved from book list to using`',
                    might_finish: "'s laundry might be finished.",
                    checkin: 'Success checkin.'
                }
            },
            'checkout':{
                title: '',
                desc: '',
                other: {
                    get_rest: '`Washing Machin is get rest.`',
                    can_use: ' can use now'
                }
            }
        },
        day: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']
    }
}

export {language}