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
        intro: "Perkenalkan Saya adalah Mesin Cuci Assistance",
        command: {
            history: {
                title: 'Daftar Riwayat : \n',
                desc: 'Memperlihatkan daftar riwayat pemakaian mesin cuci selama 12 jam terakhir.',
                other:{

                }
            },
            book_list: {
                title: 'Daftar Pemesanan : \n',
                desc: 'Memperlihatkan daftar urutan pemesanan.',
                other:{

                }
            },
            book: {
                title: 'Pemesanan',
                desc: '',
                other: {
                    added: 'di tambahkan ke daftar pemesan',
                    already: 'sudah pernah memesan'
                }
            },
            cancle: {
                title: '',
                desc: '',
                other: {
                    never: 'belum pernah memesan sebelumnya',
                    removed: `Sudah di hapus dari daftar pesanan`
                }
            },
            be_key_bearer: {
                title: '',
                desc: '',
                other: {
                    is: ' adalah pembawa kunci',
                }
            },
            key_bearer: {
                title: '',
                desc: '',
                other: {
                    is: ' adalah pembawa kunci',
                }
            },
            checkin: {
                title: '',
                desc: '',
                other: {
                    on_step_again: '`Satu langkah lagi. Pilih jangka waktu penggunaan`',
                    is_used_by: 'Mesin cuci sedang di pakai oleh',
                    you_can_book: 'anda bisa /book (memesan) untuk menggunakan selanjutnya dan  /book_list (daftar pesanan ) untuk melihat daftar pesanan.',
                }
            },
            reminder:{
                title: '',
                desc: '',
                other: {
                    never: '`belum pernah booking sebelumnya. tapi ndak papa`',
                    moved: '`dipindahkan dari daftar pesanan menjadi pemakai`',
                    might_finish: " memiliki cucian yang mungkin sudah selesai",
                }
            },
            checkout:{
                title: '',
                desc: '',
                other: {
                    get_rest: '`Mesin cuci sudah menganggur`',
                    can_use: ' bisa menggunakan sekarang'
                }
            }
        },
        day: ['sen', 'sel', 'rab', 'kam', 'jum', 'sab', 'ming']
    },
    en: {
        intro: "i am mesincucibot assistance",
        command: {
            history: {
                title: 'History : \n',
                desc: 'Showing a list of washing machine usage history for the past 12 hours.',
                other:{

                }
            },
            book_list: {
                title: 'Booking list : \n',
                desc: 'Showing booking list.',
                other:{

                }
            },
            book: {
                title: 'Booking',
                desc: '',
                other: {
                    added: 'added to book list',
                    already: 'already add to book list'
                }
            },
            cancle: {
                title: '',
                desc: '',
                other: {
                    never: 'booked before',
                    removed: `removed from book list`
                }
            },
            be_key_bearer: {
                title: '',
                desc: '',
                other: {
                    is: ' is the key bearer now',
                }
            },
            key_bearer: {
                title: '',
                desc: '',
                other: {
                    is: ' is the key bearer now',
                }
            },
            checkin: {
                title: '',
                desc: '',
                other: {
                    on_step_again: '`One step again to Complete. Please Chose the time.`',
                    is_used_by: 'Whasing machine washing machine is in use by',
                    you_can_book: 'you can /book first to use it next and /book_list to see sequence of your turn.',
                }
            },
            reminder:{
                title: '',
                desc: '',
                other: {
                    never: '`never booked before. but its okay`',
                    moved: '`moved from book list to using`',
                    might_finish: "'s laundry might be finished.",
                }
            },
            checkout:{
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