/*Pawachan and Ben*/
/*Recode from Khaelsan 😎*/

const { GroupSettingChange, WAMessageProto, MessageType, prepareMessageFromContent, relayWAMessage,  processTime } = require('@adiwajshing/baileys')
const { exec } = require('child_process');
const axios = require('axios')
const fs = require('fs')
let FormData = require('form-data')
const afkJs = require('./lib/afk')
const moment = require('moment-timezone');
const { mess, menu, ingfo, donate, hargaprem } = require('./lib/text')
const { color, getBuffer, convertMp3 } = require('./lib/func')
const fetchJson = require ('./lib/fetcher.js')


moment.tz.setDefault('Asia/Jayapura').locale('id');
module.exports = handle = (client, Client) => {
    try {
        /*DOWNLOADER*/
        Client.cmd.on('ytmp4', async (data) => {
            try {
                if(isLimit(data.sender)) return data.reply(mess.limit)
                if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}ytmp4 [ link ]*\nContoh : ${data.prefix}ytmp4 https://www.youtube.com/watch?v=0maWbr0FHKY`)
                data.reply(mess.wait)
                res = await axios.get(`${configs.apiUrl}/api/ytmp4/2?apikey=${configs.zeksKey}&url=${data.body}`)
                if(res.data.status == false) data.reply(res.data.message)
                ytm = res.data.result
                teks = `*Data berhasil didapatkan!*\n\n*Judul* : ${ytm.title}\n*Ukuran* : ${ytm.size}\n*Kualitas* : ${ytm.quality}\n*Ext* : ${ytm.ext}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                if(Number(ytm.size.split(' MB')[0]) >= 50.00) return Client.sendFileFromUrl(data.from, `${ytm.thumb}`, 'thumb.jpg', `*Data Berhasil Didapatkan!*\n\n*Title* : ${ytm.title}\n*Ukuran* : ${ytm.size}\n*Kualitas* : ${ytm.quality}\n*Ext* : mp4\n*Link* : ${ytm.link}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, data.message)
                Client.sendFileFromUrl(data.from, `${ytm.thumb}`, 'thumb.jpg', teks, data.message)
                Client.sendFileFromUrl(data.from, `${ytm.link}`, `${ytm.title} - Download.mp4`, mess.succes, data.message)
            } catch {
                data.reply(mess.error2)
            }
        })
        Client.cmd.on('ytmp3', async (data) => {
            try {
                if(isLimit(data.sender)) return data.reply(mess.limit)
                if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}ytmp3 [ link ]*\nContoh : ${data.prefix}ytmp3 https://www.youtube.com/watch?v=0maWbr0FHKY`)
                data.reply(mess.wait)
                res = await axios.get(`${configs.apiUrl}/api/ytmp3/2?apikey=${configs.zeksKey}&url=${data.body}`)
                if(res.data.status == false) data.reply(res.data.message)
                ytm = res.data.result
                teks = `*Data berhasil didapatkan!*\n\n*Judul* : ${ytm.title}\n*Ukuran* : ${ytm.size}\n*Kualitas* : ${ytm.quality}\n*Ext* : ${ytm.ext}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                if(Number(ytm.size.split(' MB')[0]) >= 50.00) return Client.sendFileFromUrl(data.from, `${ytm.thumb}`, 'thumb.jpg', `*Data Berhasil Didapatkan!*\n\n*Title* : ${ytm.title}\n*Ukuran* : ${ytm.size}\n*Kualitas* : ${ytm.quality}\n*Ext* : mp3\n*Link* : ${ytm.link}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, data.message)
                Client.sendFileFromUrl(data.from, `${ytm.thumb}`, 'thumb.jpg', teks, data.message)
                Client.sendFileFromUrl(data.from, `${ytm.link}`, `${ytm.title} - Download.mp3`, ``, data.message)
            } catch {
                data.reply(mess.error2)
            }
        })
        Client.cmd.on('playvid', async (data) => {
            try {
                if(isLimit(data.sender)) return data.reply(mess.limit)
                if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}playvid [ query ]*\nContoh : ${data.prefix}playvid amv`)
                data.reply(mess.wait)
                res = await axios.get(`${configs.apiUrl}/api/ytplaymp4/2?apikey=${configs.zeksKey}&q=${data.body}`)
                if(res.data.status == false) data.reply(res.data.message)
                ytm = res.data.result
                teks = `*Data berhasil didapatkan!*\n\n*Judul* : ${ytm.title}\n*Ukuran* : ${ytm.size}\n*Kualitas* : ${ytm.quality}\n*Ext* : ${ytm.ext}\n*Source* : ${ytm.source}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                if(Number(ytm.size.split(' MB')[0]) >= 50.00) return Client.sendFileFromUrl(data.from, `${ytm.thumb}`, 'thumb.jpg', `*Data Berhasil Didapatkan!*\n\n*Title* : ${ytm.title}\n*Ukuran* : ${ytm.size}\n*Kualitas* : ${ytm.quality}\n*Ext* : mp4\n*Source* : ${ytm.source}\n*Link* : ${ytm.link}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, data.message)
                Client.sendFileFromUrl(data.from, `${ytm.thumb}`, 'thumb.jpg', teks, data.message)
                Client.sendFileFromUrl(data.from, `${ytm.link}`, 'video.mp4', mess.succes, data.message)
            } catch (e) {
                data.reply(mess.error2)
            }
        })
        Client.cmd.on('play', async (data) => {
            try {
                if(isLimit(data.sender)) return data.reply(mess.limit)
                if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}play [ link ]*\nContoh : ${data.prefix}play alone`)
                data.reply(mess.wait)
                res = await axios.get(`${configs.apiUrl}/api/ytplaymp3/2?apikey=${configs.zeksKey}&q=${data.body}`)
                if(res.data.status == false) data.reply(res.data.message)
                ytm = res.data.result
                teks = `*Data berhasil didapatkan!*\n\n*Judul* : ${ytm.title}\n*Ukuran* : ${ytm.size}\n*Kualitas* : ${ytm.quality}\n*Ext* : ${ytm.ext}\n*Source* : ${ytm.source}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                if(Number(ytm.size.split(' MB')[0]) >= 50.00) return Client.sendFileFromUrl(data.from, `${ytm.thumb}`, 'thumb.jpg', `*Data Berhasil Didapatkan!*\n\n*Title* : ${ytm.title}\n*Ukuran* : ${ytm.size}\n*Kualitas* : ${ytm.quality}\n*Ext* : mp3\n*Source* : ${ytm.source}\n*Link* : ${ytm.link}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, data.message)
                Client.sendFileFromUrl(data.from, ytm.thumb, 'thumb.jpg', teks, data.message)
                Client.sendFileFromUrl(data.from, ytm.link, `${ytm.title} - Download.mp3`, ``, data.message)
            } catch {
                data.reply(mess.error2)
            }
        })
        Client.cmd.on('ig', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}ig [ link ]*\nContoh : ${data.prefix}ig https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
            data.reply(mess.wait) 
            getresult = await axios.get(`${configs.apiUrl}/api/ig?apikey=${configs.zeksKey}&url=${data.body}`)
            if(getresult.data.status == false) return data.reply(getresult.data.message)
            for(let i = 0; i < getresult.data.result.length; i++) {
                Client.sendFileFromUrl(data.from, getresult.data.result[i].url, `ig.${getresult.data.result[i].type}`, `*「IG DOWNLOADER」*\n\n*Username :* ${getresult.data.owner}\n*Caption :* ${getresult.data.caption}`, data.message);
            }
        })
        Client.cmd.on('fb', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ link ]*\nContoh : ${data.prefix}${data.command} https://www.facebook.com/TikTokPhilippinesOfficial/videos/248471300073210/`)
            data.reply(mess.wait) //https://api.lolhuman.xyz/api/facebook2?apikey=APIKEY&url=
            getresult = await axios.get(`${configs.lolUrl}/api/facebook2?apikey=${configs.LolKey}&url=${data.body}`)
            if(getresult.data.status == false) return data.reply(getresult.data.message)
                Client.sendFileFromUrl(data.from, getresult.data.result, '', `*「FB DOWNLOADER」*`, data.message);
        })
        Client.cmd.on('tiktok', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ link ]*\nContoh : ${data.prefix}${data.command} https://vt.tiktok.com/ZSwWCk5o/`)
            data.reply(mess.wait) //https://api.lolhuman.xyz/api/tiktok?apikey=P&url=https://vt.tiktok.com/ZSwWCk5o/
            getresult = await axios.get(`${configs.lolUrl}/api/tiktok?apikey=${configs.LolKey}&url=${data.body}`)
            if(getresult.data.status == false) return data.reply(getresult.data.message)
                Client.sendFileFromUrl(data.from, `${configs.dapUrl}/api/socialmedia/tiktoknowm?url=${data.body}&apikey=${configs.DapKey}`, 'tiktok.mp4', `*「TIKTOK DOWNLOADER」*\n\n*Author :* ${getresult.data.result.author.username}\n*Title :* ${getresult.data.result.title}\n*Keywords :* ${getresult.data.result.keywords}\n*Duration :* ${getresult.data.result.duration}`, data.message);
        })
        Client.cmd.on('igstory', async (data) => {
            try {
                if(isLimit(data.sender)) return data.reply(mess.limit)
                if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}igstory [ username ]*\nContoh : ${data.prefix}igstory jessnolimit`)
                data.reply(mess.wait)
                stomr = await axios.get(`${configs.apiUrl}/api/igs?apikey=${configs.zeksKey}&username=${data.body}`)
                if(stomr.data.status == false) return data.reply(stomr.data.message)
                for(let i = 0; i < stomr.data.data.length; i++) {
                    Client.sendFileFromUrl(data.from, stomr.data.data[i].url, `ig.${stomr.data.data[i].type}`, `「 INSTAGRAM 」\n\n*Username*: ${stomr.data.username}\n*Type*: ${stomr.data.data[i].type}`, data.message);
                }
            } catch {
                data.reply('Username tidak ditemukan')
            }
        })
        Client.cmd.on('joox', async (data) => {
            try {
                if(isLimit(data.sender)) return data.reply(mess.limit)
                if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}joox [ lagu ]*\nContoh : ${data.prefix}joox bad liar`)
                data.reply(mess.wait)
                res = await axios.get(`${configs.apiUrl}/api/joox?apikey=${configs.zeksKey}&q=${data.body}`)
                if(res.data.status == false) data.reply(jox.data.message)
                jox = res.data.data[0]
                teks = `*Data berhasil didapatkan!*\n\n*Judul* : ${jox.judul}\n*Artis* : ${jox.artist}\n*Album* : ${jox.album}\n*Ukuran* : ${jox.size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                Client.sendFileFromUrl(data.from, `${jox.thumb}`, 'thumb.jpg', teks, data.message)
                Client.sendFileFromUrl(data.from, `${jox.audio}`, 'audio.mp3', ``, data.message)
            } catch {
                data.reply('Maaf lagu tidak ditemukan')
            }
        })
        /*RANDOM*/
        Client.cmd.on('fml', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            res = await axios.get(`${configs.apiUrl}/api/fml?apikey=${configs.zeksKey}`)
            data.reply(res.data.result)
        })
        Client.cmd.on('randomquran', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            res = await axios.get(`${configs.apiUrl}/api/randomquran?apikey=${configs.zeksKey}`)
            rquran = res.data.result
            teks = `*Surah* : ${rquran.nama}\n*Arti* : ${rquran.arti}\n*Ayat* : ${rquran.asma}\n*Keterangan* : ${rquran.keterangan}`
            data.reply(teks)
            Client.sendFileFromUrl(data.from, rquran.audio, 'quran.mp3', ``, data.message)
        })
        Client.cmd.on('estetikpic', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            Client.sendFileFromUrl(data.from, `${configs.apiUrl}/api/estetikpic?apikey=${configs.zeksKey}`, 'estetik.jpg', ``, data.message)
        })
        Client.cmd.on('meme', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            res = await axios.get(`${configs.apiUrl}/api/memeindo?apikey=${configs.zeksKey}`)
            Client.sendFileFromUrl(data.from, res.data.result, 'p.jpg', ``, data.message)
        })
        Client.cmd.on('darkjoke', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            res = await axios.get(`${configs.apiUrl}/api/darkjokes?apikey=${configs.zeksKey}`)
            Client.sendFileFromUrl(data.from, res.data.result, 'p.jpg', ``, data.message)
        })
        Client.cmd.on('nickepep', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            res = await axios.get(`${configs.apiUrl}/api/nickepep?apikey=${configs.zeksKey}`)
            n = res.data.result
            nick = n[Math.floor(Math.random() * n.length)]
            data.reply(nick)
        })
        Client.cmd.on('quotes', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            res = await axios.get(`${configs.apiUrl}/api/quote?apikey=${configs.zeksKey}`)
            que = res.data.result
            teks = `*Author* : ${que.author}\n*Quotes* : ${que.quotes}`
            data.reply(teks)
        })
        Client.cmd.on('pantun', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            res = await axios.get(`${configs.apiUrl}/api/pantun?apikey=${configs.zeksKey}`)
            data.reply(res.data.result.pantun)
        })
        Client.cmd.on('limit', async (data) => {
            const dataUser = JSON.parse(fs.readFileSync('./lib/json/dataUser.json'))
            if(dataUser[data.sender].premium) return data.reply(`Hai @${data.sender.split('@')[0]} 👋🏻\nAnda adalah user premium yang memiliki akses tanpa batas limit!`)
            limits = configs.maxLimit - dataUser[data.sender].limit
            if(limits <= 0) return data.reply("```" + `Limit anda sudah habis` + "```")
            data.reply(`Hai @${data.sender.split('@')[0]} 👋🏻\n Limit anda tersisa ${limits || 30}\nLimit setiap hari di reset jam 00.00\nJika anda ingin mendapatkan unlimited limit silahkan beli premium di ketik: #hargaprem`)
        })
        Client.cmd.on('info', async (data) => {
		data.reply(ingfo)
		})
		Client.cmd.on('hargaprem', async (data) => {
		data.reply(hargaprem)
		})
		Client.cmd.on('donate', async (data) => {
		data.reply(donate)
		})
		Client.cmd.on('donasi', async (data) => {
		data.reply(donate)
		})
        /*OWNER*/
        Client.cmd.on('setpp', async (data) => {
            if(!data.isOwner) return data.reply(mess.ownerOnly)
            if(!data.isQuotedImage && data.type != 'imageMessage') return data.reply(`Wrong format!, please send image with caption ${data.prefix}setgroupicon, or reply image with ${data.prefix}setgroupicon`)
            const getbuff = data.isQuotedImage ? JSON.parse(JSON.stringify(data.message).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : data.message
            const dlfile = await client.downloadMediaMessage(getbuff)
            client.updateProfilePicture(client.user.jid, dlfile)
            data.reply(`success!, profile picture has been changed by @${data.sender.split('@')[0]}`)
        })
        Client.cmd.on('block', async (data) => {
            if(!data.isOwner) return data.reply(mess.ownerOnly)
            if(data.mentionedJidList.length == 0) return data.reply(`Kirim perintah *${data.prefix}${data.command} [ @tag ]*\nContoh : ${data.prefix}${data.command} @0`)
            data.mentionedJidList.forEach(jids => client.blockUser(jids, "add"))
            data.reply(`Succecs block @${data.mentionedJidList.join(' @').replace(/@s.whatsapp.net/g, '')}`)
        })
        Client.cmd.on('unblock', async (data) => {
            if(!data.isOwner) return data.reply(mess.ownerOnly)
            if(data.mentionedJidList.length == 0) return data.reply(`Kirim perintah *${data.prefix}${data.command} [ @tag ]*\nContoh : ${data.prefix}${data.command} @0`)
            data.mentionedJidList.forEach(jids => client.blockUser(jids, "remove"))
            data.reply(`Succecs unblock @${data.mentionedJidList.join(' @').replace(/@s.whatsapp.net/g, '')}`)
        })
        Client.cmd.on('addvn', async (data) => {
            if(!data.isOwner) return data.reply(mess.ownerOnly)
            if(!data.isQuotedAudio) return data.reply('Reply vn/audio!')
            if(data.body == "") return data.reply(`Kirim perintah ${data.prefix}addvn [ nama ]\nContoh ${data.command}addvn hai`)
            if(vn.includes(data.body)) return data.reply('Nama vn sudah ada, harap gunakan nama lain')
            nv = await data.downloadMediaQuotedMessage()
            fs.writeFileSync(`./lib/vn/${data.body}.mp3`, nv)
            global.vn.push(data.body)
            fs.writeFileSync('./lib/json/vn.json', JSON.stringify(vn))
            data.reply(`Berhasil menambahkan vn ${data.body} dari database`)
        })
        Client.cmd.on('delvn', async (data) => {
            if(!data.isOwner) return data.reply(mess.ownerOnly)
            if(data.body == "") return data.reply(`Kirim perintah ${data.prefix}addvn [ nama ]\nContoh ${data.command}addvn hai`)
            if(!vn.includes(data.body)) return data.reply('vn tidak ditemukan!')
            global.vn.splice(vn.indexOf(data.body), 1)
            fs.writeFileSync('./lib/json/vn.json', JSON.stringify(vn, null, 2))
            fs.unlinkSync(`./lib/vn/${data.body}.mp3`)
            data.reply(`Berhasil mengahpus vn ${data.body} dari database`)
        })
        Client.cmd.on('listvn', async (data) => {
            let listvn = 'Ketik nama vn untuk mendownload vn\n\n*List vn*:\n\n'
            vn.forEach((vnn, i) => listvn += `*${i+1}*. ${vnn}\n`)
            data.reply(listvn)
        })
        Client.cmd.on('tebakgambar', async (data) => {
			if(isLimit(data.sender)) return data.reply(mess.limit)
			if (global.tebakgambar[data.from] && global.tebakgambar[data.from].id) return data.reply("Masih ada soal yang berjalan")
            const getSoal = await axios.get(`${configs.apiUrl}/api/tebakgambar?apikey=${configs.zeksKey}`)
			ses = Date.now()
			send = await Client.sendFileFromUrl(data.from, getSoal.data.result.soal, "soal.jpg", "Waktu menjawab 30 detik!, gk bisa jawab donasi:v", data.message)
			global.tebakgambar[data.from] = {jawaban: getSoal.data.result.jawaban, id: ses}
			await sleep(10000)
			if (global.tebakgambar[data.from].id != ses) return
			Client.reply(data.from,"Waktu tersisa 20 detik", send)
			await sleep(10000)
			if (global.tebakgambar[data.from].id != ses) return
			Client.reply(data.from,"Waktu tersisa 10 detik", send)
			await sleep(10000)
			if (global.tebakgambar[data.from].id != ses) return
			Client.reply(data.from, "Waktu habis", send)
			Client.reply(data.from,`Jawabannya adalah: ${getSoal.data.result.jawaban}`, send)
			global.tebakgambar[data.from] = {}
			
        })
        Client.cmd.on('clearall', async (data) => {
            if(!data.isOwner) return data.reply(mess.ownerOnly)
            const getAll = await client.chats.all()
            getAll.forEach(async chats => {
                if(chats.jid.endsWith('@g.us')) await client.modifyChat(chats.jid, 'clear')
                else await client.modifyChat(chats.jid, 'delete')
            })
            console.log(color('[ INFO ]', 'cyan'), 'CLEAR ALL CHAT!')
            data.reply('Succes Clear All Chat')
        })
        Client.cmd.on('resetlimit', async (data) => {
            if(!data.isOwner) return data.reply('Owner only!')
            const dataUser = JSON.parse(fs.readFileSync('./lib/json/dataUser.json'))
            for(users in dataUser) {
                dataUser[users].limit = 0
            }
            fs.writeFileSync('./lib/json/dataUser.json', JSON.stringify(dataUser))
            console.log(color('[ INFO ]', 'cyan'), 'LIMIT RESETED!')
            data.reply('Sukses!')
        })
        Client.cmd.on('bc', async (data) => {
            if(!data.isOwner) return data.reply(mess.ownerOnly)
            if(data.body == '') return
            var list = await client.chats.all()
            mediaBuffer = data.type == 'extendedTextMessage' ? await data.downloadMediaQuotedMessage() : data.type == 'imageMessage' || data.type == 'videoMessage' ? await data.downloadMediaMessage() : null
            var ext = data.isQuotedImage ? 'jpg' : 'mp4'
            list.forEach(async dataC => {
                if(mediaBuffer) Client.sendFileFromBase64(dataC.jid, mediaBuffer.toString('base64'), `bc.${ext}`, `*PAWACHAN BROADCAST*\n\n${data.body} `)
                else Client.sendText(dataC.jid, `*PAWACHAN BROADCAST*\n\n${data.body}`)
            })
        })
        Client.cmd.on('join', async (data) => {
            if(!data.isOwner) return data.reply(mess.ownerOnly)
            if(data.body == "") return data.reply(`Link nya?`)
            Client.acceptInviteLink(data.body).then(() => data.reply('ok')).catch(() => data.reply('failed'))
        })
        Client.cmd.on('owner', async (data) => {
            Client.sendContact(data.from, { number: configs.ownerList[0].split('@')[0], name: configs.namaowner }, data.message)
        })
        Client.cmd.on('premium', async (data) => {
            if(!data.isOwner) return data.reply(mess.ownerOnly)
            const dataUser = JSON.parse(fs.readFileSync('./lib/json/dataUser.json'))
            dataToPr = data.mentionedJidList.length ? data.mentionedJidList : [data.args[1] + "@s.whatsapp.net"] || null

            if(data.args[0].toLowerCase() == 'add') {
                if(data.args.length < 2) return data.reply('what?')
                dataToPr.forEach(nums => {
                    if(!dataUser[nums]) dataUser[nums] = {
                        limit: 0
                    }
                    dataUser[nums].premium = true
                })
                fs.writeFileSync('./lib/json/dataUser.json', JSON.stringify(dataUser))
                data.reply(`Berhasil menambahkan user premium @${dataToPr.join(' @').replace(/@s.whatsapp.net/g, '')}`)
            } else if(data.args[0].toLowerCase() == 'del') {
                if(data.args.length < 2) return data.reply('what?')
                dataToPr.forEach(nums => {
                    if(!dataUser[nums] || !dataUser[nums].premium) return data.reply(`User @${nums.split('@')[0]} not premium!`)
                    dataUser[nums].premium = false
                    data.reply(`berasil menghapus user premium @${nums.split('@')[0]}`)
                })
                fs.writeFileSync('./lib/json/dataUser.json', JSON.stringify(dataUser))
            } else if(data.args[0].toLowerCase() == 'list') {
                strings = `LIST PREMIUM\n\n`
                for(var [num, val] of Object.entries(dataUser))
                    if(val.premium) strings += `~> @${num.split('@')[0]}\n`
                data.reply(strings)
            } else data.reply(`do u need example?\n\nExample:\n${data.prefix}premium add @0 \nor\n${data.prefix}premium add 62xxxx`)
        })
        /*NEWS*/
        Client.cmd.on('tribunnews', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            res = await axios.get(`${configs.apiUrl}/api/tribunews?apikey=${configs.zeksKey}`)
            if(res.data.status == false) data.reply(res.data.message)
            ttt = res.data.result
            var teks = `*「 TRIBUNNEWS 」*\n\n`
            for(let i = 0; i < ttt.length; i++) {
                teks += `*Title* : ${ttt[i].title}\n*Waktu* : ${ttt[i].time}\n*Keterangan*: ${ttt[i].ket}\n*Link*: ${ttt[i].url}\n\n`
            }
            await data.reply(teks)
        })
        Client.cmd.on('liputannews', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            res = await axios.get(`${configs.apiUrl}/api/liputan6?apikey=${configs.zeksKey}`)
            if(res.data.status == false) data.reply(res.data.message)
            ttt = res.data.result
            var teks = `*「 LIPUTANNEWS 」*\n\n`
            for(let i = 0; i < ttt.length; i++) {
                teks += `*Title* : ${ttt[i].title}\n*Waktu* : ${ttt[i].time}\n*Keterangan*: ${ttt[i].ket}\n*Kategori*: ${ttt[i].category}\n*Link*: ${ttt[i].url}\n\n`
            }
            await Client.sendFileFromUrl(data.from, ttt[0].thumb, 'p.jpg', teks, data.message)
        })
        Client.cmd.on('foxnews', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            res = await axios.get(`${configs.apiUrl}/api/foxnews?apikey=${configs.zeksKey}`)
            if(res.data.status == false) data.reply(res.data.message)
            ttt = res.data.result
            var teks = `*「 FOXNEWS 」*\n\n`
            for(let i = 0; i < ttt.length; i++) {
                teks += `*Title* : ${ttt[i].title}\n*Waktu* : ${ttt[i].time}\n*Keterangan*: ${ttt[i].content}\n*Negara*: ${ttt[i].country}\n*Link*: ${ttt[i].url}\n\n`
            }
            await Client.sendFileFromUrl(data.from, ttt[0].thumb, 'p.jpg', teks, data.message)
        })
        /*GROUP*/
        Client.cmd.on('afk', (data) => {
            if(!data.isGroup) return data.reply(mess.group)
            timesNow = moment(data.t * 1000).format('YYYY-MM-DD HH:mm:ss')
            afkJs.addAfk(data.from, data.sender, data.body, timesNow)
            if(data.body == "") return Client.sendText(data.from, "```" + `${data.pushname} [ @${data.sender.split('@')[0]} ] sekarang AFK\n\nTime: ${timesNow}` + "```")
            Client.sendText(data.from, "```" + `${data.pushname} [ @${data.sender.split('@')[0]} ] sedang AFK\n\nAlasan: ${data.body}\nTime: ${timesNow}` + "```")
        })
	     Client.cmd.on('welcome', (data) => {
            if(!data.isGroup) return data.reply(mess.group)
            if(!data.isAdmin) return data.reply(mess.admin)
            const dataGc = JSON.parse(fs.rea=dFileSync('./lib/json/dataGc.json'))
            if(data.args[0].toLowerCase() == 'on') {
                if(dataGc[data.from].welcome) return data.reply('Already on!')
                dataGc[data.from].welcome = true
                fs.writeFileSync('./lib/json/dataGc.json', JSON.stringify(dataGc))
                data.reply('Sukses!')
            } else if(data.args[0].toLowerCase() == 'off') {
                if(!dataGc[data.from].welcome) return data.reply('Already off!')
                dataGc[data.from].welcome = false
                fs.writeFileSync('./lib/json/dataGc.json', JSON.stringify(dataGc))
                data.reply('Sukses!')
            } else {
				let po = client.prepareMessageFromContent(data.from, {
					"listMessage":{
                  "title": "パ ワ ー",
                  "description": "pilh on/off",
                  "buttonText": "COMMANDS",
                  "listType": "SINGLE_SELECT",
                  "sections": [
                     {
                        "rows": [
                           {
                              "title": "on",
                              "rowId": `${data.prefix}${data.command} on`
                           },
						   {
                              "title": "off",
                              "rowId": `${data.prefix}${data.command} off`
                           }
                        ]
                     }]}}, {}) 
            client.relayWAMessage(po, {waitForAck: true})
			}
        })
	    Client.cmd.on('youtubedl', async (data) =>{
            if(isLimit(data.sender)) return data.reply(mess.limit)
            if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}youtubedl [ query ]*\nContoh : ${data.prefix}youtubedl Alan walker`)
            data.reply(mess.wait)
			axios.get(`${configs.apiUrl}/api/yts?apikey=${configs.zeksKey}&q=${data.body}`).then((xres) =>{
			if (!xres.data.status || !xres.data.result) return data.reply(xres.data.message)
			secs = []
			xres.data.result.splice(5, xres.data.result.length)
			xres.data.result.forEach((xres, i) =>{
				secs.push({
                        "rows": [
                           {
                              "title": "MP3",
							  description: `Title: ${xres.video.title}\n\nUploader: ${xres.uploader.username}`,
                              "rowId": `${data.prefix}ytmp3 ${xres.video.url}`
                           },
						   {
                              "title": "MP4",
							  description: `Title: ${xres.video.title}\n\nUploader: ${xres.uploader.username}`,
                              "rowId": `${data.prefix}ytmp4 ${xres.video.url}`
                           }
                        ], title: i+1})
			})
			let po = client.prepareMessageFromContent(data.from, {
				  "listMessage":{
                  "title": "*YOUTUBE DOWNLOAD*",
                  "description": `*Result for : ${data.body}*\n*Download video by click button bellow*`,
                  "buttonText": "Result",
                  "listType": "SINGLE_SELECT",
                  "sections": secs}}, {}) 
            client.relayWAMessage(po, {waitForAck: true})	
			})
        })
        Client.cmd.on('leave', (data) => {
            if(!data.isGroup) return data.reply(mess.admin)
            if(!data.isAdmin) return data.reply(mess.admin)
            const dataGc = JSON.parse(fs.readFileSync('./lib/json/dataGc.json'))
            if(data.args[0].toLowerCase() == 'on') {
                if(dataGc[data.from].leave) return data.reply('Already on!')
                dataGc[data.from].leave = true
                fs.writeFileSync('./lib/json/dataGc.json', JSON.stringify(dataGc))
                data.reply('Sukses!')
            } else if(data.args[0].toLowerCase() == 'off') {
                if(!dataGc[data.from].leave) return data.reply('Already off!')
                dataGc[data.from].leave = false
                fs.writeFileSync('./lib/json/dataGc.json', JSON.stringify(dataGc))
                data.reply('Sukses!')
            } else {
				let po = client.prepareMessageFromContent(data.from, {
					"listMessage":{
                  "title": "パ ワ ー",
                  "description": "pilh on/off",
                  "buttonText": "COMMANDS",
                  "listType": "SINGLE_SELECT",
                  "sections": [
                     {
                        "rows": [
                           {
                              "title": "on",
                              "rowId": `${data.prefix}${data.command} on`
                           },
						   {
                              "title": "off",
                              "rowId": `${data.prefix}${data.command} off`
                           }
                        ]
                     }]}}, {}) 
            client.relayWAMessage(po, {waitForAck: true})
			}
        })
        Client.cmd.on('antitagall', (data) => {
            if(!data.isGroup) return data.reply(mess.admin)
            if(!data.isAdmin) return data.reply(mess.admin)
            if(!data.botIsAdmin) return data.reply(mess.botAdmin)
            const dataGc = JSON.parse(fs.readFileSync('./lib/json/dataGc.json'))
            if(data.args[0].toLowerCase() == 'on') {
                if(dataGc[data.from].antitagall) return data.reply('Already on!')
                dataGc[data.from].antitagall = true
                fs.writeFileSync('./lib/json/dataGc.json', JSON.stringify(dataGc))
                data.reply('*Antitag has been activated* _Tiati kena kick:v_')
            } else if(data.args[0].toLowerCase() == 'off') {
                if(!dataGc[data.from].antitagall) return data.reply('Already off!')
                dataGc[data.from].antitagall = false
                fs.writeFileSync('./lib/json/dataGc.json', JSON.stringify(dataGc))
                data.reply('Sukses!')
            } else {
				let po = client.prepareMessageFromContent(data.from, {
					"listMessage":{
                  "title": "*ANTITAGALL*",
                  "description": "pilh on/off",
                  "buttonText": "COMMANDS",
                  "listType": "SINGLE_SELECT",
                  "sections": [
                     {
                        "rows": [
                           {
                              "title": "on",
                              "rowId": `${data.prefix}${data.command} on`
                           },
						   {
                              "title": "off",
                              "rowId": `${data.prefix}${data.command} off`
                           }
                        ]
                     }]}}, {}) 
            client.relayWAMessage(po, {waitForAck: true})
			}
        })
		Client.cmd.on('antilink', (data) => {
            if(!data.isGroup) return data.reply(mess.admin)
            if(!data.isAdmin) return data.reply(mess.admin)
            const dataGc = JSON.parse(fs.readFileSync('./lib/json/dataGc.json'))
            if(data.args[0].toLowerCase() == 'on') {
                if(dataGc[data.from].antilink) return data.reply('Already on!')
                dataGc[data.from].antilink = true
                fs.writeFileSync('./lib/json/dataGc.json', JSON.stringify(dataGc))
                data.reply('Antilink On\n*「❗」 Peringatan! antilink telah aktif jangan menyebarkan link group atau kamu akan di kick*')
            } else if(data.args[0].toLowerCase() == 'off') {
                if(!dataGc[data.from].antilink) return data.reply('Already off!')
                dataGc[data.from].antilink = false
                fs.writeFileSync('./lib/json/dataGc.json', JSON.stringify(dataGc))
                data.reply('Antilink Off')
            } else {
				let po = client.prepareMessageFromContent(data.from, {
					"listMessage":{
                  "title": "パ ワ ー",
                  "description": "pilh on/off",
                  "buttonText": "COMMANDS",
                  "listType": "SINGLE_SELECT",
                  "sections": [
                     {
                        "rows": [
                           {
                              "title": "on",
                              "rowId": `${data.prefix}${data.command} on`
                           },
						   {
                              "title": "off",
                              "rowId": `${data.prefix}${data.command} off`
                           }
                        ]
                     }]}}, {}) 
            client.relayWAMessage(po, {waitForAck: true})
			}
        })
        Client.cmd.on('revoke', (data) => {
            if(!data.isGroup) return data.reply(mess.group)
            if(!data.botIsAdmin) return data.reply(mess.botAdmin)
            if(!data.isAdmin) return data.reply(mess.admin)
            client.revokeInvite(data.from)
            data.reply(`Linkgroup berhasil di reset oleh admin @${data.sender.split('@')[0]}`)
        })
        Client.cmd.on('group', (data) => {
            if(!data.isGroup) return data.reply(mess.group)
            if(!data.isAdmin) return data.reply(mess.admin)
            if(!data.botIsAdmin) return data.reply(mess.botAdmin)
            if(data.args[0] && data.args[0].toLowerCase() == 'open') {
                client.groupSettingChange(data.from, GroupSettingChange.messageSend, false)
                data.reply(`Group telah dibuka oleh admin @${data.sender.split('@')[0]}`)
            } else if(data.args[0] && data.args[0].toLowerCase() == 'close') {
                client.groupSettingChange(data.from, GroupSettingChange.messageSend, true)
                data.reply(`Group telah ditutup oleh admin @${data.sender.split('@')[0]}`)
            } else {
				let po = client.prepareMessageFromContent(data.from, {
					"listMessage":{
                  "title": "パ ワ ー",
                  "description": "pilh open/close",
                  "buttonText": "COMMANDS",
                  "listType": "SINGLE_SELECT",
                  "sections": [
                     {
                        "rows": [
                           {
                              "title": "open",
                              "rowId": `${data.prefix}${data.command} open`
                           },
						   {
                              "title": "close",
                              "rowId": `${data.prefix}${data.command} close`
                           }
                        ]
                     }]}}, {}) 
            client.relayWAMessage(po, {waitForAck: true})
			}
        })
        Client.cmd.on('bye', (data) => {
            if(!data.isGroup) return data.reply(mess.group)
            if(!data.isAdmin) return data.reply(mess.admin)
            client.groupLeave(data.from)
        })
        Client.cmd.on('tagall', async (data) => {
            if(!data.isGroup) return data.reply(mess.group)
            if(!data.isAdmin) return data.reply(mess.admin)
            text = `『 *_TAG ALL_* 』 ${data.body}\n\n*Total member*: ${data.groupMetadata.participants.length}​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​


`
            data.groupMetadata.participants.forEach((member, i) => {
                text += `${i+1}. ⤷@${member.jid.split('@')[0]}\n`
            })
            Client.sendText(data.from, text)
        })
        Client.cmd.on('setgroupicon', async (data) => {
            if(!data.isGroup) return data.reply(mess.group)
            if(!data.isAdmin) return data.reply(mess.admin)
            if(!data.botIsAdmin) return data.reply(mess.botAdmin)
            if(!data.isQuotedImage && data.type != 'imageMessage') return data.reply(`Wrong format!, please send image with caption ${data.prefix}setgroupicon, or reply image with ${data.prefix}setgroupicon`)
            const getbuff = data.isQuotedImage ? JSON.parse(JSON.stringify(data.message).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : data.message
            const dlfile = await client.downloadMediaMessage(getbuff)
            client.updateProfilePicture(data.from, dlfile)
            data.reply(`success!, group icon has been changed by @${data.sender.split('@')[0]}`)
        })
        Client.cmd.on('setgroupname', async (data) => {
            if(!data.isGroup) return data.reply(mess.group)
            if(!data.isAdmin) return data.reply(mess.admin)
            if(!data.botIsAdmin) return data.reply(mess.botAdmin)
            if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ text ]*\nContoh : ${data.prefix}${data.command} Pawachan`)
            client.groupUpdateSubject(data.from, `${data.body}`)
            data.reply(`Nama group telah diganti oleh admin @${data.sender.split('@')[0]}`)
        })
        Client.cmd.on('setgroupdesc', async (data) => {
            if(!data.isGroup) return data.reply(mess.group)
            if(!data.isAdmin) return data.reply(mess.admin)
            if(!data.botIsAdmin) return data.reply(mess.botAdmin)
            if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ text ]*\nContoh : ${data.prefix}${data.command} Pawachan`)
            client.groupUpdateDescription(data.from, `${data.body}`)
            data.reply(`Deskripsi group telah diganti oleh admin @${data.sender.split('@')[0]}`)
        })
        Client.cmd.on('promote', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            if(!data.isGroup) return data.reply(mess.group)
            if(!data.isAdmin) return data.reply(mess.admin)
            if(!data.botIsAdmin) return data.reply(mess.botAdmin)
            if(data.mentionedJidList.length == 0) return data.reply(`Kirim perintah *${data.prefix}${data.command} [ @tag ]*\nContoh : ${data.prefix}${data.command} @0`)
            client.groupMakeAdmin(data.from, data.mentionedJidList).then(() => data.reply(`Perintah diterima, menambahkan @${data.mentionedJidList.join(' @').replace(/@s.whatsapp.net/g, '')} sebagai admin.`)).catch(() => data.reply('Gagal!'))
        })
        Client.cmd.on('demote', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            if(!data.isGroup) return data.reply(mess.group)
            if(!data.isAdmin) return data.reply(mess.admin)
            if(!data.botIsAdmin) return data.reply(mess.botAdmin)
            if(data.mentionedJidList.length == 0) return data.reply(`Kirim perintah *${data.prefix}${data.command} [ @tag ]*\nContoh : ${data.prefix}${data.command} @0`)
            client.groupDemoteAdmin(data.from, data.mentionedJidList).then(() => data.reply(`Perintah diterima, menghapus admin @${data.mentionedJidList.join(' @').replace(/@s.whatsapp.net/g, '')}`)).catch(() => data.reply('Gagal!'))
        })
        Client.cmd.on('kick', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            if(!data.isGroup) return data.reply(mess.group)
            if(!data.isAdmin) return data.reply(mess.admin)
            if(!data.botIsAdmin) return data.reply(mess.botAdmin)
            if(data.mentionedJidList.length == 0) return data.reply(`Kirim perintah *${data.prefix}${data.command} [ @tag ]*\nContoh : ${data.prefix}${data.command} @0`)
            client.groupRemove(data.from, data.mentionedJidList).then(() => data.reply(`Berhasil mengeluarkan @${data.mentionedJidList.join(' @').replace(/@s.whatsapp.net/g, '')}`)).catch(() => data.reply('Gagal!'))
        })
        Client.cmd.on('add', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            if(!data.isGroup) return data.reply(mess.group)
            if(!data.isAdmin) return data.reply(mess.admin)
            if(!data.botIsAdmin) return data.reply(mess.botAdmin)
            if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ nomor ]*\nContoh : ${data.prefix}${data.command} 6285736996646`)
            args = data.args.map(mp => mp + "@s.whatsapp.net")
            client.groupAdd(data.from, args).then(() => data.reply(`Berhasil menambahkan @${data.args.join(' @')}`)).catch(() => data.reply('Unable to invite'))
        })
        Client.cmd.on('testing', async (data) => {
            console.log(client)
        })
        /*IMAGE MAKER*/
        Client.cmd.on('missing', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            data.reply(mess.wait)
            if(data.isQuotedImage || data.type == 'imageMessage') {
                const getbuffs = data.isQuotedImage ? await data.downloadMediaQuotedMessage() : await data.downloadMediaMessage()
                bodyForm = new FormData()
                bodyForm.append('image', getbuffs, 'missing.jpeg')
                text = data.body.split('|')
                const getAxios = await axios(`${configs.apiUrl}/api/missing-image?apikey=${configs.zeksKey}&text1=${text[0]}&text2=${text[1]}&text3=${text[2]}`, {
                    method: 'POST',
                    responseType: "arraybuffer",
                    headers: {
                        ...bodyForm.getHeaders()
                    },
                    data: bodyForm.getBuffer()
                })
                Client.sendFileFromBase64(data.from, getAxios.data.toString('base64'), 'missing.jpg', mess.succes, data.message)
            } else if(data.mentionedJidList.length > 0) {
                text = data.body.split('|')
                ppUrl = await client.getProfilePicture(data.mentionedJidList[0])
                if(!ppUrl) return data.reply('Profile picture not found!')
                Client.sendFileFromUrl(data.from, `${configs.apiUrl}/api/missing-image?apikey=${configs.zeksKey}&image=${encodeURIComponent(ppUrl)}&text1=${text[0]}&text2=${text[1]}&text3=${text[2]}`, 'missing.jpg', mess.succes, data.message)
            } else data.reply(`Wrong format!, Example: tag someone or reply image\n${data.prefix}missing lost|idk|call xxxxx|@${client.user.jid.split('@')[0]}`)

        })
        Client.cmd.on('calender', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            data.reply(mess.wait)
            if(data.isQuotedImage || data.type == 'imageMessage') {
                const getbuffs = data.isQuotedImage ? await data.downloadMediaQuotedMessage() : await data.downloadMediaMessage()
                bodyForm = new FormData()
                bodyForm.append('image', getbuffs, 'myimg.jpeg')
                const getAxios = await axios(`${configs.apiUrl}/api/calender?apikey=${configs.zeksKey}`, {
                    method: 'POST',
                    responseType: "arraybuffer",
                    headers: {
                        ...bodyForm.getHeaders()
                    },
                    data: bodyForm.getBuffer()
                })
                Client.sendFileFromBase64(data.from, getAxios.data.toString('base64'), 'p.jpg', mess.succes, data.message)
            } else if(data.mentionedJidList.length > 0) {
                ppUrl = await client.getProfilePicture(data.mentionedJidList[0])
                if(!ppUrl) return data.reply('Profile picture not found!')
                Client.sendFileFromUrl(data.from, `${configs.apiUrl}/api/calender?apikey=${configs.zeksKey}&image=${encodeURIComponent(ppUrl)}`, 'calender.jpg', mess.succes, data.message)
            } else data.reply(`Wrong format!, tag someone or reply image with ${data.prefix}calender`)

        })
        Client.cmd.on('removebg', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            data.reply(mess.wait)
            if(data.isQuotedImage || data.type == 'imageMessage') {
                const getbuffs = data.isQuotedImage ? await data.downloadMediaQuotedMessage() : await data.downloadMediaMessage()
                bodyForm = new FormData()
                bodyForm.append('image', getbuffs, 'myimg.jpeg')
                const getAxios = await axios(`${configs.apiUrl}/api/removebg?apikey=${configs.zeksKey}`, {
                    method: 'POST',
                    responseType: "arraybuffer",
                    headers: {
                        ...bodyForm.getHeaders()
                    },
                    data: bodyForm.getBuffer()
                })
                Client.sendFileFromBase64(data.from, getAxios.data.toString('base64'), 'p.jpg', mess.succes, data.message)
            } else if(data.mentionedJidList.length > 0) {
                ppUrl = await client.getProfilePicture(data.mentionedJidList[0])
                if(!ppUrl) return data.reply('Profile picture not found!')
                Client.sendFileFromUrl(data.from, `${configs.apiUrl}/api/removebg?apikey=${configs.zeksKey}&image=${encodeURIComponent(ppUrl)}`, 'calender.jpg', mess.succes, data.message)
            } else data.reply(`Wrong format!, tag someone or reply image with ${data.prefix}calender`)

        })
        Client.cmd.on('drawing', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            data.reply(mess.wait)
            if(data.isQuotedImage || data.type == 'imageMessage') {
                const getbuffs = data.isQuotedImage ? await data.downloadMediaQuotedMessage() : await data.downloadMediaMessage()
                bodyForm = new FormData()
                bodyForm.append('image', getbuffs, 'myimg.jpeg')
                const getAxios = await axios(`${configs.apiUrl}/api/draw-image?apikey=${configs.zeksKey}`, {
                    method: 'POST',
                    responseType: "arraybuffer",
                    headers: {
                        ...bodyForm.getHeaders()
                    },
                    data: bodyForm.getBuffer()
                })
                Client.sendFileFromBase64(data.from, getAxios.data.toString('base64'), 'p.jpg', mess.succes, data.message)
            } else if(data.mentionedJidList.length > 0) {
                ppUrl = await client.getProfilePicture(data.mentionedJidList[0])
                if(!ppUrl) return data.reply('Profile picture not found!')
                Client.sendFileFromUrl(data.from, `${configs.apiUrl}/api/draw-image?apikey=${configs.zeksKey}&image=${encodeURIComponent(ppUrl)}`, 'calender.jpg', mess.succes, data.message)
            } else data.reply(`Wrong format!, tag someone or reply image with ${data.prefix}drawing`)

        })
        Client.cmd.on('sketch', async (data) => {
            if(isLimit(data.sender)) return data.reply(mess.limit)
            data.reply(mess.wait)
            if(data.isQuotedImage || data.type == 'imageMessage') {
                const getbuffs = data.isQuotedImage ? await data.downloadMediaQuotedMessage() : await data.downloadMediaMessage()
                bodyForm = new FormData()
                bodyForm.append('image', getbuffs, 'myimg.jpeg')
                const getAxios = await axios(`${configs.apiUrl}/api/sketch-image?apikey=${configs.zeksKey}`, {
                    method: 'POST',
                    responseType: "arraybuffer",
                    headers: {
                        ...bodyForm.getHeaders()
                    },
                    data: bodyForm.getBuffer()
                })
                Client.sendFileFromBase64(data.from, getAxios.data.toString('base64'), 'p.jpg', mess.succes, data.message)
            } else if(data.mentionedJidList.length > 0) {
                ppUrl = await client.getProfilePicture(data.mentionedJidList[0])
                if(!ppUrl) return data.reply('Profile picture not found!')
                Client.sendFileFromUrl(data.from, `${configs.apiUrl}/api/sketch-image?apikey=${configs.zeksKey}&image=${encodeURIComponent(ppUrl)}`, 'calender.jpg', mess.succes, data.message)
            } else data.reply(`Wrong format!, tag someone or reply image with ${data.prefix}drawing`)

        })
        //If you want case method
        Client.cmd.on('*', async (data) => {
            const {
                args,
                body,
                message,
                prefix,
                from,
                sender,
                command,
                isOwner,
                type,
                isQuotedVideo,
                isQuotedImage,
                isQuotedSticker,
                isQuotedAudio,
                groupMetadata,
                isAdmin,
                botIsAdmin,
                pushname,
                t
            } = data
            switch(command.toLowerCase()) {
                case 'command':
                case 'cmd':
                case 'menu':
                case 'help':
                case 'list':
                		data.reply(menu(data.prefix))
                /*
                    const mediaMsg = await client.prepareMessageMedia(await getBuffer(configs.imgUrl), 'imageMessage')
                     const buttonMessage = {
                           contentText: menu(data.prefix),
                           footerText: '*PAWA-CHAN BOT*',
                                "contextInfo": {
									  mentionedJid: [configs.ownerList[0]],
                                      participant: sender,
                                      stanzaId: message.key.id,
                                      quotedMessage: message.message,
                                     },
                                     buttons: [
                                     {
                                       buttonId: `${data.prefix}runtime`,
                                       buttonText: {
                                          displayText: "*RUNTIME*"
                                        },
                                         "type": "RESPONSE"
                                     },
                                     {
                                       buttonId: `${data.prefix}owner`,
                                       buttonText: {
                                          displayText: "*OWNER*"
                                        },
                                         "type": "RESPONSE"
                                     },
                                        ],
                                         headerType: 4,
                                     ...mediaMsg 
                                     }
                    let zz = await client.prepareMessageFromContent(from, {buttonsMessage: buttonMessage}, {})
                	client.relayWAMessage(zz, {waitForAck: true})     
                	*/
                    break
                    /*RANDOM*/ //V2
                case 'asupan':
				case 'asupansantuy':
				case 'asupanbocil':
				case 'asupanukhty':
				case 'asupanrikagusriani':
				case 'asupanghea':
            try {
                if(isLimit(data.sender)) return data.reply(mess.limit)
                data.reply(mess.wait)
                Client.sendFileFromUrl(data.from, `${configs.DapUrl}/api/asupan/${data.command}?apikey=${configs.DapKey}`, 'video.mp4', `nih asupan nya @${data.sender.split('@')[0]}`, data.message)
            } catch (e) {
                data.reply(mess.error2)
            }
            	break
                    /*VVIBU*/
                case 'swanime':
			try {
                if(isLimit(data.sender)) return data.reply(mess.limit)
                data.reply(mess.wait) //https://dapuhy-api.herokuapp.com/api/anime/storyanime?apikey=YOUR_APIKEY
                Client.sendFileFromUrl(data.from, `${configs.DapUrl}/api/anime/storyanime?apikey=${configs.DapKey}`, 'video.mp4', `${mess.succes} @${data.sender.split('@')[0]}`, data.message)
            } catch (e) {
                data.reply(mess.error2)
            }
				break
				case 'wait':
           	     if(isLimit(data.sender)) return data.reply(mess.limit)
                        data.reply(mess.wait)
            if(data.isQuotedImage || data.type == 'imageMessage') {
                const getbuffs = data.isQuotedImage ? await data.downloadMediaQuotedMessage() : await data.downloadMediaMessage()
                bodyForm = new FormData()
                bodyForm.append('image', getbuffs, 'myimg.jpeg')
                        const getAxios = await axios.get(`${configs.lolUrl}/api/wait?apikey=${configs.LolKey}`, {
                        method: 'POST',
                    responseType: "arraybuffer",
                    headers: {
                        ...bodyForm.getHeaders()
                    },
                    data: bodyForm.getBuffer()
                })
                if(getAxios.data.status > 200) return data.reply(getAxios.data.message)
                Client.sendFileFromBase64(data.from, getAxios.data.result.video, 'anime.mp4', getAxios.data.result.title_english, data.message)
                }
                    break
                    case 'loli':
              	  try {
              	  if(!data.isGroup) return data.reply(mess.group)
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/random/loli?apikey=Apikey_Lu
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/random/loli?apikey=${configs.LolKey}`, 'loli.jpg', '```Kabur cok ada lolicon```', message)
                    } catch {
                        data.reply(mess.error2)
                    }
                    break
                    case 'waifu':
              	  try{
              	  if(!data.isGroup) return data.reply(mess.group)
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/random/waifu?apikey=Apikey_Lu
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/random/waifu?apikey=${configs.LolKey}`, 'loli.jpg', '```nih waifunya```', message)
                    } catch {
                        data.reply(mess.error2)
                    }
                    break
					case 'nekopoi':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${command} [ query ]*\nContoh : ${data.prefix}${command} chainsawman`)
                        data.reply(mess.wait) //https://api.lolhuman.xyz/api/nekopoisearch?apikey=APIKEY&query=isekai%20harem
                        res = await axios.get(`${configs.lolUrl}/api/nekopoisearch?apikey=${configs.LolKey}&query=${data.body}`)
                        ttt = res.data.result
                        var tekss = `*「 NEKOPOI 」*\n\n*Hasil Pencarian : ${data.body}*\n\n`
                        for(let i = 0; i < ttt.length; i++) {
                            tekss += `*Title :* ${ttt[i].title}\n*Link :* ${ttt[i].link}\n`
                        }
                        data.reply(tekss)
                    } catch {
                        data.reply(mess.error2)
                    }
                    break
					case 'doudesu':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${command} [ query ]*\nContoh : ${data.prefix}${command} chainsawman`)
                        data.reply(mess.wait) //https://api.lolhuman.xyz/api/doujindesu?apikey=EpepBurik&url=https://doujindesu.info/2021/01/18/queen-bee-chapter-33/
                        res = await axios.get(`${configs.lolUrl}/api/nekopoisearch?apikey=${configs.LolKey}&url=${data.body}`)
                        var ttt = res.data.result
                        tekss = `*Title :* ${ttt.title}\n`
                        tekss += `*Link Download :* ${ttt.link_dl}\n`
                        Client.sendMessageFromUrl(from, ttt.image[1], 'p.jpg', tekss, message)
                    } catch {
                        data.reply(mess.error2)
                    }
                    break
					case 'nhentaisearch':
					case 'nhsearch':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${command} [ query ]*\nContoh : ${data.prefix}${command} chainsawman`)
                        data.reply(mess.wait) //https://api.lolhuman.xyz/api/nhentaisearch?apikey=Apikey_Lu&query=gotoubun
                        res = await axios.get(`${configs.lolUrl}/api/nhentaisearch?apikey=${configs.LolKey}&query=${data.body}`)
                        ttt = res.data.result
                        var tekss = `*[ Nhentai Search ]*\n\n`
                        for(let i = 0; i < ttt.length; i++) {
                            tekss += `*Id :* ${ttt[i].id}\n*English :* ${ttt[i].title_english}\n*Kanji :* ${ttt[i].title_japanese}\n*Romaji :* ${ttt[i].title_native}\n\n\n`
                        }
                        data.reply(tekss)
                    } catch(e) {
                        data.reply(`Maaf pencarian ${data.body} tidak ditemukan`)
                    }
                    break
					case 'nhentai':
					case 'nh':
					try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(!isPrem(data.sender)) return data.reply(mess.prem)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ code ]*\nContoh : ${data.prefix}${data.command} 344654`)
                        data.reply(mess.wait) //https://api.lolhuman.xyz/api/nhentai/344654?apikey=apiikey
                        axios.get(`${configs.lolUrl}/api/nhentai/${data.body}?apikey=${configs.LolKey}`)
  	              .then(({data}) => {
     	           let { title_romaji, title_native, read, info, image } = data.result
					ini_txt = `Title Romaji : ${title_romaji}\n`
                    ini_txt += `Title Kanji : ${title_native}\n`
                    ini_txt += `Read Online : https://cin.cin.pw/g/` + data.body
                    ini_txt += `\nParodies : ${info.parodies}\n`
                    ini_txt += `Character : ${info.characters}\n`
                    ini_txt += `Tags : ${info.tags}\n`
                    ini_txt += `Artist : ${info.artists}\n`
                    ini_txt += `Group : ${info.groups}\n`
                    ini_txt += `Languages : ${info.languages}\n`
                    ini_txt += `Categories : ${info.categories}\n`
                    ini_txt += `Pages : ${info.pages}\n`
                    ini_txt += `Uploaded : ${info.uploaded}\n`
                    Client.sendFileFromUrl(from, image[0], 'nhentai.pdf', ini_txt, message)
                    })
                    } catch(e) {
                        data.reply(`Maaf pencarian ${data.body} tidak ditemukan`)
                    }
                        break
                    case 'nhentaipdf':
                    case 'nhpdf':
                    try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(!isPrem(data.sender)) return data.reply(mess.prem)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ 143756 ]*\nContoh : ${data.prefix}${data.command} 143756`)
                        data.reply(mess.wait) //https://api.lolhuman.xyz/api/nhentaipdf/344253?apikey=beta
                        res = await axios.get(`${configs.lolUrl}/api/nhentaipdf/${data.body}?apikey=${configs.LolKey}`)
                        if(res.data.status == false) return data.reply(mess.error2)
                        pedef = res.data.result
                        Client.sendFileFromUrl(from, pedef, `${data.body}.pdf`, message)
                        } catch(e) {
                        data.reply(`Maaf pencarian ${data.body} tidak ditemukan`)
                    	}
                        break
					case 'nhentaipdf2':
					case 'nhpdf2':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(!isPrem(data.sender)) return data.reply(mess.prem)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ 143756 ]*\nContoh : ${data.prefix}${data.command} 143756`)
                        data.reply(`https://cin.cin.pw/v/${data.body}`)
                        break
                    case 'kusonime':
                    try {
                    	if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ judul ]*\nContoh : ${data.prefix}${data.command} anime attack on titan`)
                        data.reply(mess.wait)
        	        axios.get(`${configs.lolUrl}/api/kusonimesearch?apikey=${configs.LolKey}&query=${data.body}`)
  	              .then(({data}) => {
     	           let { title, thumbnail, japanese, genre, seasons, producers, type, status, total_episode, score, duration, released_on, link_dl } = data.result
					ini_txt = `*Title :* ${title}\n`
					ini_txt += `*Japanese :* ${japanese}\n`
					ini_txt += `*Genre :* ${genre}\n`
					ini_txt += `*Seasons :* ${seasons}\n`
					ini_txt += `*Producers :* ${producers}\n`
					ini_txt += `*Type :* ${type}\n`
					ini_txt += `*Status :* ${status}\n`
					ini_txt += `*Total Eps :* ${total_episode}\n`
					ini_txt += `*Score :* ${score}\n`
					ini_txt += `*Duration :* ${duration}\n`
					ini_txt += `*Released :* ${released_on}\n\n`
					ini_txt += `*Download :*`
                    for (var x in link_dl) {
                        ini_txt += `\n${x}\n`
                        for (var y in link_dl[x]) {
                            ini_txt += `${y} - ${link_dl[x][y]}\n`
                        }
                    }
  	              let caption = `*「Kusonime Search」*\n\n` + ini_txt
       	         Client.sendFileFromUrl(from, thumbnail, 'p.jpg', caption, message)
 	               })
					} catch(e) {
                        data.reply(`Maaf pencarian ${data.body} tidak ditemukan`)
                    }
  	              break
					case 'anime':
                    	if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ judul ]*\nContoh : ${data.prefix}${data.command} anime attack on titan`)
                        data.reply(mess.wait) //https://api.lolhuman.xyz/api/anime?apikey=Apikey_Lu&query=gotoubun%20no%20hanayome
        	        axios.get(`${configs.lolUrl}/api/anime?apikey=${configs.LolKey}&query=${data.body}`)
  	              .then(({data}) => {
     	           let { id, idMal, title, coverImage, format, episodes, duration, status, season, seasonYear, source, genres, startDate, endDate, description, averageScore, synonyms, characters } = data.result
    				ini_txt = `*Id :* ${id}\n`
    				ini_txt += `*Id MAL:* ${idMal}\n`
					ini_txt += `*Title :* ${title}\n`
					ini_txt += `*Type :* ${format}\n`
					ini_txt += `*Episodes :* ${episodes}\n`
					ini_txt += `*Duration :* ${duration}\n`
					ini_txt += `*Status :* ${status}\n`
					ini_txt += `*Season :* ${season}\n`
					ini_txt += `*Season Year :* ${seasonYear}\n`
					ini_txt += `*Source :* ${source}\n`
					for(let i = 0; i < genres.length; i++) {
                            ini_txt += `*Genres* : ${genres[i]}\n`
                        }
					ini_txt += `*Start Date :* ${startDate.day} - ${startDate.month} - ${startDate.year}\n`
					ini_txt += `*End Date :* ${endDate.day} - ${endDate.month} - ${endDate.year}\n`
					ini_txt += `*Synopsys :* ${description}\n`
					ini_txt += `*Avarage Score :* ${averageScore}\n`
					for(let i = 0; i < synonyms.length; i++) {
                            ini_txt += `*Synonyms :* ${synonyms[i]}\n`
                        }
                    characters = characters.nodes
                    for(let i = 0; i < characters.length; i++) {
                            ini_txt += `*Characters :* Name = ${characters[i].full}\nNative = ${characters[i].native}\n`
                        }
  	              let caption = `*「MAL Search」*\n\n` + ini_txt
       	         Client.sendFileFromUrl(from, coverImage.large, 'p.jpg', caption, message)
 	               })
  	              break
					case 'ppcouple':
					try{
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    data.reply(mess.wait)
                    res = await axios.get(`${configs.leysUrl}/api/ppcouple?apikey=${configs.LeysKey}`)
                    image = res.data.result.male
                    image2 = res.data.result.female
                    Client.sendFileFromUrl(from, image, 'p.jpg', '```MALE```', message)
                    Client.sendFileFromUrl(from, image2, 'p.jpg', '```FEMALE```', message)
                    } catch {
                    	data.reply(mess.error2)
                    }
                    break
					case 'ppcouple2':
				    try{
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    data.reply(mess.wait)
                    res = await axios.get(`${configs.dapUrl}/api/randomimage/couple?apikey=${configs.DapKey}`)
                    image = res.data.result.pria
                    image2 = res.data.result.wanita
                    Client.sendFileFromUrl(from, image, 'p.jpg', '```MALE```', message)
                    Client.sendFileFromUrl(from, image2, 'p.jpg', '```FEMALE```', message)
                    } catch {
                        data.reply(mess.error2)
                    }
                    break
                    /*NSFW*/
                    case 'randomhentai':
                    case 'rh':
				    try{
					if(!data.isGroup) return data.reply(mess.group)
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    data.reply(mess.wait)
                    lewdd = ["solog", "feet", "smallboobs", "lewdkemo", "gasm", "solo", "avatar", "erokemo", "ero", "holo", "fox_girl", "tits", "eroyuri", "holoero", "yuri", "neko", "hentai", "eron", "erok", "cum_jpg", "nsfw_avatar", "erofeet", "waifu", "lewd", "pussy_jpg", "futanari"]
					const eroo = lewdd[Math.floor(Math.random() * lewdd.length)]
                    res = await axios.get(`https://nekos.life/api/v2/img/${eroo}`)
                    image = res.data.url
                    Client.sendFileFromUrl(from, image, 'p.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
					case 'nsfwloli':
        			try{
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(!isPrem(data.sender)) return data.reply(mess.prem)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/random/nsfw/loli?apikey=APIKEY
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/random/nsfw/loli?apikey=${configs.LolKey}`, 'gambar.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                    case 'nsfwneko':
				    try{
					if(!data.isGroup) return data.reply(mess.group)
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    data.reply(mess.wait)
                    res = await axios.get(`https://api.waifu.pics/nsfw/neko`)
                    image = res.data.url
                    Client.sendFileFromUrl(from, image, 'p.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                    case 'nsfwwaifu':
				    try{
					if(!data.isGroup) return data.reply(mess.group)
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    data.reply(mess.wait)
                    res = await axios.get(`https://api.waifu.pics/nsfw/waifu`)
                    image = res.data.url
                    Client.sendFileFromUrl(from, image, 'p.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                    case 'ass2':
				    try{
					if(!data.isGroup) return data.reply(mess.group)
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    data.reply(mess.wait) //https://apixxy.herokuapp.com/api/nsfw/ass?apikey=premiumzx
                    res = await axios.get(`https://apixxy.herokuapp.com/api/nsfw/ass?apikey=premiumzx`)
                    image = res.data.result
                    Client.sendFileFromUrl(from, image, 'p.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                    case 'ketek2':
                    case 'armpits2':
				    try{
					if(!data.isGroup) return data.reply(mess.group)
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    res = await axios.get(`https://meme-api.herokuapp.com/gimme/animearmpits`)
                    image = res.data.url
                    Client.sendFileFromUrl(from, image, 'p.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                    case 'paha':
                    case 'thighss':
				    try{
					if(!data.isGroup) return data.reply(mess.group)
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    res = await axios.get(`https://meme-api.herokuapp.com/gimme/animethighss`)
                    image = res.data.url
                    Client.sendFileFromUrl(from, image, 'p.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                    case 'booty':
				    try{
					if(!data.isGroup) return data.reply(mess.group)
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    res = await axios.get(`https://meme-api.herokuapp.com/gimme/animebooty`)
                    image = res.data.url
                    Client.sendFileFromUrl(from, image, 'p.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                    case 'sideoppai2':
				    try{
					if(!data.isGroup) return data.reply(mess.group)
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    res = await axios.get(`https://meme-api.herokuapp.com/gimme/sideoppai`)
                    image = res.data.url
                    Client.sendFileFromUrl(from, image, 'p.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
					case 'ahegao2':
				    try{
					if(!data.isGroup) return data.reply(mess.group)
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    res = await axios.get(`https://meme-api.herokuapp.com/gimme/ahegao`)
                    image = res.data.url
                    Client.sendFileFromUrl(from, image, 'p.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                    case 'pantsu':
                    case 'ass':
				    try{
					if(!data.isGroup) return data.reply(mess.group)
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    res = await axios.get(`https://meme-api.herokuapp.com/gimme/anime${command}`)
                    image = res.data.url
                    Client.sendFileFromUrl(from, image, 'p.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                    

/*=======================******************BATES ANTARA FREE - PREMIUM***********************===========================*/


                    case 'ketek': 
					case 'armpits':
        			try{
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(!isPrem(data.sender)) return data.reply(mess.prem)
                    data.reply(mess.wait)
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/random/nsfw/animearmpits?apikey=${configs.LolKey}`, 'gambar.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                case 'feet':
                case 'yuri':
                case 'trap':
                case 'lewd':
                case 'feed':
                case 'eron':
                case 'solo':
                case 'gasm':                        
                case 'holo':
                case 'tits':                
                case 'erok':
                case 'smug':
                case 'baka':
                case 'solog':
                case 'lewdk':
                case 'waifu':                
                case 'femdom':
                case 'cuddle':
                case 'hentai':
                case 'eroyuri':
                case 'blowjob':
                case 'erofeet':
                case 'holoero':                
                case 'erokemo':
                case 'fox_girl':
                case 'futanari':
                case 'lewdkemo':
                case 'wallpaper':
                case 'pussy_jpg':
                case 'kemonomimi':
                case 'nsfw_avatar':
                try{
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(!isPrem(data.sender)) return data.reply(mess.prem)
                    data.reply(mess.wait)
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/random2/${command}?apikey=${configs.LolKey}`, 'p.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
					case 'sideoppai':
                    case 'chiisaihentai':
	                case 'trap':
  	              case 'blowjob':
  	              case 'yaoi':
  	              case 'ecchi':
    	            case 'hentai':
   	             case 'ahegao':
   	             case 'hololewd':                
    	            case 'animefeets':
    	            case 'animebooty':
  	              case 'animethighss':
    	            case 'hentaiparadise':
    	            case 'animearmpits':
  	              case 'hentaifemdom':
   	             case 'lewdanimegirls':
     	           case 'biganimetiddies':
   	             case 'animebellybutton':
         	       case 'hentai4everyone':
        			try{
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(!isPrem(data.sender)) return data.reply(mess.prem)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/random/nsfw/sideoppai?apikey=beta
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/random/nsfw/${command}?apikey=${configs.LolKey}`, 'gambar.jpg', mess.sange, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                    /*STICKER*/
                case 'spatrick':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)                        
                        data.reply(mess.wait) //https://api.lolhuman.xyz/api/sticker/patrick?apikey=beta
                        Client.sendStickerFromUrl(from, `${configs.lolUrl}/api/sticker/patrick?apikey=${configs.LolKey}`, message, { pack: `${configs.pack}`, author: `${configs.author}` })
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                case 'sgif':
                case 'sticker':
                case 's':
                case 'stiker':
                case 'stickergif':
                case 'stikergif':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(type != 'videoMessage' && !isQuotedVideo && !isQuotedImage && type != 'imageMessage') return data.reply('Wrong format!')
                    const getbuff = data.isQuotedVideo || data.isQuotedImage ? JSON.parse(JSON.stringify(data.message).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : data.message
                    const dlfile = await client.downloadMediaMessage(getbuff)
                    if(type == 'videoMessage' || isQuotedVideo) Client.sendMp4AsSticker(from, dlfile.toString('base64'), message, { pack: `${configs.pack}`, author: `${configs.author}` })
                    else Client.sendImageAsSticker(from, dlfile.toString('base64'), message, { pack: `${configs.pack}`, author: `${configs.author}` })
                    break
				case 'tomp3':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
					data.reply(mess.wait)
                    if(type != 'videoMessage' && !isQuotedVideo) return data.reply('Wrong format!')
					const getbuffz = data.isQuotedVideo ? JSON.parse(JSON.stringify(message).replace('quotedM','m')).message.extendedTextMessage.contextInfo : data.message	
				    const dlfilez = await client.downloadMediaMessage(getbuffz)
                    convertMp3(dlfilez).then(data =>Client.sendFileFromUrl(from, data, 'p.mp3', '', message)).catch(er => Client.reply(from, 'Unexpected error!', message))
					break
                case 'stikerwm':
                case 'stickerwm':
                case 'swm':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(type != 'videoMessage' && !isQuotedVideo && !isQuotedImage && type != 'imageMessage') return data.reply('Wrong format!')
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ pack|author ]*\nContoh : ${data.prefix}${data.command} punya|Pawachan`)
                    data.reply(mess.wait)
                    const getbuffs = data.isQuotedVideo || data.isQuotedImage ? JSON.parse(JSON.stringify(data.message).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : data.message
                    const dlfiles = await client.downloadMediaMessage(getbuffs)
                    text = data.body.split('|')
                    if(type == 'videoMessage' || isQuotedVideo) Client.sendMp4AsSticker(from, dlfiles.toString('base64'), message, { crop: false, pack: `${text[0]}`, author: `${text[1]}` })
                    else Client.sendImageAsSticker(from, dlfiles.toString('base64'), message, { pack: `${text[0]}`, author: `${text[1]}` })
                    break
                case 'stikeremoji':
                case 'stickeremoji':
                case 'semoji':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ emoji ]*\nContoh : ${data.prefix}${data.command} 😃`)
                        Client.sendStickerFromUrl(from, `${configs.apiUrl}/api/emoji-image?apikey=${configs.zeksKey}&emoji=${encodeURIComponent(data.body)}`, message, { pack: `${configs.pack}`, author: `${configs.author}` })
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                case 'takestick':
                case 'takestik':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(!data.isQuotedSticker) return data.reply('Reply sticker!')
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ pack|author ]*\nContoh : ${data.prefix}${data.command} punya|Pawachan`)
                    data.reply(mess.wait)
                    p = data.body
                    text = p.split('|')
                    const buff = await client.downloadMediaMessage(JSON.parse(JSON.stringify(data.message).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo)
                    Client.sendWebpAsSticker(data.from, buff.toString('base64'), data.message, {
                        pack: `${text[0]}`,
                        author: `${text[1]}`
                    })
                    break
                case 'stikerfire':
                case 'stickerfire':
                case 'sfire':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.isQuotedImage || data.type == 'imageMessage') {
                        const getbuffs = data.isQuotedImage ? await data.downloadMediaQuotedMessage() : await data.downloadMediaMessage()
                        bodyForm = new FormData()
                        bodyForm.append('image', getbuffs, 'myimg.jpeg')
                        const getAxios = await axios(`${configs.apiUrl}/api/burning-image?apikey=${configs.zeksKey}`, {
                            method: 'POST',
                            responseType: "arraybuffer",
                            headers: {
                                ...bodyForm.getHeaders()
                            },
                            data: bodyForm.getBuffer()
                        })
                        Client.sendMediaAsSticker(data.from, getAxios.data.toString('base64'), data.message, {
                            pack: `${configs.pack}`,
                            author: `${configs.author}`
                        })
                    } else if(data.mentionedJidList.length > 0) {
                        ppUrl = await client.getProfilePicture(data.mentionedJidList[0])
                        if(!ppUrl) return data.reply('Profile picture not found!')
                        Client.sendStickerFromUrl(data.from, `${configs.apiUrl}/api/burning-image?apikey=${configs.zeksKey}&image=${encodeURIComponent(ppUrl)}`, data.message, {
                            pack: `${configs.pack}`,
                            author: `${configs.author}`
                        })
                    } else data.reply(`Wrong format!, tag someone or reply image with ${data.prefix}stickerfire`)
                    break
                case 'stikernobg':
                case 'stickernobg':
                case 'snobg':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.isQuotedImage || data.type == 'imageMessage') {
                        const getbuffs = data.isQuotedImage ? await data.downloadMediaQuotedMessage() : await data.downloadMediaMessage()
                        bodyForm = new FormData()
                        bodyForm.append('image', getbuffs, 'myimg.jpeg')
                        const getAxios = await axios(`${configs.apiUrl}/api/removebg?apikey=${configs.zeksKey}`, {
                            method: 'POST',
                            responseType: "arraybuffer",
                            headers: {
                                ...bodyForm.getHeaders()
                            },
                            data: bodyForm.getBuffer()
                        })
                        Client.sendMediaAsSticker(data.from, getAxios.data.toString('base64'), data.message, {
                            pack: `${configs.pack}`,
                            author: `${configs.author}`
                        })
                    } else if(data.mentionedJidList.length > 0) {
                        ppUrl = await client.getProfilePicture(data.mentionedJidList[0])
                        if(!ppUrl) return data.reply('Profile picture not found!')
                        Client.sendStickerFromUrl(data.from, `${configs.apiUrl}/api/removebg?apikey=${configs.zeksKey}&image=${encodeURIComponent(ppUrl)}`, data.message, {
                            pack: `${configs.pack}`,
                            author: `${configs.author}`
                        })
                    } else data.reply(`Wrong format!, tag someone or reply image with ${data.prefix}stickerfire`)
                    break
					/*SERTIFIKAT MAKER*/
				case 'tololserti':
                    try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} Khael`)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/toloserti?apikey=Apikey&name=Test
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/toloserti?apikey=${configs.LolKey}&name=${data.body}`, 'gambar.jpg', mess.succes, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
				case 'fuckboyserti':
                    try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} Khael`)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/fuckboy?apikey=beta&name=Test
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/fuckboy?apikey=${configs.LolKey}&name=${data.body}`, 'gambar.jpg', mess.succes, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
				case 'fuckgirlserti':
                    try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} Khael`)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/fuckgirl?apikey=beta&name=Test
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/fuckgirl?apikey=${configs.LolKey}&name=${data.body}`, 'gambar.jpg', mess.succes, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
				case 'bucinserti':
                    try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} Khael`)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/bucinserti?apikey=beta&name=Test
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/bucinserti?apikey=${configs.LolKey}&name=${data.body}`, 'gambar.jpg', mess.succes, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
				case 'pacarserti':
                    try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} shiro`)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/pacarserti?apikey=beta&name=Test
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/pacarserti?apikey=${configs.LolKey}&name=${data.body}`, 'gambar.jpg', mess.succes, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
				case 'goodboyserti':
                    try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} shiro`)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/goodboy?apikey=beta&name=Test
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/goodboy?apikey=${configs.LolKey}&name=${data.body}`, 'gambar.jpg', mess.succes, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
				case 'goodgirlserti':
                    try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} shiro`)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/goodboy?apikey=beta&name=Test
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/goodgirl?apikey=${configs.LolKey}&name=${data.body}`, 'gambar.jpg', mess.succes, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
				case 'badboyserti':
                    try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} shiro`)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/goodboy?apikey=beta&name=Test
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/badboy?apikey=${configs.LolKey}&name=${data.body}`, 'gambar.jpg', mess.succes, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
				case 'badgirlserti':
                    try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} shiro`)
                    data.reply(mess.wait) //https://api.lolhuman.xyz/api/goodboy?apikey=beta&name=Test
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/badgirl?apikey=${configs.LolKey}&name=${data.body}`, 'gambar.jpg', mess.succes, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                    /*TEXT MAKER*/
                case 'qrencode':
                case 'barcode':
                case 'bneon':
                case 'matrix':
                case 'breakwall':
                case 'gneon':
                case 'dropwater':
                case 'tfire':
                case 'sandw':
                case 'epep':
                case 'gplaybutton':
                case 'splaybutton':
                case 'text3dbox':
                case 'text3d':
                case 'logobp':
                case 'leavest':
                case 'thundertext':
                case 'tlight':
                case 'naruto':
                case 'crosslogo':
                case 'cslogo':
                case 'crismes':
                case 'flametext':
                case 'glowtext':
                case 'smoketext':
                case 'flowertext':
                case 'lithgtext':
                case 'nulis':
                    try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} Khael`)
                    data.reply(mess.wait)
                    Client.sendFileFromUrl(from, `${configs.apiUrl}/api/${command}?text=${data.body}&apikey=${configs.zeksKey}`, 'gambar.jpg', mess.succes, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                case 'wolflogo':
                case 'logoaveng':
                case 'phlogo':
                case 'marvellogo':
                case 'gtext':
                case 'pubglogo':
                case 'snowwrite':
                case 'watercolour':
                    try {
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks1|teks2 ]*\nContoh : ${data.prefix}${data.command} Khael|Pawachan`)
                    data.reply(mess.wait)
                    p = data.body
                    text = p.split('|')
                    Client.sendFileFromUrl(from, `${configs.apiUrl}/api/${command}?apikey=${configs.zeksKey}&text1=${text[0]}&text2=${text[1]}`, 'p.jpg', mess.succes, message)
                    } catch {
                        data.reply(mess.error)
                    }
					break
                case 'tahta':
                case 'harta':
                case 'hartatahta':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} Khael`)
                    data.reply(mess.wait)
                    Client.sendFileFromUrl(from, `${configs.apiUrl}/api/hartatahta?text=${data.body}&apikey=${configs.zeksKey}`, 'harta.jpg', mess.succes, message)
                    Client.sendStickerFromUrl(from, `${configs.apiUrl}/api/hartatahta?text=${data.body}&apikey=${configs.zeksKey}`, message, {
                        crop: false,
                        pack: 'Pack',
                        author: 'AUTHOR'
                    })
                    break
                    /*SEARCHING*/
                    case 'google':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${command} [ query ]*\nContoh : ${data.prefix}${command} chainsawman`)
                        data.reply(mess.wait) //https://lolhuman.herokuapp.com/api/gsearch?apikey=Apikey_Lu&query=tahu
                        res = await axios.get(`${configs.lolUrl}/api/gsearch?apikey=${configs.LolKey}&query=${data.body}`)
                        ttt = res.data.result
                        var tekss = `*「 GOOGLE 」*\n\n*Hasil Pencarian : ${data.body}*\n\n`
                        for(let i = 0; i < ttt.length; i++) {
                            tekss += `*Title :* ${ttt[i].title}\n*Link :* ${ttt[i].link}\n*Deskripsi :* ${ttt[i].deskripsi}\n\n`
                        }
                        data.reply(tekss)
                    } catch(e) {
                        data.reply(`Maaf pencarian ${data.body} tidak ditemukan`)
                    }
                    break
                case 'playstore':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}playstore [ apk ]*\nContoh : ${data.prefix}playstore pubg`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/sgplay?apikey=${configs.zeksKey}&q=${data.body}`)
                        ttt = res.data.result
                        var teks = `*「 PLAYSTORE 」*\n\n*Hasil Pencarian : ${data.body}*\n\n`
                        for(let i = 0; i < ttt.length; i++) {
                            teks += `*Title* : ${ttt[i].title}\n*Harga* : ${ttt[i].price}\n*Rate*: ${ttt[i].rating}\n*Link*: ${ttt[i].url}\n\n`
                        }
                        await Client.sendFileFromUrl(from, ttt[0].thumb, 'p.jpg', teks, message)
                    } catch {
                        data.reply(`Maaf aplikasi ${data.body} tidak ditemukan`)
                    }
                    break
                case 'wiki':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}wiki [ query ]*\nContoh : ${data.prefix}wiki manusia`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/wiki?apikey=${configs.zeksKey}&q=${data.body}`)
                        te = `*Hasil pencarian dari* : ${data.body}\n\n*Result* : ${res.data.result.result}`
                        data.reply(te)
                    } catch {
                        data.reply(`Maaf wiki ${data.body} tidak ditemukan`)
                    }
                    break	
                case 'kbbi':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}kbbi [ query ]*\nContoh : ${data.prefix}kbbi manusia`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/kbbi?apikey=${configs.zeksKey}&q=${data.body}`)
                        te = `*Hasil pencarian dari* : ${data.body}\n\n*Result* : ${res.data.result}\n*Source* : ${res.data.source}`
                        data.reply(te)
                    } catch {
                        data.reply(`Maaf kbbi ${data.body} tidak ditemukan`)
                    }
                    break
                case 'film':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}film [ film ]*\nContoh : ${data.prefix}film doraemon`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/film?apikey=${configs.zeksKey}&q=${data.body}`)
                        ttt = res.data.result
                        var teks = `*「 FILM 」*\n\n*Hasil Pencarian : ${data.body}*\n\n`
                        for(let i = 0; i < ttt.length; i++) {
                            teks += `*Title* : ${ttt[i].title}\n*Link*: ${ttt[i].url}\n\n`
                        }
                        await Client.sendFileFromUrl(from, ttt[0].thumb, 'p.jpg', teks, message)
                    } catch {
                        data.reply(`Maaf film ${data.body} tidak ditemukan`)
                    }
                    break
                case 'happymod':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}happymod [ apk ]*\nContoh : ${data.prefix}happymod pubg`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/happymod?apikey=${configs.zeksKey}&q=${data.body}`)
                        ttt = res.data.result
                        var teks = `*「 HAPPYMOD 」*\n\n*Hasil Pencarian : ${data.body}*\n\n`
                        for(let i = 0; i < ttt.length; i++) {
                            teks += `*Title* : ${ttt[i].title}\n*Rate*: ${ttt[i].rating}\n*Link*: ${ttt[i].url}\n\n`
                        }
                        await Client.sendFileFromUrl(from, ttt[0].thumb, 'p.jpg', teks, message)
                    } catch {
                        data.reply(`Maaf aplikasi MOD ${data.body} tidak ditemukan`)
                    }
                    break
                case 'iguser':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}iguser [ username ]*\nContoh : ${data.prefix}iguser jessnolimit`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/iguser?apikey=${configs.zeksKey}&q=${data.body}`)
                        ttt = res.data.result
                        var teks = `*「 INSTAGRAM USER 」*\n\n*Hasil Pencarian : ${data.body}*\n\n`
                        for(let i = 0; i < ttt.length; i++) {
                            teks += `*Username* : ${ttt[i].username}\n*Full name*: ${ttt[i].full_name}\n*Akun private* : ${ttt[i].private_user}\n*Verified*: ${ttt[i].verified_user}\n*Link*: https://instagram.com/${ttt[i].username}\n\n`
                        }
                        await Client.sendFileFromUrl(from, ttt[0].profile_pic, 'p.jpg', teks, message)
                    } catch {
                        data.reply(`Maaf username ${data.body} tidak ditemukan`)
                    }
                    break
                case 'ytsearch':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}ytsearch [ query ]*\nContoh : ${data.prefix}ytsearch jessnolimit`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/yts?apikey=${configs.zeksKey}&q=${data.body}`)
                        ttt = res.data.result
                        var teks = `*「 YOUTUBE 」*\n\n*Hasil Pencarian : ${data.body}*\n\n`
                        for(let i = 0; i < ttt.length; i++) {
                            teks += `*Title* : ${ttt[i].video.title}\n*Durasi*: ${ttt[i].video.duration}\n*Upload* : ${ttt[i].video.upload_date}\n*View*: ${ttt[i].video.views}\n*Channel*: ${ttt[i].uploader.username}\n*Link*: ${ttt[i].video.url}\n\n`
                        }
                        await Client.sendFileFromUrl(from, ttt[0].video.thumbnail_antidel, 'axis.jpg', teks, message)
                    } catch(e) {
                        data.reply(`Maaf pencarian ${data.body} tidak ditemukan`)
                    }
                    break
                case 'ytplaylist':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}ytplaylist[ channel ]*\nContoh : ${data.prefix}ytplaylist jessnolimit`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/ytplaylist?apikey=${configs.zeksKey}&q=${data.body}`)
                        ttt = res.data.result
                        var tekss = `*「 YOUTUBE PLAYLIST 」*\n\n*Hasil Pencarian : ${data.body}*\n\n`
                        for(let i = 0; i < ttt.length; i++) {
                            tekss += `*Nama* : ${ttt[i].title}\n*Jumlah video*: ${ttt[i].video_count}\n*Channel*: ${ttt[i].uploader.username}\n*Link*: ${ttt[i].url}\n\n`
                        }
                        await Client.sendFileFromUrl(from, ttt[0].thumbnail, 'axis.jpg', tekss, message)
                    } catch(e) {
                        data.reply(`Maaf pencarian ${data.body} tidak ditemukan`)
                    }
                    break
                case 'ytchannel':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}ytchannel [ channel ]*\nContoh : ${data.prefix}ytchannel jessnolimit`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/ytchannel?apikey=${configs.zeksKey}&q=${data.body}`)
                        ttt = res.data.result
                        var eks = `*「 YOUTUBE CHANNEL 」*\n\n*Hasil Pencarian : ${data.body}*\n\n`
                        for(let i = 0; i < ttt.length; i++) {
                            eks += `*Nama* : ${ttt[i].title}\n*Deskripsi*: ${ttt[i].description}\n*Verified* : ${ttt[i].verified}\n*Jumlah video*: ${ttt[i].video_count}\n*Subcriber*: ${ttt[i].subscriber_count}\n*Link*: ${ttt[i].url}\n\n`
                        }
                        await Client.sendFileFromUrl(from, ttt[0].thumbnail, 'axis.jpg', eks, message)
                    } catch(e) {
                        data.reply(`Maaf pencarian ${data.body} tidak ditemukan`)
                    }
                    break
                case 'shopee':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}shopee [ query ]*\nContoh : ${data.prefix}shopee sepatu`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/shopee?apikey=${configs.zeksKey}&q=${data.body}`)
                        ttt = res.data.data
                        var teks = `*「 SHOPEE 」*\n\n*Hasil Pencarian : ${data.body}*\n\n`
                        for(let i = 0; i < ttt.length; i++) {
                            teks += `*Nama* : ${ttt[i].name}\n*Harga*: ${ttt[i].harga}\n*Terjual* : ${ttt[i].terjual}\n*Lokasi*: ${ttt[i].location}\n*Deskripsi*: ${ttt[i].desc}\n*Stok*: ${ttt[i].stock}\n*Informasi*: ${ttt[i].information}\n*Link*: ${ttt[i].url}\n\n`
                        }
                        await Client.sendFileFromUrl(from, ttt[0].img_detail[0], 'p.jpg', teks, message)
                    } catch {
                        data.reply(`Maaf produk ${data.body} tidak ditemukan`)
                    }
                    break
                case 'igstalk':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}igstalk [ query ]*\nContoh : ${data.prefix}igstalk Pawachan_xyz`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/igstalk?apikey=${configs.zeksKey}&username=${data.body}`)
                        pe = res.data
                        tek = `*「 INSTAGRAM PROFILE 」*	
					
*Username:* @${pe.username}
*Nama:* ${pe.fullname}
*Pengikut:* ${pe.follower}
*Mengikuti*: ${pe.following}
*Deskripsi:* ${pe.bio}
*Link:* https://instagram.com/${pe.username}
`
                        Client.sendFileFromUrl(from, pe.profile_pic, 'p.jpg', tek, message)
                    } catch {
                        data.reply(`Maaf username ${data.body} tidak ditemukan`)
                    }
                    break
                case 'brainly':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}brainly [ query ]*\nContoh : ${data.prefix}brainly siapa penemu lampu`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/brainly?apikey=${configs.zeksKey}&q=${data.body}&count=3`)
                        for(let i = 0; i < res.data.data.length; i++) {
                            await Client.reply(from, `Pertanyaan : ${res.data.data[i].question}\n\nJawaban : ${res.data.data[i].answer[0].text}`, message)
                        }
                    } catch {
                        data.reply(`Maaf jawaban tidak ditemukan`)
                    }
                    break
                case 'spotify':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}spotify [ lagu ]*\nContoh : ${data.prefix}spotify melukis senja`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/spotify?apikey=${configs.zeksKey}&q=${data.body}`)
                        ttt = res.data.data
                        var teks = `*「 SPOTIFY 」*\n\n*Hasil Pencarian : ${data.body}*\n\n`
                        for(let i = 0; i < ttt.length; i++) {
                            teks += `*Judul* : ${ttt[i].title}\n*Artis*: ${ttt[i].artists}\n*Album* : ${ttt[i].album}\n*Link*: ${ttt[i].url}\n*Preview*: ${ttt[i].preview_mp3}\n\n`
                        }
                        await Client.sendFileFromUrl(from, ttt[0].thumb, 'p.jpg', teks, message)
                    } catch {
                        data.reply(`Maaf lagu ${data.body} tidak ditemukan`)
                    }
                    break
                case 'gsmarena':
                    try {
                        if(isLimit(data.sender)) return data.reply(mess.limit)
                        if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}gsmarena [ hp ]*\nContoh : ${data.prefix}gsmarena asus rog phone 3`)
                        data.reply(mess.wait)
                        res = await axios.get(`${configs.apiUrl}/api/gsmArena?apikey=${configs.zeksKey}&q=${data.body}`)
                        captions = `*HP* : ${res.data.data.title}\n\n${res.data.data.full_desc.string}\n${res.data.data.link}`
                        Client.sendFileFromUrl(from, res.data.data.thumb, 'p.jpg', captions, message)
                    } catch (e) {
                        data.reply(`Maaf hp ${data.body} tidak ditemukan`)
                    }
                    break
                case 'searchmusic':
                case 'searchmusik':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.isQuotedAudio) {
                        files = await client.downloadMediaMessage(JSON.parse(JSON.stringify(message).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo)
                        bodyForm = new FormData()
                        bodyForm.append('audio', files, 'music.mp3')
                        axios(`${configs.apiUrl}/api/searchmusic?apikey=${configs.zeksKey}`, {
                                method: 'POST',
                                headers: {
                                    ...bodyForm.getHeaders()
                                },
                                data: bodyForm.getBuffer()
                            })
                            .then(({
                                data
                            }) => {
                                if(data.status) {
                                    Client.reply(from, `_[ *Search Music* ]_\n\n*Title*: ${data.data.title}\n*Artists*: ${data.data.artists}\n*Genre*: ${data.data.genre}\n*Album*: ${data.data.album}\n*Release date*: ${data.data.release_date}`, message)
                                } else Client.reply(from, data.message, message)
                            }).catch(() => Client.reply(from, 'Internal server error!, try again later', message))
                    } else Client.reply(from, 'Wrong format!', message)
                    break
                case 'wallpaper':
				    try{
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}wallpaper [ query ]*\nContoh : ${data.prefix}wallpaper kucing`)
                    data.reply(mess.wait)
                    res = await axios.get(`${configs.apiUrl}/api/unsplash?apikey=${configs.zeksKey}&q=${data.body}`)
                    if(res.data.status == false) data.reply(res.data.message)
                    n = res.data.result
                    image = n[Math.floor(Math.random() * n.length)]
                    Client.sendFileFromUrl(from, image.img_hd, 'p.jpg', `*Hasil pecarian* : ${data.body}`, message)
                    } catch {
                        data.reply(`error`)
                    }
                    break
                case 'pinterest':
				    try{
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}pinterest [ query ]*\nContoh : ${data.prefix}pinterest kucing`)
                    data.reply(mess.wait)
                    res = await axios.get(`${configs.lolUrl}/api/pinterest2?apikey=${configs.LolKey}&query=${data.body}`)
                    n = res.data.result
                    image = n[Math.floor(Math.random() * n.length)]
                    Client.sendFileFromUrl(from, image, 'p.jpg', `*Hasil pecarian* : ${data.body}`, message)
                    } catch {
                        data.reply(`error`)
                    }
                    break
                case 'googleimage':
				    try{
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}googleimage [ query ]*\nContoh : ${data.prefix}googleimage kucing`)
                    data.reply(mess.wait)
                    res = await axios.get(`${configs.apiUrl}/api/gimg?apikey=${configs.zeksKey}&q=${data.body}`)
                    n = res.data.data
                    image = n[Math.floor(Math.random() * n.length)]
                    Client.sendFileFromUrl(from, image, 'p.jpg', `*Hasil pecarian* : ${data.body}`, message)
                    } catch {
                        data.reply(`error`)
                    }
                    break
                case 'jagokata':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}jagokata [ apk ]*\nContoh : ${data.prefix}jagokata bersyukurlah`)
                    data.reply(mess.wait)
                    res = await axios.get(`${configs.apiUrl}/api/jagokata?apikey=${configs.zeksKey}&q=${data.body}`)
                    if(res.data.status == false) data.reply(res.data.message)
                    ttt = res.data.result
                    var teks = `*「 JAGOKATA 」*\n\n*Hasil Pencarian : ${data.body}*\n\n`
                    ttt.forEach(tt1 => teks += `*Kata* : ${tt1.kata}\n*Author* : ${tt1.author}\n*Info*: ${tt1.author_info}\n*Link*: ${tt1.author_url}\n\n` )
                    await data.reply(teks)
                    break
                    /*PRIMBON*/
                case 'jodoh':
                case 'ramalpasangan':
                case 'pasangan':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ kamu|dia ]*\nContoh : ${data.prefix}${data.command} Khael|Pawachan`)
                    data.reply(mess.wait)
                    p = data.body
                    text = p.split('|')
                    res = await axios.get(`${configs.apiUrl}/api/primbonjodoh?apikey=${configs.zeksKey}&nama1=${text[0]}&nama2=${text[1]}`)
                    if(res.data.status == false) data.reply(res.data.message)
                    p = res.data.result
                    tek = `*Nama kamu* : ${p.nama1}\n*Nama dia* : ${p.nama2}\n\n*Hasil positif* : ${p.positif}\n*Hasil negatif* : ${p.negatif}`
                    Client.sendFileFromUrl(from, p.thumb, 'p.jpg', tek, message)
                    break
                case 'artinama':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}artinama [ nama ]*\nContoh : ${data.prefix}artinama Pawachan`)
                    data.reply(mess.wait)
                    res = await axios.get(`${configs.apiUrl}/api/artinama?apikey=${configs.zeksKey}&nama=${data.body}`)
                    if(res.data.status == false) data.reply(res.data.message)
                    data.reply(res.data.result)
                    break
                case 'artimimpi':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}artimimpi[ mimpi ]*\nContoh : ${data.prefix}artimimpi ular`)
                    data.reply(mess.wait)
                    res = await axios.get(`${configs.apiUrl}/api/artimimpi?apikey=${configs.zeksKey}&q=${data.body}`)
                    if(res.data.status == false) data.reply(res.data.message)
                    data.reply(res.data.result.string)
                    break
                    /*OTHER*/
                case 'spamsms':
                	if(isLimit(data.sender)) return data.reply(mess.limit)
                    if (data.body == "") return data.reply(`Contoh: ${data.prefix}${data.command} 62822xxxxxxxx`)
                    if (data.body == "6282248192917") return data.reply(`Lu Mau di Banned?`)
                    if (data.body == "+62 822-4819-2917") return data.reply(`Lu Mau di Banned?`)
                    if (data.body == "628114811363") return data.reply(`Jangan Ke no. bot, lu mau di banned?`)
                    if (data.body == "+62 811-4811-363") return data.reply(`Jangan Ke no. bot, lu mau di banned?`)
                    data.reply(mess.wait)
                    await axios(`${configs.lolUrl}/api/sms/spam1?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam2?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam3?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam4?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam5?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam6?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam7?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam8?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam1?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam2?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam3?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam4?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam5?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam6?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam7?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam8?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam1?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam2?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam3?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam4?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam5?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam6?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam7?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam8?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam1?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam2?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam3?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam4?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam5?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam6?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam7?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam8?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam1?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam2?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam3?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam4?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam5?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam6?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam7?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam8?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam1?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam2?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam3?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam4?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam5?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam6?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam7?apikey=${configs.LolKey}&nomor=${data.body}`)
                    await axios(`${configs.lolUrl}/api/sms/spam8?apikey=${configs.LolKey}&nomor=${data.body}`)
                    data.reply(mess.succes)
                    break
                case 'ssweb':
				    try{
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ link ]*\nContoh : ${data.prefix}${data.command} https://beacons.page/khaelsan`)
                    data.reply(mess.wait)
                    Client.sendFileFromUrl(from, `${configs.lolUrl}/api/sswebfull?apikey=${configs.LolKey}&url=${data.body}`, 'gambar.jpg', mess.succes, message)
                    } catch {
                        data.reply(mess.error)
                    }
                    break
                case 'jsholat':
                case 'jadwalsholat':
                case 'jadwalshalat':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} jakarta`)
                    data.reply(mess.wait)
                    res = await axios.get(`${configs.apiUrl}/api/jadwalsholat?apikey=${configs.zeksKey}&daerah=${data.body}`)
                    data.reply(res.data.data.string)
                    break
                case 'jadwaltv':
                    if(isLimit(data.sender)) return data.reply(mess.limit)
                    if(data.body == "") return data.reply(`Kirim perintah *${data.prefix}${data.command} [ teks ]*\nContoh : ${data.prefix}${data.command} antv`)
                    data.reply(mess.wait)
                    res = await axios.get(`${configs.apiUrl}/api/jadwaltv?apikey=${configs.zeksKey}&channel=${data.body}`)
                    data.reply(res.data.result)
                    break
                    /*GROUP*/
                case 'antidelete':
				if(isLimit(data.sender)) return data.reply(mess.limit)
   	         if(!data.isGroup) return data.reply(mess.group)
  	          if(!data.isAdmin) return data.reply(mess.admin)
				const dataRevoke = JSON.parse(fs.readFileSync('./antidel/gc-revoked.json'))
				const dataCtRevoke = JSON.parse(fs.readFileSync('./antidel/ct-revoked.json'))
				const dataBanCtRevoke = JSON.parse(fs.readFileSync('./antidel/ct-revoked-banlist.json'))
				const isRevoke = dataRevoke.includes(from)
				const isCtRevoke = dataCtRevoke.data
				const isBanCtRevoke = dataBanCtRevoke.includes(sender) ? true : false
				if (data.body.length == "") return data.reply(`Penggunaan fitur antidelete :\n\n${data.prefix}antidelete [aktif/mati] (Untuk grup)\n${data.prefix}antidelete [ctaktif/ctmati] (untuk semua kontak)\n${data.prefix}antidelete banct 628558xxxxxxx (banlist kontak)`)
				if (data.args[0].toLowerCase() == 'aktif') {
					if (data.isGroup) {
						if (isRevoke) return data.reply(`Antidelete telah diaktifkan di grup ini sebelumnya!`)
						dataRevoke.push(from)
						fs.writeFileSync('./antidel/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
						data.reply(`Succes Enable Antidelete Grup!`)
					} else if (!data.isGroup) {
						data.reply(`Untuk kontak penggunaan ${data.prefix}antidelete ctaktif`)
					}
				} else if (data.args[0].toLowerCase() == 'ctaktif') {
					if (!data.isGroup) {
						if (isCtRevoke) return data.reply(`Antidelete telah diaktifkan di semua kontak sebelumnya!`)
						dataCtRevoke.data = true
						fs.writeFileSync('./antidel/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
						data.reply(`Antidelete diaktifkan disemua kontak!`)
					} else if (isGroup) {
						data.reply(`Untuk grup penggunaan ${data.prefix}antidelete aktif`)
					}
				} else if (data.args[0].toLowerCase() == 'banct') {
					if (isBanCtRevoke) return data.reply(`kontak ini telah ada di database banlist!`)
					if (data.body.length === 2 || data.body[2].startsWith('0')) return data.reply(`Masukan nomer diawali dengan 62! contoh 62859289xxxxx`)
					dataBanCtRevoke.push(data.body[2] + '@s.whatsapp.net')
					fs.writeFileSync('./antidel/ct-revoked-banlist.json', JSON.stringify(dataBanCtRevoke, null, 2))
					data.reply(`Kontak ${data.body[2]} telah dimasukan ke banlist antidelete secara permanen!`)
				} else if (data.args[0].toLowerCase() == 'mati') {
					if (isGroup) {
						const index = dataRevoke.indexOf(from)
						dataRevoke.splice(index, 1)
						fs.writeFileSync('./antidel/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
						data.reply(`Succes disable Antidelete Grup!`)
					} else if (!isGroup) {
						data.reply(`Untuk kontak penggunaan ${data.prefix}antidelete ctmati`)
					}
				} else if (data.args[0].toLowerCase() == 'ctmati') {
					if (!isGroup) {
						dataCtRevoke.data = false
						fs.writeFileSync('./antidel/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
						data.reply(`Antidelete dimatikan disemua kontak!`)
					} else if (isGroup) {
						data.reply(`Untuk grup penggunaan ${data.prefix}antidelete mati`)
					}
				}
				break
                case 'del':
		        case 'd':
		        case 'delete':
				client.deleteMessage(from, { id: message.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
				break
                case 'hidetag':
                case 'everyone':
                    if(!isAdmin) return data.reply('only be used by admin!')
                    var mention = []
                    data.groupMetadata.participants.forEach((member, i) => {
                        mention.push(member.jid)
                    })
                    data.reply(`${data.body}`, {
                        contextInfo: {
                            "mentionedJid": mention
                        }
                    })
                    break
                case 'linkgroup':
                case 'linkgrup':
                case 'linkgc':
                    if(!data.isGroup) return data.reply(mess.group)
                    if(!data.botIsAdmin) return data.reply(mess.botAdmin)
                    linkgc = await client.groupInviteCode(data.from)
                    data.reply(`https://chat.whatsapp.com/${linkgc}`)
                    break
                    /*DLL*/
                    /*
                case 'stickermenu':
                    Client.sendRawWebpAsSticker(from, fs.readFileSync('./lib/temp/menus.webp'), message).then(resData => Client.sendText(from, 'gunakan sticker ini untuk menampilkan menu!', {
                        quoted: resData
                    }))
                    Client.sendRawWebpAsSticker(from, fs.readFileSync('./lib/temp/sticks.webp'), message).then(resData => Client.sendText(from, 'gunakan sticker ini untuk membuat sticker dengan cara reply image/video dengan sticker ini', {
                        quoted: resData
                    }))
                    Client.sendRawWebpAsSticker(from, fs.readFileSync('./lib/temp/open.webp'), message).then(resData => Client.sendText(from, 'gunakan sticker ini untuk membuka group', {
                        quoted: resData
                    }))
                    Client.sendRawWebpAsSticker(from, fs.readFileSync('./lib/temp/close.webp'), message).then(resData => Client.sendText(from, 'gunakan sticker ini untuk menutup group', {
                        quoted: resData
                    }))
                    break
						*/
                case 'tes':
                case 'ping':
                case 'speed':
                    const processsTime = (timestamp, now) => {
                return moment.duration(now - moment(timestamp * 1000)).asSeconds()
                }
                data.reply(`Speed : ${processsTime(message.messageTimestamp.low, moment())} _second_`)
                    break
                case 'runtime':
                data.reply(`Runtime : _${kyun(process.uptime())}_`)
                break
                case 'return':
		        case 'eval':
                    if(!data.isOwner) return data.reply(mess.ownerOnly)
                    try {
                        data.reply(JSON.stringify(eval(body), null, 3))
                    } catch (ers) {
                        data.reply(ers.toString())
                    }
                    break
		        case 'term':
                    if(!data.isOwner) return data.reply(mess.ownerOnly)
					exec(data.body, (err, stdout) => {	
				    if (err) return data.reply(err.toString())
					if (stdout) return data.reply(stdout)
					})
				    break
                case 'getquoted':
                    data.reply(JSON.stringify(message.message.extendedTextMessage.contextInfo, null, 3))
                    break
                case 'toimg':
                case 'togif':
                case 'tomedia':
                case 'toimage':
                    if(!isQuotedSticker) return data.reply('reply sticker!')
                    const mtdt = await data.downloadMediaQuotedMessage()
                    if(message.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated) {
                        axios(`https://serv-api.zeks.xyz/sticker/togif`, { method: "post", headers: { "content-type": 'application/json' }, data: {base64: mtdt.toString('base64')}}).then(bf => {
                            Client.sendFileFromBase64(from, bf.data.result, 'to.gif', 'nih', message)
			})
                    } else {
                        axios(`https://serv-api.zeks.xyz/sticker/png`, { method: "post", headers: { "content-type": 'application/json' }, data: { base64: mtdt.toString('base64')}}).then(bf => {
                            Client.sendFileFromBase64(from, bf.data.result, 'to.png', 'nih', message)
                        })
                    }
                    break
            }
        })
        //Handler Sticker Command
        Client.handlerStick.on("*", async (datas) => {
            const {
                idStick,
                message,
                from,
                sender,
                isOwner,
                isQuotedVideo,
                isQuotedImage,
                isQuotedSticker,
                isQuotedAudio,
                groupMetadata,
                isAdmin,
                botIsAdmin,
                pushname,
                t
            } = datas
            //console.log(`ID STICKER: ${idStick}`) //digunakan untuk mendapatkan id sticker
            /*	Cara bikin stickercmd 
                -ambil id sticker lewat console.log
            	-id sticker nya dibuat case 
                -case 'idnya': contoh ada dibawah
            	*/
            switch(idStick) {
            	case '2.5453414541226133e+123': //speed
                    const processsTime = (timestamp, now) => {
                return moment.duration(now - moment(timestamp * 1000)).asSeconds()
                }
                datas.reply(`Speed : ${processsTime(message.messageTimestamp.low, moment())} _second_`)
                    break
				case '2.6253426537573744e+123': //runtime
					datas.reply(`Runtime : _${kyun(process.uptime())}_`)
					break
                case '1.5749534946455323e+123': //menu
                    datas.reply(menu(configs.prefix == 'multi' ? '#' : configs.prefix))
                    break
                case '1.415045466145215e+123': //sticker
                    if(datas.isQuotedImage || datas.isQuotedVideo) {
                        const getBuffs = await client.downloadMediaMessage(JSON.parse(JSON.stringify(datas.message.message.stickerMessage.contextInfo).replace('quotedMessage', 'message')))
					if(isQuotedVideo) Client.sendMp4AsSticker(from, getBuffs.toString('base64'), message, { pack: `${configs.pack}`, author: `${configs.author}` })
                   	else Client.sendImageAsSticker(from, getBuffs.toString('base64'), message, {  pack: `${configs.pack}`, author: `${configs.author}` })    
                    }
                    break
			    case '2.5721212925546256e+123': //open gc
				    if(!datas.isGroup) return datas.reply(mess.group)
                    if(!datas.isAdmin) return datas.reply(mess.admin)
                    if(!datas.botIsAdmin) return datas.reply(mess.botAdmin)
                    client.groupSettingChange(from, GroupSettingChange.messageSend, false)
                    datas.reply(`Group telah dibuka oleh admin @${datas.sender.split('@')[0]}`)
				    break
			    case '1.2133506529252545e+123': //close gc
				    if(!datas.isGroup) return datas.reply(mess.group)
                    if(!datas.isAdmin) return datas.reply(mess.admin)
                    if(!datas.botIsAdmin) return datas.reply(mess.botAdmin)
                    client.groupSettingChange(from, GroupSettingChange.messageSend, true)
                    datas.reply(`Group telah ditutup oleh admin @${datas.sender.split('@')[0]}`)
				    break
            }
        })
    } catch (e) {
        console.log(e)
    }
}
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

function isLimit(sender, count) {
    const dataUser = JSON.parse(fs.readFileSync('./lib/json/dataUser.json'))
    if(dataUser[sender].premium) return false
    if(dataUser[sender].limit >= configs.maxLimit) return true
    dataUser[sender].limit += count || 1
    fs.writeFileSync('./lib/json/dataUser.json', JSON.stringify(dataUser))
    return false
}

function isPrem(sender) {
    const dataUser = JSON.parse(fs.readFileSync('./lib/json/dataUser.json'))
    if(dataUser[sender].premium) return true
    return false
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
