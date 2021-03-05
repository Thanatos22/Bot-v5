const {
    WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
} = require('@adiwajshing/baileys');
const qrcode = require("qrcode-terminal") 
const moment = require("moment-timezone") 
const fs = require("fs") 
const util = require('util')
const fetch = require('node-fetch')
const os = require('os')
const crypto = require('crypto')
const imageToBase64 = require('image-to-base64')
const axios = require('axios')
const { color, bgcolor } = require('./lib/color')
const { donasi } = require('./lib/donasi')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { exec, spawn } = require("child_process")
const { help } = require('./src/help')
const { dono } = require('./src/dono')
const { thanatosmenu } = require('./src/thanatosmenu')
const { menuadmin } = require('./src/menuadmin')
const { mediamenu } = require('./src/mediamenu')
const { mkmenu } = require('./src/mkmenu')
const { gp } = require('./src/gp')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const tiktod = require('tiktok-scraper')
const brainly = require('brainly-scraper')
const ffmpeg = require('fluent-ffmpeg')
const ms = require('parse-ms')
const toMs = require('ms')
const path = require('path')
const cd = 4.32e+7
const { ind } = require('./language')

/********** MENU SETTING **********/
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN: Thanatos totoso\n' 
            + 'ORG: Desenvolvedor do bot thanatos;\n' 
            + 'TEL;type=CELL;type=VOICE;waid=553192271279:+55 31 9227-1279\n' 
            + 'END:VCARD' 
blocked = []   
prefix = '.'
limitawal = 30
memberlimit = 0
ator = 'THANATOS'
namo = 'BOT'
cr = '*BOT INI SUDAH TERVERIFIKASI*'
/*************************************/

/******** OWNER NUMBER**********/
const ownerNumber = ["553192271279@s.whatsapp.net","552195851858@s.whatsapp.net"] 
/************************************/

       
/*********** LOAD FILE ***********/
const setiker = JSON.parse(fs.readFileSync('./strg/stik.json'))
const videonye = JSON.parse(fs.readFileSync('./strg/video.json'))
const audionye = JSON.parse(fs.readFileSync('./strg/audio.json'))
const imagenye = JSON.parse(fs.readFileSync('./strg/image.json'))
const documentnye = JSON.parse(fs.readFileSync('./strg/apk.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const welkom = JSON.parse(fs.readFileSync('./database/bot/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/bot/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./database/bot/simi.json'))
const event = JSON.parse(fs.readFileSync('./database/bot/event.json'))
const _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const uang = JSON.parse(fs.readFileSync('./database/user/uang.json'))
const prem = JSON.parse(fs.readFileSync('./database/user/prem.json'))
const antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const bad = JSON.parse(fs.readFileSync('./database/group/bad.json'))
const badword = JSON.parse(fs.readFileSync('./database/group/badword.json'))
/*********** END LOAD ***********/

/********** FUNCTION ***************/
		const getLevelingXp = (sender) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].xp
            }
        }

        const getLevelingLevel = (sender) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].level
            }
        }

        const getLevelingId = (sender) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].id
            }
        }

        const addLevelingXp = (sender, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].xp += amount
                fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingLevel = (sender, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].level += amount
                fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingId = (sender) => {
            const obj = {id: sender, xp: 1, level: 1}
            _level.push(obj)
            fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
        }
             
         const getRegisteredRandomId = () => {
            return _registered[Math.floor(Math.random() * _registered.length)].id
        }

        const addRegisteredUser = (userid, sender, age, time, serials) => {
            const obj = { id: userid, name: sender, age: age, time: time, serial: serials }
            _registered.push(obj)
            fs.writeFileSync('./database/bot/registered.json', JSON.stringify(_registered))
        }

        const createSerial = (size) => {
            return crypto.randomBytes(size).toString('hex').slice(0, size)
        }

        const checkRegisteredUser = (sender) => {
            let status = false
            Object.keys(_registered).forEach((i) => {
                if (_registered[i].id === sender) {
                    status = true
                }
            })
            return status
        }
        
        const addATM = (sender) => {
        	const obj = {id: sender, uang : 0}
            uang.push(obj)
            fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
        }
        
        const addKoinUser = (sender, amount) => {
            let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                uang[position].uang += amount
                fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
            }
        }
        
        const checkATMuser = (sender) => {
        	let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return uang[position].uang
            }
        }
        
        const bayarLimit = (sender, amount) => {
        	let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit -= amount
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            }
        }
        	
        const confirmATM = (sender, amount) => {
        	let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                uang[position].uang -= amount
                fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
            }
        }
        
        const limitAdd = (sender) => {
             let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id == sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit += 1
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            }
        } 
        
        const getPremiumExpired = (sender) => {
		    let position = null
		    Object.keys(prem).forEach((i) => {
		        if (prem[i].id === sender) {
		            position = i
		        }
		    })
		    if (position !== null) {
		        return prem[position].expired
		    }
		} 
		
		const expiredCheck = () => {
		    setInterval(() => {
		        let position = null
		        Object.keys(prem).forEach((i) => {
		            if (Date.now() >= prem[i].expired) {
		                position = i
		            }
		        })
		        if (position !== null) {
		            console.log(`Premium expired: ${prem[position].id}`)
		            prem.splice(position, 1)
		            fs.writeFileSync('./database/bot/prem.json', JSON.stringify(prem))
		        }
		    }, 1000)
		} 
		
		const getAllPremiumUser = () => {
		    const array = []
		    Object.keys(prem).forEach((i) => {
		        array.push(prem[i].id)
		    })
		    return array
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

function addMetadata(packname, author) {	
	if (!packname) packname = 'WABot'; if (!author) author = 'Bot';	
	author = author.replace(/[^a-zA-Z0-9]/g, '');	
	let name = `${author}_${packname}`
	if (fs.existsSync(`./${name}.exif`)) return `./${name}.exif`
	const json = {	
		"sticker-pack-name": packname,
		"sticker-pack-publisher": author,
	}
	const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
	const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

	let len = JSON.stringify(json).length	
	let last	

	if (len > 256) {	
		len = len - 256	
		bytes.unshift(0x01)	
	} else {	
		bytes.unshift(0x00)	
	}	

	if (len < 16) {	
		last = len.toString(16)	
		last = "0" + len	
	} else {	
		last = len.toString(16)	
	}	

	const buf2 = Buffer.from(last, "hex")	
	const buf3 = Buffer.from(bytes)	
	const buf4 = Buffer.from(JSON.stringify(json))	

	const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

	fs.writeFile(`./${name}.exif`, buffer, (err) => {	
		return `./${name}.exif`	
	})	

} 

/********** FUNCTION ***************/

const client = new WAConnection()
   client.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(color('[','white'),color('∆','red'),color(']','white'),color('qr already scan.subscribe','white'),color('YOU','red'),color('TUBE','white'),color('ampibi gaming','yellow'))
})

client.on('credentials-updated', () => {
	const authInfo = client.base64EncodedAuthInfo()
   console.log(`credentials updated!`)
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})
fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')
client.connect();


client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Coe @${num.split('@')[0]} sou o ${me.name} e seja bem vindo ao grupo *${mdata.subject}* lembra de ler a desgraça da regras, para acessar meu menu use ${prefix}help`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Tchau macaco @${num.split('@')[0]} 🐒`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
            global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
			const timi = moment.tz('America/Sao_Paulo').add(30, 'days').calendar();
			const timu = moment.tz('America/Sao_Paulo').add(20, 'days').calendar();
            body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const tescuk = ["0@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const q = args.join(' ')
			const botNumber = client.user.jid
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            
            /************** SCURITY FEATURE ************/
            const isEventon = isGroup ? event.includes(from) : false
            const isRegistered = checkRegisteredUser(sender)
            const isBadWord = isGroup ? badword.includes(from) : false
            const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const isLevelingOn = isGroup ? _leveling.includes(from) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isPrem = prem.includes(sender) || isOwner
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isImage = type === 'imageMessage'
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			const sendImage = (teks) => {
		    client.sendMessage(from, teks, image, {quoted:mek})
		    }
		    const costum = (pesan, tipe, target, target2) => {
			client.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}
			const costumimg = ( pesan , tipe, target , caption) => {
			client.sendMessage(from, pesan , tipe , {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: {"imageMessage":{url: 'https://mmg.whatsapp.net/d/f/Ahj0ACnTjSHHm6-HjqAUBYiCu2-85zMZp_-EhiXlsd6A.enc',mimetype: 'image/jpeg',caption: `${caption}`,fileSha256: '0Pk0qJyQFn9FCtslZrydJHRQDKryjYcdP7I3CmRrHRs=',fileLength: '20696',height: 360,width: 382,mediaKey: 'N43d/3GY7GYQpgBymb9qFY5O9iNDXuBirXsNZk+X61I=',fileEncSha256: 'IdFM58vy8URV+IUmOqAY3OZsvCN6Px8gaJlRCElqhd4=',directPath: '/v/t62.7118-24/35174026_475909656741093_8174708112574209693_n.enc?oh=2a690b130cf8f912a9ca35f366558743&oe=6061F0C6',mediaKeyTimestamp: '1614240917',jpegThumbnail: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEMASAMBIgACEQEDEQH/xAAwAAADAAMBAAAAAAAAAAAAAAAABAUBAwYCAQADAQEAAAAAAAAAAAAAAAABAgMABP/aAAwDAQACEAMQAAAAoy6kcWS2eH8miq17B553Thh1BgyTY9iULYfndGBmbSwNEV3eWXpjwZElG09WJckXCj8sWBVc1ZKXj2ZYaoWHnc67K3PbKwtZOqzLrzdQAg5fWFRUeCNTQG2pEKJ0wCD/xAAoEAACAgIBAQkAAwEAAAAAAAABAgADBBEScQUQEyEiMTJBYSNRYmP/2gAIAQEAAT8AaZzfEdwWcGMTE1jNv3M1ozDb+SD2jTO+Yigk6A3KqhseIdfkroTYbXQRrkVuJOplKEuOpjtpxF+IjTO+YnZoBvj4pa/msHtMnHZrgymZ6hCnSJsDl+ys7rTpGmevxMwLFS/1fcA7iNzPsDXaH1NccYH+2lJ1SnSNMlOdcbY6iYGa9g4OJzXW9zI7SBJrpjqxsA9zMkcMetf2V7NKD/McgAkxsis7EcA2fkxkqSkaYbMGRu3hr0x6q6ckufaUMpsexj0ma4Y0qDKhqlektyntXiQO4qWI0PONVZWNsNTmZwewekEwo1fpYaMZdvWf2DYrXoO/ARWLNL6VuXiYcSsuK9eXGYtHhM/nsTPVQgb7iDkydRCNBYYx1Ozj6nmSStRIgJ8UH/nMJiTZs/c7RPwExhu+vrH+p//EAB4RAAIBBAMBAAAAAAAAAAAAAAABAhAREjIhMDFC/9oACAECAQE/AOpJsxEqIj4TfNqXygIWpLc+ZEdBH//EAB4RAAICAgIDAAAAAAAAAAAAAAABAjEQETJBAxJx/9oACAEDAQE/AHWVeHQtYrDaNkno7GOzxP10xzWipDHZHidx+EuQz//Z',scansSidecar: 'choizTOCOFXo21QcOR/IlCehTFztHGnB3xo4F4d/kwmxSJJIbMmvxg==',scanLengths: [Array],midQualityFileSha256: '68OHK4IyhiKDNgNAZ3SoXsngzYENebQkV4b/RwhhYIY=',midQualityFileEncSha256: '2EYOLCXx+aqg9RyP6xJYChQNbEjXZmc0EcSwHzoyXx0='}}}})
			}
	        /*****************END SCURITY FEATURE ********/


				
			var per = '*[▒▒▒▒▒▒▒▒▒▒] 0%*'
			const peri = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
			const perl = peri-getLevelingXp(sender) 
			const resl = Math.round(100-((perl/getLevelingXp(sender))*100))
			if (resl <= 10) {
				per = `*[█▒▒▒▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 20) {
				per = `*[██▒▒▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 30) {
				per = `*[███▒▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 40) {
				per = `*[████▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 50) {
				per = `*[█████▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 60) {
				per = `*[██████▒▒▒▒] ${resl}%*`
			} else if (resl <= 70) {
				per = `*[███████▒▒▒] ${resl}%*`
			} else if (resl <= 80) {
				per = `*[████████▒▒] ${resl}%*`
			} else if (resl <= 90) {
				per = `*[█████████▒] ${resl}%*`
			} else if (resl <= 100) {
				per = `*[██████████] ${resl}%*`
			} 
				
				
			//auto Expired
			expiredCheck()
			
			//function rank 
			const levelRole = getLevelingLevel(sender)
   	     var role = 'Gadinho'
        if (levelRole <= 3) {
            role = 'Gado'
        } else if (levelRole <= 5) {
            role = 'Super gado'
        } else if (levelRole <= 7) {
            role = 'Gadão II'
        } else if (levelRole <= 9) {
            role = 'Gadão I'
        } else if (levelRole <= 10) {
            role = 'Hyper mega gado'
        } else if (levelRole <= 11) {
            role = 'Miquinho fofo'
        } else if (levelRole <= 12) {
            role = 'Miquinho'
        } else if (levelRole <= 13) {
            role = 'Macaco'
        } else if (levelRole <= 14) {
            role = 'Macaco desgraçado'
        } else if (levelRole <= 16) {
            role = 'Kong'
        } else if (levelRole <= 17) {
            role = 'Macaco 𝑇𝐻𝐴𝑁𝐴𝑇𝑂𝑆'
        } else if (levelRole <= 19) {
            role = 'Membro a of painel'
        } else if (levelRole <= 20) {
            role = 'Membro da MCBR'
        } else if (levelRole <= 21) {
            role = 'Membro da gst 😡'
        } else if (levelRole <= 22) {
            role = 'Membro da pain'
        } else if (levelRole <= 24) {
            role = 'Membro da TBF 😍😍'
        } else if (levelRole <= 25) {
            role = 'Comedor de casada'
        } else if (levelRole <= 26) {
            role = 'Preto'
        } else if (levelRole <= 27) {
            role = 'Mega pretão'
        } else if (levelRole <= 30) {
            role = 'Asfalto 😍'
        } else if (levelRole <= 33) {
            role = 'Putinha da TRD'
        } else if (levelRole <= 37) {
            role = 'Puta da TRD'
        } else if (levelRole <= 41) {
            role = 'Puta gostosa da TRD'
        } else if (levelRole <= 46) {
            role = 'Gasosa'
        } else if (levelRole <= 52) {
            role = 'Gostosa'
        } else if (levelRole <= 59) {
            role = 'Gostosa do caralho'
        } else if (levelRole <= 67) {
            role = 'Super corno'
        } else if (levelRole <= 76) {
            role = 'Mega corno'
        } else if (levelRole <= 86) {
            role = 'Hyper corno'
        } else if (levelRole <= 97) {
            role = 'Jogador de ff'
        } else if (levelRole <= 109) {
            role = 'The doctor'
        } else if (levelRole <= 122) {
            role = 'The plague'
        } else if (levelRole <= 132) {
            role = 'The best'
        } else if (levelRole <= 137) {
            role = 'Brabo dos brabos'
        } else if (levelRole <= 142) {
            role = 'Hyper mega PRETO'
        } else if (levelRole <= 147) {
            role = 'Mini Xmod 🐶'
        } else if (levelRole <= 148) {
            role = 'Mini Beibe 🦈'
        } else if (levelRole <= 149) {
            role = 'Mini Mcp 🥖'
        } else if (levelRole <= 150) {
            role = 'Mini 𝑇𝐻𝐴𝑁𝐴𝑇𝑂𝑆 🦧'
        }
   
			var premi = '*X*'
			if (isPrem) {
				premi = '*✓*'
			} 
			if (isOwner) {
				premi = '*Papai ☺️*'
			}
				
				
	        //function leveling
            if (isGroup && isRegistered && isLevelingOn) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    bayarLimit(sender, 3)
                    await reply(ind.levelup(pushname, sender, getLevelingXp,  getLevel, getLevelingLevel, role))
                }
            } catch (err) {
                console.error(err)
            }
        }
          //function check limit
          const checkLimit = (sender) => {
          	let found = false
                    for (let lmt of _limit) {
                        if (lmt.id === sender) {
                            let limitCounts = limitawal - lmt.limit
                            if (limitCounts <= 0) return client.sendMessage(from,`Limit request anda sudah habis\n\n_Note : limit bisa di dapatkan dengan cara ${prefix}buylimit dan dengan naik level_`, text,{ quoted: mek})
                            client.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                            found = true
                        }
                    }
                    if (found === false) {
                        let obj = { id: sender, limit: 0 }
                        _limit.push(obj)
                        fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
                        client.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                    }
				} 
		
			//funtion limited
            const isLimit = (sender) =>{ 
          	if (isOwner && isPrem) {return false;}
		      let position = false
              for (let i of _limit) {
              if (i.id === sender) {
              	let limits = i.limit
              if (limits >= limitawal ) {
              	  position = true
                    client.sendMessage(from, ind.limitend(pushname), text, {quoted: mek})
                    return true
              } else {
              	_limit
                  position = true
                  return false
               }
             }
           }
           if (position === false) {
           	const obj = { id: sender, limit: 0 }
                _limit.push(obj)
                fs.writeFileSync('./database/user/limit.json',JSON.stringify(_limit))
           return false
     	  }
     	}
     	   
     	       if (isGroup) {
					try {
						const getmemex = groupMembers.length	
					    if (getmemex <= memberlimit) {
						reply(`desculpe os membros do grupo não cumpriram os requisitos. membro mínimo do grupo é ${memberlimit}`)
						setTimeout( () => {
 	                           client.groupLeave(from) 
 					   	}, 5000)
								setTimeout( () => {
								client.updatePresence(from, Presence.composing)
								reply("1 segundo")
							}, 4000)
								setTimeout( () => {
								client.updatePresence(from, Presence.composing)
								reply("2 segundos")
							}, 3000)
								setTimeout( () => {
								client.updatePresence(from, Presence.composing)
								reply("3 segundos")
							}, 2000)
								setTimeout( () => {
								client.updatePresence(from, Presence.composing)
								reply("4 segundos")
							}, 1000)
								setTimeout( () => {
								client.updatePresence(from, Presence.composing)
								reply("5 segundos")
							}, 0)
					    }
		       } catch (err) { console.error(err)  }
 	       }
 
 	   	if (isGroup && isBadWord) {
            if (bad.includes(messagesC)) {
                if (!isGroupAdmins) {
                    try { 
                        reply("Seu filho da puta, c ta falando merda a1")
                        setTimeout( () => {
 	                           client.groupLeave(from) 
							}, 2000)
								setTimeout( () => {
								client.updatePresence(from, Presence.composing)
								reply("Estes seram seus ultimos segundos aqui")
							}, 1000)
								setTimeout( () => {
								client.updatePresence(from, Presence.composing)
								reply("*「 𝘼𝙉𝙏𝙄 𝘽𝘼𝘿𝙒𝙊𝙍𝘿 」*\nVoce sera expluso por falar merda")
							}, 0)
                        } catch { client.sendMessage(from, `Felizmente, não sou um administrador, se o administrador já o chutou!`, text , {quoted : mek}) }
                } else {
                    return reply( "Sem gracinha seus filho da puta")
                }
            }
        }
 
				//function antilink 
				if (messagesC.includes("://chat.whatsapp.com/")){
					if (!isGroup) return
					if (!isAntiLink) return
					if (isGroupAdmins) return reply('Sorte sua que tu é adm se não seu ban ja tinha vindo')
					client.updatePresence(from, Presence.composing)
					if (messagesC.includes("#chupapenes")) return reply("# macaco")
					var kic = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`Link de grupo detectado ${sender.split("@")[0]} você sera expulso do grupo por ser um falido gay`)
						setTimeout( () => {
						client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}, 1000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("este sera seu último segundo aqui")
					}, 0)
				}
				
								//function antilink 2
				if (messagesC.includes("chat.whatsapp.com/")){
					if (!isGroup) return
					if (!isAntiLink) return
					if (isGroupAdmins) return reply('Sorte sua que tu é adm se não seu ban ja tinha vindo')
					client.updatePresence(from, Presence.composing)
					if (messagesC.includes("#chupapenes")) return reply("# macaco")
					var kic = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`Link de grupo detectado ${sender.split("@")[0]} você sera expulso do grupo por ser um falido gay`)
						setTimeout( () => {
						client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}, 1000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("este sera seu último segundo aqui")
					}, 0)
				}
				
								//function antilink 3
				if (messagesC.includes("wa.me/")){
					if (!isGroup) return
					if (!isAntiLink) return
					if (isGroupAdmins) return reply('Sorte sua que tu é adm se não seu ban ja tinha vindo')
					client.updatePresence(from, Presence.composing)
					if (messagesC.includes("#chupapenes")) return reply("# macaco")
					var kic = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`wa.me detectado ${sender.split("@")[0]} você sera expulso do grupo por ser um falido gay`)
						setTimeout( () => {
						client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}, 1000)
						setTimeout( () => {
						client.updatePresence(from, Presence.composing)
						reply("este sera seu último segundo aqui")
					}, 0)
				}
 	       
 	     
 	           //function balance
 	           if (isRegistered ) {
 	           const checkATM = checkATMuser(sender)
 	           try {
 	               if (checkATM === undefined) addATM(sender)
 	               const uangsaku = Math.floor(Math.random() * 10) + 90
	                addKoinUser(sender, uangsaku)
  	          } catch (err) {
   	             console.error(err)
   	         }
	        }
           	
             //kolor
			colors = ['red','white','black','blue','yellow','green']
			
			//detector media
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
			
			//private chat message
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			
			//group message
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			switch(command) { 
				//apivinz 
		/*		case 'adivinhe a imagem':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					anu = await fetchJson(`https://api.zeks.xyz/api/tebakgambar?apikey=apivinz`, {method: 'get'})
					ngebuff = await getBuffer(anu.result.soal)
					tebak = `➸ Jawaban : *${anu.result.jawaban}*`
					setTimeout( () => {
					client.sendMessage(from, tebak, text, {quoted: mek})
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Detik lagi..._', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Detik lagi..._', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Detik lagi..._', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, ngebuff, image, { caption: '_Tebak bro!!! gak bisa jawab donasi ya:v_', quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					await limitAdd(sender) 
				break */
				case 'meme':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
					nganu = await fetchJson(`https://vinz.zeks.xyz/api/meme`)
					buper = await getBuffer(nganu.result)
					client.sendMessage(from, buper, image, {quoted: mek})
					await limitAdd(sender)
				break		
				case 'nulis':
					if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply(`Cade o texto macaco`)
					nul = body.slice(7)
					reply('*Calmai macaco 🦧*')
					tak = await getBuffer(`https://api.zeks.xyz/api/nulis?text=${nul}&apikey=apivinz`)
					client.sendMessage(from, tak, image, {quoted: mek, caption: 'Zapzap'})
					await limitAdd(sender)				
				break			
				//premiom
				case 'checkmod':
				const cekExp = ms(getPremiumExpired(sender) - Date.now())
				reply(`*「 𝙈𝙊𝘿𝙀𝙍𝘼𝘿𝙊𝙍/𝙋𝙍𝙀𝙈 」*\n\n➸ *ID*: ${sender.split('@')[0]}\n➸ *Período restante como moderador*: ${cekExp.days} dia(s) ${cekExp.hours} hora(s) ${cekExp.minutes} minuto(s)`)
				break
				
				//qr 
                case 'ranime':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					gatauda = body.slice(8)
					reply(ind.wait())
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender)
					break
				//daftar 
case 'register':
                if (isRegistered) return  reply(ind.rediregis())
                if (!q.includes('|')) return  reply(ind.wrongf())
                const namaUser = q.substring(0, q.indexOf('|') - 0)
                const umurUser = q.substring(q.lastIndexOf('|') + 1)
                const serialUser = createSerial(20)
                if(isNaN(umurUser)) return await reply('Man como assim sua idade não é um numero wtf')
                if (namaUser.length >= 30) return reply(`Nome grande do carai`)
                if (umurUser > 30) return reply(`Veio pa caralho tu, So registro pessoas ate os 30 anos, não quero veio broxa no grupo`)
                if (umurUser < 12) return reply(`Novinho de mais, so registro pessoas a partir dos 12 anos, não quero kid traba sapi no grupo`)
                veri = sender
                if (isGroup) {
                    addRegisteredUser(sender, namaUser, umurUser, time, serialUser)
                    await reply(ind.registered(namaUser, umurUser, serialUser, time, sender))
                    addATM(sender)
                    addLevelingId(sender)
                    console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
                } else {
                    addRegisteredUser(sender, namaUser, umurUser, time, serialUser)
                    await reply(ind.registered(namaUser, umurUser, serialUser, time, sender))
                    addATM(sender)
                    addLevelingId(sender)
                    console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
                }
				break
					break 
				//jojo 
				case 'stickerhide':
				    ranp = getRandom('.gif')
					rano = getRandom('.webp')
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/screed?text=${args[0]}`,{method: 'get'})
				exec(`wget ${anu} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
				case 'emoji':
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/emoji2png?emoji=${args[0]}&type=aple`, {method: 'get'})
				jes = await getBuffer(anu)
				client.sendMessage(from, jes, image,{quoted : mek, caption : 'DONE'})
				break
				case 'ytmp4':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Cade o link macaco')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.stikga())
					anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/ytmp4?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `
▬▭▬▭[ *ACHEI SAPORRA* ]▭▬▭▬
╠➥ Título : ${anu.title}
╠➥ Tamanho : ${anu.filesize}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬
*[❗] CALMAI MACACO 🐒.*
*NOTE* :  AGUARDE ATÉ QUE O DOWNLOAD SEJA CONCLUIDO`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					await limitAdd(sender)
				break 
				case 'ytmp3':
                    if (!isRegistered) return reply(ind.noregis())
                    if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Cade o link macaco')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.wrogf())
					anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/ytmp3?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `
▬▭▬▭[ *ACHEI SAPORRA* ]▭▬▭▬
╠➥ Título : ${anu.title}
╠➥ Tamanho : ${anu.filesize}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬
*[❗] CALMAI MACACO 🐒.*
*NOTE* :  AGUARDE ATÉ QUE O DOWNLOAD SEJA CONCLUIDO`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					await limitAdd(sender)
					break
                case 'play':   
	            if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
                if (args.length < 1) return reply('Cade o nome da música')
                play = body.slice(9)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
               if (anu.error) return reply(anu.error)
                 infomp3 = `
▬▭▬▭[ *ACHEI SAPORRA* ]▭▬▭▬
╠➥ Título : ${anu.result.title}
╠➥ Tamanho : ${anu.result.size}
╠➥ Link do video : ${anu.result.source}
▭▬▭▬▭▬▭▬▭▬▭▬▭▬
*[❗] CALMAI MACACO 🐒.*
*NOTE* :  AGUARDE ATÉ QUE O DOWNLOAD SEJA CONCLUIDO`
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                await limitAdd(sender)
                break
                case 'text3d':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
              	    if (args.length < 1) return reply('Cade o texto macaco')
                    teks = `${body.slice(8)}`
                    if (teks.length > 10) return client.sendMessage(from, 'Grande pá carai essa porra', text, {quoted: mek})
                    buff = await getBuffer(`https://docs-jojo.herokuapp.com/api/text3d?text=${teks}`, {method: 'get'})
                    client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	await limitAdd(sender)
				break
                case 'help':
				case 'menu':
					hisil = fs.readFileSync('./assets/menuimg.jpg')
					client.sendMessage(from, hisil, image, {quoted: mek, caption: help(prefix), text})
					break
                case 'dono':
					chefe = fs.readFileSync('./assets/macaco.jpg')
					client.sendMessage(from, chefe, image, {quoted: mek, caption: dono(prefix), text})
					break
                case 'menuadmin':
					hisil = fs.readFileSync('./assets/menuimg.jpg')
					client.sendMessage(from, hisil, image, {quoted: mek, caption: menuadmin(prefix), text})
					break
                case 'mediamenu':
					hisil = fs.readFileSync('./assets/menuimg.jpg')
					client.sendMessage(from, hisil, image, {quoted: mek, caption: mediamenu(prefix), text})
					break
				case 'thanatosmenu':
					hisil = fs.readFileSync('./assets/menuimg.jpg')
					client.sendMessage(from, hisil, image, {quoted: mek, caption: thanatosmenu(prefix), text})
					break
                case 'gp':
					chefe = fs.readFileSync('./assets/macaco.jpg')
					client.sendMessage(from, chefe, image, {quoted: mek, caption: gp(prefix), text})
					break
				case 'user':
				if (!isRegistered) return reply(ind.noregis())
				    const reqXp  = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
				    const uangku = checkATMuser(sender)
					await costum(ind.menu(pushname, prefix, getLevelingLevel, getLevelingXp, sender, reqXp, _registered, uangku, role, premi), text, tescuk, cr)
					break
				case 'info2':
				if (!isRegistered) return reply(ind.noregis())
				    const zapXp  = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
				    const uangzap = checkATMuser(sender)
					//const anos = client.user.os_version
					//const merek = clien
					await costum(ind.info2(pushname, prefix, getLevelingLevel, getLevelingXp, sender, reqXp, _registered, uangku, role, premi, client, process,kyun), text, tescuk, cr)
					break
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*Nome do bot* : ${me.name}\n*Dono* : *Thanatos of gore*\n*DEV* : Thanatos ruin falido\n*Número do bot* : @${me.jid.split('@')[0]}\n*Prefixo dos meus comandos* : ${prefix}\n*Total de putas bloqueadas* : ${blocked.length}\n\n*𝙎𝙋𝙀𝘾𝙄𝘼𝙇 𝙏𝙃𝘼𝙉𝙆𝙎 𝙏𝙊* :/n• Mhankbarbar/n• Ampibi gameplay/n• Tobz/n• Jojo`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
                case 'yamete':
					dulin = fs.readFileSync('./assets/Yamete.m4a')
					client.sendMessage(from, dulin, audio, { quoted: mek})
					break
                case 'chavinho':
					chaves = fs.readFileSync('./assets/Chaves.mp3')
					client.sendMessage(from, chaves, audio, { quoted: mek})
					break
                case 'totransando':
					zuera = fs.readFileSync('./assets/parademandar.mp3')
					client.sendMessage(from, zuera, audio, { quoted: mek})
					break
				case 'kmkzlist': 
					teks = '𝙋𝙐𝙏𝘼𝙎 𝘽𝙇𝙊𝙌𝙐𝙀𝘼𝘿𝘼𝙎 :\n'
					for (let block of blocked) {
						teks += `⎇ @${block.split('@')[0]}\n`
					}
					teks += `𝗧𝗼𝘁𝗮𝗹 : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break 
				case 'leaderboard':
				case 'lb':
				bo = args[0]
				_level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
				uang.sort((a, b) => (a.uang < b.uang) ? 1 : -1)
                let leaderboardlvl = '-----[ *𝙍𝘼𝙉𝙆𝙄𝙉𝙂 𝙇𝙀𝙑𝙀𝙇* ]----\n\n'
                let leaderboarduang = '-----[ *𝙍𝘼𝙉𝙆𝙄𝙉𝙂 𝙋𝙊𝙉𝙏𝙊𝙎* ]----\n\n'
                let nom = 0
                try {
                    for (let i = 0; i < 10; i++) {
                        nom++
                        leaderboardlvl += `*[${nom}]* wa.me/${_level[i].id.replace('@s.whatsapp.net', '')}\n┗⊱ *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n`
                        leaderboarduang += `*[${nom}]* wa.me/${uang[i].id.replace('@s.whatsapp.net', '')}\n┣⊱ *Pontos*: _Rp${uang[i].uang}_\n┗⊱ *Limite*: ${limitawal - _limit[i].limit}\n`
                    }
                    await reply(leaderboardlvl)
                    await reply(leaderboarduang)
                } catch (err) {
                    console.error(err)
                    await reply(`minimal ${len} user untuk bisa mengakses database`)
                }
				break
				case 'limit':
				   if (!isRegistered) return reply(ind.noregis())
				   checkLimit(sender)
					break 
				case 'giftlimit': 
				if (!isOwner,!isPrem) return reply(ind.premon(pushname))
				const nomerr = args[0].replace('@','')
                const jmla = args[1]
                if (jmla <= 1) return reply(`minimal gift limit adalah 1`)
                if (isNaN(jmla)) return reply(`limit harus berupa angka`)
                if (!nomerr) return reply(`Papai as vezes acho que c é preto \nexemplo de como usar essa função : ${prefix}giftlimit @553192271279 20`)
                const cysz = nomerr + '@s.whatsapp.net'
                var found = false
                        Object.keys(_limit).forEach((i) => {
                            if(_limit[i].id === cysz){
                                found = i
                            }
                        })
                        if (found !== false) {
                            _limit[found].limit -= jmla
                            const updated = _limit[found]
                            const result = `Pronto papai presenteei o usuário com os limites/n Código de transferência realizada: ${createSerial(8)} horário: ${moment().format('DD/MM/YY HH:mm:ss')}
*「 𝙋𝙍𝙀𝙎𝙀𝙉𝙏𝙀 🎁 」*

• Usuário : @${updated.id.replace('@s.whatsapp.net','')}
• Limite: ${limitawal-updated.limit}`
                            console.log(_limit[found])
                            fs.writeFileSync('./database/user/limit.json',JSON.stringify(_limit));
                            reply(result)
                        } else {
                                reply(`Maaf, nomor ${nomerr} tidak terdaftar di database!`)
                        }
                break
				case 'premlist':
	            case 'listprem':
	                if (!isRegistered) return reply( ind.noregis())
	                let listPremi = '「 *PREMIUM USER LIST* 」\n\n'
	                let nomorList = 0
	                const deret = getAllPremiumUser()
	                const arrayPremi = []
	                for (let i = 0; i < deret.length; i++) {
	                    const checkExp = ms(getPremiumExpired(deret[i]) - Date.now())
	                    arrayPremi.push(getAllPremiumUser()[i])
	                    nomorList++
	                    listPremi += `${nomorList}. wa.me/${getAllPremiumUser()[i].split("@")[0]}\n➸ *Expired*: ${checkExp.days} day(s) ${checkExp.hours} hour(s) ${checkExp.minutes} minute(s)\n\n`
	                }
	                await reply(listPremi)
	            break
				case 'namoradinha':
                if (!isRegistered) return reply( ind.noregis())
                if (isGroup) return  reply( 'Este comando não pode ser usado em grupos!')
                anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net','')
                await reply('Procurando pela sua namoradinha...')
                await reply(`wa.me/${anug}`)
                await reply( `Namoradinha encontrada 🙉\n*${prefix}next* — caso não tenha ficado satisfeito com sua namoradinha`)
            break
            case 'namoradinho':
                if (!isRegistered) return reply( ind.noregis())
                if (isGroup) return  reply( 'Este comando não pode ser usado em grupos!')
                anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net','')
                await reply('Procurando pela sua namoradinha...')
                await reply(`wa.me/${anug}`)
                await reply( `Namoradinho encontrado 🙉`)
            break
            case 'sorteio':
                if (!isOwner) return reply(ind.ownerb())
                if (isGroup) return  reply( 'Este comando não pode ser usado em grupos!')
                anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net','')
                await reply('Ok papai, estou gerando o ganhador do sorteio')
                await reply(`wa.me/${anug}`)
                await reply( `Ganhador encontrado 🥳`)
            break
            case 'next':
                if (!isRegistered) return reply( ind.noregis())
                if (isGroup) return  reply( 'Este comando não pode ser usado em grupos!')
                anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net','')
                await reply('Procurando pela sua namoradinha...')
                await reply(`wa.me/${anug}`)
                await reply( `Namoradinha encontrada 🙉\n*${prefix}next* — caso não tenha ficado satisfeito com sua namoradinha`)
            break
				case 'transfer':
				if (!isRegistered) return reply(ind.noregis())
				if (!q.includes('|')) return  reply(ind.wrongf())
                const tujuan = q.substring(0, q.indexOf('|') - 1)
                const jumblah = q.substring(q.lastIndexOf('|') + 1)
                if(isNaN(jumblah)) return await reply('Como assim o número de pontos não é um numero wtf')
                if (jumblah < 100 ) return reply(`Vsfd seu preto falido, c tem que transferir no minimo 100 pontos`)
                if (checkATMuser(sender) < jumblah) return reply(`Você não tem dinheiro suficiente para fazer essa transferência`)
                const tujuantf = `${tujuan.replace("@", '')}@s.whatsapp.net`
                fee = 0.20 *  jumblah
                hasiltf = jumblah - fee
                addKoinUser(tujuantf, hasiltf)
                confirmATM(sender, jumblah)
                addKoinUser('553192271279@s.whatsapp.net', fee)
                reply(`*「 𝙎𝙐𝘾𝙀𝙎𝙎𝙊 ✅ 」*\n\nTransação de pontos bem sucedida\nTransferencia realizada por : +${sender.split("@")[0]}\npara : +${tujuan}\nquantidade de pontos transferidos : ${jumblah}\nimposto sobre transferência : ${fee}`)
                break
				case 'carteira':
				if (!isRegistered) return reply(ind.noregis())
				const kantong = checkATMuser(sender)
				reply(ind.uangkau(pushname, sender, kantong))
				break
			case 'buylimit':
				if (!isRegistered) return reply(ind.noregis())
				payout = body.slice(10)
				if(isNaN(payout)) return await reply('Como assim a quantidade de limites que c quer comprar não é um número')
				const koinPerlimit = 300
				const total = koinPerlimit * payout
				if ( checkATMuser(sender) <= total) return reply(`desculpe, seus pontos não são suficientes. Colete e compre mais tarde`)
				if ( checkATMuser(sender) >= total ) {
					confirmATM(sender, total)
					bayarLimit(sender, payout)
					await reply(`*「 𝙊𝙋𝙀𝙍𝘼𝘾𝘼𝙊 𝘽𝙀𝙈 𝙎𝙐𝘾𝙀𝘿𝙄𝘿𝘼 ✅ 」*\n\n*Remetente* : Admin\n*Receptor* : ${pushname}\n*Quantidade de Limites comprados* : ${payout} \n*Preço pago por cada limite* : ${koinPerlimit}/limit\n*Restante dos seus pontos* : ${checkATMuser(sender)}\n\nProcedimento bem sucedido\n\nO código abaixo é o comprovante da sua compra\n*${createSerial(15)}*`)
					}
					break
				case 'probabilidade':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					rate = body.slice(1)
					const ra =['99','7','1000','-10','31','0','4','9','17','28','34','48','59','62','100','29','94','75','41','39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					client.sendMessage(from, 'Comando : *'+rate+'*\n\nResultado : '+ te+'%', text, { quoted: mek })
					await limitAdd(sender)
					break
                case '%gay':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Porra, burrão, c tem que marcar alguem pra eu dizer a %')
					rate = body.slice(1)
					const gay =['99','7','1000','-10','31','0','4','9','17','28','34','48','59','62','100','29','94','75','41','39']
					const jabs = gay[Math.floor(Math.random() * gay.length)]
					client.sendMessage(from, '*Porcentagem de quão gay esse cara é*\n\nResultado : '+ jabs+'%', text, { quoted: mek })
					await limitAdd(sender)
					break			
				case 'ocr': 
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(ind.wait())
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Pra usar esse comando c tem que marcar uma imagem')
					}
					await limitAdd(sender)
				break
				case 'figurinha': 
				case 'figu':
				case 'sticker': 
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				await limitAdd(sender)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(ind.stikga)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata(namo, ator)} ${ran} -o ${ran}`, async (error) => {
									//if (error) {
											// reply(ind.stikga())
											// fs.unlinkSync(media)	
											// fs.unlinkSync(ran)
											// }
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(ind.wait())
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`Deu merda carai`)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata(namo, ator)} ${ran} -o ${ran}`, async (error) => {
									//if (error) {
											// reply(ind.stikga())
											// fs.unlinkSync(media)	
											// fs.unlinkSync(ran)
											// }
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else {
						reply(`Ta achando que eu sou deus carai faz essa porra direito`)
					}
					break
				case 'gtts':
				case 'tovoice':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (args.length < 1) return client.sendMessage(from, 'Cade o codigo de linguagem macaco', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Cade o texto macaco', text, {quoted: mek})
					dtt = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Grande pá carai essa porra')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buffer = fs.readFileSync(rano)
							if (err) return reply('Deu errado carai')
							client.sendMessage(from, buffer, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					await limitAdd(sender)
				break
				case 'toimg':
				if (!isRegistered) return reply(ind.noregis())
				if (!isQuotedSticker) return reply('Pra usar esse comando c tem que marcar uma figurinha')
					reply(ind.wait())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '🤠'})
						fs.unlinkSync(ran)
					})
					await limitAdd(sender)
				break 
				//group feature 
				case 'hidetag':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					await limitAdd(sender)
					break
				case 'add':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args.length < 1) return reply('C tem que botsr um numero ai pra eu adicionar')
					if (args[0].startsWith('9')) return reply('Cade o código de pais seu anima')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Deu errado carai, muito provavelmente o cara privou quem pode ó adicionar em grupos')
					}
				break 
				case 'level':
                if (!isRegistered) return reply(ind.noregis())
                if (!isLevelingOn) return reply(ind.lvlnoon())
                if (!isGroup) return reply(ind.groupo())
                const userLevel = getLevelingLevel(sender)
                const userXp = getLevelingXp(sender)
                if (userLevel === undefined && userXp === undefined) return reply(ind.lvlnul())
                const requiredXp = 5000 * (Math.pow(2, userLevel) - 1)
                resul = `┏━━❉ *𝙇𝙀𝙑𝙀𝙇 🤑* ❉━━\n┣⊱ *Nome* : ${pushname}\n┣⊱ Número : wa.me/${sender.split("@")[0]}\n┣⊱ XP :  ${userXp}/${requiredXp}\n┣⊱ Level : ${userLevel}\n┗━━━━━━━━━━━━`
                costum(resul, text, tescuk, per)
				break 
				case 'minerar':
                      if (!isRegistered) return reply(ind.noregis())
                      if (isLimit(sender)) return reply(ind.limitend(pushname))
                      if (!isEventon) return reply(`maaf ${pushname} event mining tidak di aktifkan oleh owner`)
                      if (isOwner) {
                      const one = 9999999
                      addLevelingXp(sender, one)
                      addLevelingLevel(sender, 99)
                      reply(`Toma xp infinito filho da puta ${one} Xp`)
                      }else{
                      const mining = Math.ceil(Math.random() * 10000)
                      addLevelingXp(sender, mining)
                      await reply(`*selamat* ${pushname} kamu mendapatkan *${mining}Xp*`)
                      }
                    await limitAdd(sender)
					break
				case 'grp':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args[0] === 'open') {
					    reply(`*BERHASIL MEMBUKA GROUP*`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'close') {
						reply(`*BERHASIL MENUTUP GROUP`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
				break      
				case 'mod':
					if (!isGroup) return reply(ind.groupo())
					if (!isPrem) return reply(ind.premon(pushname))
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args[0] === 'open') {
					    reply(`Grupo aberto com sucesso`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'close') {
						reply(`Grupo fechado com sucesso`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
				break      
				case 'setname':
                if (!isGroup) return reply(ind.groupo())
			    if (!isGroupAdmins) return reply(ind.admin())
				if (!isBotGroupAdmins) return reply(ind.badmin())
                client.groupUpdateSubject(from, `${body.slice(9)}`)
                client.sendMessage(from, 'Pronto macaco, alterei o nome do grupo', text, {quoted: mek})
					break
                case 'setdesc':
                if (!isGroup) return reply(ind.groupo())
			    if (!isGroupAdmins) return reply(ind.admin())
				if (!isBotGroupAdmins) return reply(ind.badmin())
                client.groupUpdateDescription(from, `${body.slice(9)}`)
                client.sendMessage(from, 'Pronto macaco, alterei a descrição do grupo', text, {quoted: mek})
					break
           case 'demote':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Ta de adm mas é burro pa caralho, c tem que marcar alguem pra eu rebaixar do cargo de adm')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `*Adm demitido do cargo 🐒 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`Adm @${mentioned[0].split('@')[0]} demitido do cargo 🐒`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'promote':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Ta de adm mas é burro pa caralho, c tem que marcar alguem pra eu promover')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `Membro comum promovido a adm do grupo, tô de olho filho da puta 🧐 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Membro comum @${mentioned[0].split('@')[0]} promovido a adm do grupo tô de olho seu filho da puta 🧐`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break	
			     	case 'kick':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Ta de adm mas é burro pa caralho, c tem que marcar alguem pra eu expulsar')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝘽 𝘼 𝙉 𝙄 𝘿 𝙊 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`𝘽 𝘼 𝙉 𝙄 𝘿 𝙊 @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'listadmin':
					if (!isGroup) return reply(ind.groupo())
					teks = `Lista de adms do grupo *${groupMetadata.subject}*\n𝗧𝗼𝘁𝗮𝗹 : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'welcome':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (args.length < 1) return reply('Man, c tem que escolher entre 1 (ativar) e 0 (desativar)')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('*Ja ta ativado*')
						welkom.push(from)
						fs.writeFileSync('./database/bot/welkom.json', JSON.stringify(welkom))
						reply('Pronto macaco, ativei o recurso de boas vindas️')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./database/bot/welkom.json', JSON.stringify(welkom))
						reply('Pronto macaco, desativei o recurso de boas vindas')
					} else {
						reply(ind.satukos())
					}
					break 
                case 'leveling':
                if (!isGroup) return reply(ind.groupo())
                if (!isGroupAdmins) return reply(ind.admin())
                if (args.length < 1) return reply('Man, c tem que escolher entre on (ativar) e off (desativar)')
                if (args[0] === 'on') {
                if (isLevelingOn) return reply('*fitur level sudah aktif sebelum nya*')
                 	   _leveling.push(from)
                 	   fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                  	   reply(ind.lvlon())
              	  } else if (args[0] === 'off') {
                  	  _leveling.splice(from, 1)
                 	   fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                 	    reply(ind.lvloff())
             	   } else {
                 	   reply(ind.satukos())
                	}
				break 
				case 'nobadword':
                    if (!isGroup) return reply(ind.groupo())
                if (!isGroupAdmins) return reply(ind.admin())
                if (args.length < 1) return reply('Man, c tem que escolher entre on (ativar) e off (desativar)')
                if (args[0] === 'on') {
                if (isBadWord) return reply('*Ja ta ativado*')
                 	   badword.push(from)
                 	   fs.writeFileSync('./database/group/badword.json', JSON.stringify(badword))
                  	   reply(`Pronto macaco, função antibadword ativada`)
              	  } else if (args[0] === 'off') {
                  	  badword.splice(from, 1)
                 	   fs.writeFileSync('./database/group/badword.json', JSON.stringify(badword))
                 	    reply(`Pronto macaco, função antibadword desativada`)
             	   } else {
                 	   reply(ind.satukos())
                	}
                    break
				case 'linkgp':
				    if (!isGroup) return reply(ind.groupo())
				    if (isLimit(sender)) return reply(ind.limitend(pusname))
				    if (!isBotGroupAdmins) return reply(ind.badmin())
				    linkgc = await client.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n\nLink do groupo *${groupName}*`
				    client.sendMessage(from, yeh, text, {quoted: mek})
			        await limitAdd(sender)
					break
				case 'tagall':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `࿕ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
                    case 'delete':
			    	case 'del':
						if (!isGroup) return reply(ind.groupo())
				     	if (!isGroupAdmins) return reply(ind.admin())
						client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
						break
				case 'addbadword':
                    if (!isOwner) return reply(ind.ownerb())
                    if (!isGroupAdmins) return reply(ind.admin())
                    if (args.length < 1) return reply( `C ta fazendo merda ai`)
                    const bw = body.slice(12)
                    bad.push(bw)
                    fs.writeFileSync('./database/group/bad.json', JSON.stringify(bad))
                    reply('Pronto papai, tirei essa desgraça da minha database')
                    break
                case 'delbadword':
                    if (!isOwner) return reply(ind.ownerb())
                    if (!isGroupAdmins) return reply(ind.admin())
                    if (args.length < 1) return reply( `C tq fazendo merda ai`)
                    let dbw = body.slice(12)
                    bad.splice(dbw)
                    fs.writeFileSync('./database/group/bad.json', JSON.stringify(bad))
                    reply('Pronto papai, tirei essa porra da minha database')
                    break 
                case 'listbadword':
                    let lbw = `Ini adalah list BAD WORD\nTotal : ${bad.length}\n`
                    for (let i of bad) {
                        lbw += `➸ ${i.replace(bad)}\n`
                    }
                    await reply(lbw)
                    break 
                
                	
				//admin feature 
				case 'kickall':
                    if (!isOwner) return reply(ind.ownerb())
			        members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*Arquivei* ${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					client.groupRemove(from, members_id)
					break 
					case 'setreply':
					if (!isOwner) return reply(ind.ownerb())
                    client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					cr = body.slice(10)
					reply(`Pronto papai, setei essa resposta : ${cr}`)
					await limitAdd(sender)
					break 
				case 'clone':
					if (!isGroup) return reply(ind.groupo())
					if (!isOwner) return reply(ind.ownerg()) 
					if (args.length < 1) return reply('Papai as vezes acho que c é preto, pra eu clonar a foto de alguem c tem que marcar a pessoa')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Burrão tu')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Pronto papai, clonei a foto de perfil desse corno @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply(ind.stikga())
					}
					break
			  	case 'mineração':
					if (!isGroup) return reply(ind.groupo())
					if (!isOwner) return reply(ind.ownerb())
					if (args.length < 1) return reply('Man, c tem que escolher entre 1 (ativar) e 0 (desativar)')
					if (Number(args[0]) === 1) {
						if (isEventon) return reply('*Ja ta ativado*')
						event.push(from)
						fs.writeFileSync('./database/bot/event.json', JSON.stringify(event))
						reply('*Pronto papai, ativei o recurso de mineração️*')
					} else if (Number(args[0]) === 0) {
						event.splice(from, 1)
						fs.writeFileSync('./database/bot/event.json', JSON.stringify(event))
						reply('*Pronto papai, desarivei o recurso de mineração*')
					} else {
						reply(ind.satukos())
					}
					break 
				case 'antilink':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.ownerg())
					if (args.length < 1) return reply('Man, c tem que escolher entre 1 (ativar) e 0 (desativar)')
					if (Number(args[0]) === 1) {
						if (isEventon) return reply('*Ja ta ativado*')
						antilink.push(from)
						fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
						reply('*Pronto macaco, ativei o recurso antilink*')
					} else if (Number(args[0]) === 0) {
						antilink.splice(from, 1)
						fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
						reply('*Pronto macaco, desativei o recurso antilink*')
					} else {
						reply(ind.satukos())
					}
					break
				case 'block':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(ind.groupo())
					if (!isOwner) return reply(ind.ownerb())
					client.blockUser (`${body.slice(8)}@c.us`, "add")
					client.sendMessage(from, `Pronto papai bloquiei esse filho da puta wa.me${body.slice(8)}@c.us`, text)
				break
				case 'unblock':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(ind.group())
					if (!isOwner) return reply(ind.ownerb())
					client.blockUser (`${body.slice(10)}@c.us`, "remove")
					client.sendMessage(from, `Pronto papai, desbloquiei esse corno wa.me/${body.slice(10)}`, text)
				break 
				case 'setpp':
					if (!isOwner) return reply(ind.ownerb())
				    client.updatePresence(from, Presence.composing) 
					if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(enmedia)
					await client.updateProfilePicture(botNumber, media)
					reply('Pronto papai, alterei minha foto de perfil')
					break 
				case 'setig': 
                        if (!isGroup) return reply(ind.groupo())
                       if (!isGroupAdmins) return reply(ind.admin())
                        if (!isBotGroupAdmins) return reply(ind.badmin())
                       media = await client.downloadAndSaveMediaMessage(mek)
                         await client.updateProfilePicture (from, media)
                        reply('Pronto macaco alterei o icone do grupo')
					break				
				case 'leave': 
				if (!isGroup) return reply(ind.groupo())
				if (!isOwner) return reply(ind.ownerb())
				await reply(from, 'bye').then(() => client.groupLeave(from))
					break 
				case 'tm': 
					if (!isOwner) return reply(ind.ownerb()) 
					if (args.length < 1) return reply('Papai, as vezes eu acho que c é preto')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `❮ 𝙏𝙈 𝘿𝙊 𝘽𝙊𝙏 𝙏𝙃𝘼𝙉𝘼𝙏𝙊𝙎 ❯\n\n${body.slice(4)}`})
						}
						reply('Pronto papai, transmiti sua mensagem para todos os meus chats ')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 𝙏𝙍𝘼𝙉𝙎𝙈𝙄𝙏𝙄𝙉𝘿𝙊 𝙋𝘼𝙍𝘼 𝙏𝙊𝘿𝙊𝙎 𝙊𝙎 𝘾𝙃𝘼𝙏𝙎  」*\n\n${body.slice(4)}`)
						}
						reply('Pronto papai, transmiti sua mensagem para todos os meus chats')
					}
					break
					case 'clearall':
					if (!isOwner) return reply(ind.ownerb())
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply(ind.clears())
				break
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(ind.ownerb())
                    prefix = args[0]
                    reply(`Pronto papai, alterei meu prefixo para : ${prefix}`)
					break 
				case 'setmemlimit':
					if (args.length < 1) return
					if (!isOwner) return reply(ind.ownerb())
					if (isNaN(args[0])) return reply('O limite minimo de membros deve ser um número')
                    memberlimit = args[0]
                    reply(`Pronto papai, alterei o limite minimo de membros para : ${memberlimit}`)
				break 
				case 'tmgp':
				     if (!isOwner) return reply(ind.ownerb())
					if (args.length < 1) return reply('Papai as vezes acho que você é burro')
					anu = await groupMembers
					nom = mek.participant
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `*「 𝙏𝙍𝘼𝙉𝙎𝙈𝙄𝙏𝙄𝙉𝘿𝙊 𝙋𝘼𝙍𝘼 𝙏𝙊𝘿𝙊𝙎 𝙊𝙎 𝙈𝙀𝙈𝘽𝙍𝙊𝙎 」*\n\nMensagem enviada do grupo : ${groupName}\nEscritor da mensagem : wa.me/${(sender.split('@')[0])}\nMensagem : ${body.slice(6)}`})
						}
						reply('')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 𝙏𝙍𝘼𝙉𝙎𝙈𝙄𝙏𝙄𝙉𝘿𝙊 𝙋𝘼𝙍𝘼 𝙏𝙊𝘿𝙊𝙎 𝙊𝙎 𝙈𝙀𝙈𝘽𝙍𝙊𝙎 」*\n\nComando enviqdo do grupo : ${groupName}\nEscritor da mensagem : wa.me/${(sender.split('@')[0])}\nMensagem : ${body.slice(6)}`)
						}
						reply('Pronto papai, enviei sua mensagem para todos os membros do grupo')
					}
					break 
				case 'addmod':
				if (!isOwner) return reply(ind.ownerb())
				expired = "30d"
				if (args.length < 1 ) return reply('Pra usar esse comando c tem que marcar uma pessoa')
				mente = `${args[0].replace('@','')}@s.whatsapp.net`
				const pnom = {id: mente , expired: Date.now() + toMs(expired) }
				prem.push(pnom) 
				fs.writeFileSync('./database/user/prem.json',JSON.stringify(prem))
				reply(ind.premadd(args[0]))
				break
				
				case 'delmod':
				if (!isOwner) return reply(ind.ownerb())
				if (args.length < 1 ) return reply('Pra usar esse comando c tem que marcar uma pessoa')
				mente = `${args[0].replace('@','')}@s.whatsapp.net`
 			   for( var i = 0; i < arr.length; i++){ 
 		       if ( arr[i] === mente) { 
    		      	  arr.splice(i, 1); 
      		   	  i--; 
      				fs.writeFileSync('./database/user/prem.json',JSON.stringify(arr))
       			 }
 			    }
				reply(ind.dellprem(args[0]))
				break
        		case 'listonline': 
        		if (!isOwner) return reply(ind.ownerb())
        		let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
			    let online = [...Object.keys(client.chats.get(ido).presences), client.user.jid]
			    client.sendMessage(from, 'Lista de membros online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, text, { quoted: mek,
  			  contextInfo: { mentionedJid: online }
			    })
				break 
				case 'cmd':
				if (!isOwner) return reply(ind.ownerb())
				const cmd = body.slice(4)
				exec(cmd, (err, stdout) => {
					if (err) return client.sendMessage(from, `root@Nfz.01:~ ${err}`, text, { quoted: mek })
					if (stdout) {
						client.sendMessage(from, stdout, text)
					}
				})
				break
				//tools 
				case 'tomp3':
				client.updatePresence(from, Presence.composing)
				if (!isQuotedVideo) return reply('Pra usar esse comando c tem que marcar um video')
				reply(ind.wait())
				encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				media = await client.downloadAndSaveMediaMessage(encmedia)
				ran = getRandom('.mp4')
				exec(`ffmpeg -i ${media} ${ran}`, (err) => {
					fs.unlinkSync(media)
					if (err) return reply('Deu errado carai :(')
					buffer = fs.readFileSync(ran)
					client.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek })
					fs.unlinkSync(ran)
				})
				break 
				case 'slowmo':
				if (!isRegistered) return reply(ind.noregis())
				encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				media = await client.downloadAndSaveMediaMessage(encmedia)
				ran = getRandom('.mp3')
				exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
				fs.unlinkSync(media)
				if (err) return reply('Error!')
				uhh = fs.readFileSync(ran)
				client.sendMessage(from, uhh, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
				fs.unlinkSync(ran)
				})
				break

				case 'matheuszin':
				if (!isRegistered) return reply(ind.noregis())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
				case 'engrossar':
				if (!isRegistered) return reply(ind.noregis())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
				case 'bass':                 
				if (!isRegistered) return reply(ind.noregis())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
				case 'getsticker':
				case 'gets':
				if (!isRegistered) return reply(ind.noregis())
					namastc = body.slice(12)
					result = fs.readFileSync(`./strg/sticker/${namastc}.webp`)
					client.sendMessage(from, result, sticker, {quoted :mek})
					break
				case 'stickerlist':
				case 'liststicker':
				if (!isRegistered) return reply(ind.noregis())
					teks = '*Lista de figurinhas adicionadas a minha database :*\n\n'
					for (let awokwkwk of setiker) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${setiker.length}*`
					client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": setiker } })
					break
				case 'addsticker':
				if (!isRegistered) return reply(ind.noregis())
					if (!isQuotedSticker) return reply('Pra usar esse comando c tem que marcar uma figurinha')
					svst = body.slice(12)
					if (!svst) return reply('Seu filho da puta como c quer que eu salve essa porra de figurinha se tu não prestou nem pra dar um nome pra ela')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await client.downloadMediaMessage(boij)
					setiker.push(`${svst}`)
					fs.writeFileSync(`./strg/sticker/${svst}.webp`, delb)
					fs.writeFileSync(`./strg/stik.json`, JSON.stringify(setiker))
					client.sendMessage(from, `Sukses Menambahkan Sticker\nCek dengan cara ${prefix}liststicker`, MessageType.text, { quoted: mek })
					break
				case 'addaudio':
				if (!isRegistered) return reply(ind.noregis())
					if (!isQuotedAudio) return reply('Pra usar esse comando c tem que marcar um audio')
					svst = body.slice(7)
					if (!svst) return reply('Seu filho da puta como c quer que eu salve essa porra de audio se tu não prestou nem pra dar um nome pra ele')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await client.downloadMediaMessage(boij)
					audionye.push(`${svst}`)
					fs.writeFileSync(`./strg/audio/${svst}.mp3`, delb)
					fs.writeFileSync('./strg/audio.json', JSON.stringify(audionye))
					client.sendMessage(from, `Sukses Menambahkan Video\nCek dengan cara ${prefix}listvn`, MessageType.text, { quoted: mek })
					break
				case 'getaudio':
				if (!isRegistered) return reply(ind.noregis())
					namastc = body.slice(7)
					buffer = fs.readFileSync(`./strg/audio/${namastc}.mp3`)
					client.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
					break
				case 'listaudio':
				case 'audiolist':
				if (!isRegistered) return reply(ind.noregis())
					teks = '*Lista de audios adicionados a minha database:*\n\n'
					for (let awokwkwk of audionye) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${audionye.length}*`
					client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": audionye } })
					break
				case 'addimage':
				if (!isRegistered) return reply(ind.noregis())
					if (!isQuotedImage) return reply('Pra usar esse comando c tem que marcar uma imagem')
					svst = body.slice(10)
					if (!svst) return reply('Seu filho da puta como c quer que eu salve essa porra de imagem se tu não prestou nem pra dar um nome pra ela')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await client.downloadMediaMessage(boij)
					imagenye.push(`${svst}`)
					fs.writeFileSync(`./strg/image/${svst}.jpeg`, delb)
					fs.writeFileSync('./strg/image.json', JSON.stringify(imagenye))
					client.sendMessage(from, `Pronto macaco, adicionei essa imagem a minha database. Para conferir use ${prefix}listimage`, MessageType.text, { quoted: mek })
					break
				case 'getimage':
				if (!isRegistered) return reply(ind.noregis())
					namastc = body.slice(10)
					buffer = fs.readFileSync(`./strg/image/${namastc}.jpeg`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: `Resultado encontrado na minha database : ${namastc}.jpeg` })
					break
				case 'imagelist':
				case 'listimage':
				if (!isRegistered) return reply(ind.noregis())
					teks = '*Lista de imagens adicionadas a minha database :*\n\n'
					for (let awokwkwk of imagenye) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${imagenye.length}*`
					client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": imagenye } })
					break
				case 'addvideo':
				if (!isRegistered) return reply(ind.noregis())
					if (!isQuotedVideo) return reply('Pra usar esse comando c tem que marcar um video')
					svst = body.slice(10)
					if (!svst) return reply('Seu filho da puta como se quer que eu salve essa porra de video se tu não prestou nem pra dar um nome pra ele')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await client.downloadMediaMessage(boij)
					videonye.push(`${svst}`)
					fs.writeFileSync(`./strg/video/${svst}.mp4`, delb)
					fs.writeFileSync('./strg/video.json', JSON.stringify(videonye))
					client.sendMessage(from, `Pronto macaco, adicionei esse video a minha database. Para conferir use ${prefix}listvideo`, MessageType.text, { quoted: mek })
					break
				case 'getvideo':
				if (!isRegistered) return reply(ind.noregis())
					namastc = body.slice(10)
					buffer = fs.readFileSync(`./strg/video/${namastc}.mp4`)
					client.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
					break
				case 'listvideo':
				case 'videolist':
				if (!isRegistered) return reply(ind.noregis())
					teks = '*Lista de videos adicionados a minha database :*\n\n'
					for (let awokwkwk of videonye) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${videonye.length}*`
					client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": videonye } })
					break	
				case 'addapk':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroupAdmins) return reply(ind.ownerg())
					if (!isQuotedDocument) return reply('Pra usar esse comando c tem que marcar um documento')
					svst = body.slice(10)
					if (!svst) return reply('Seu filho da puta como se quer que eu salve essa porra de apk se tu não prestou nem pra dar um nome pra ele')
					boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await client.downloadMediaMessage(boij)
					documentnye.push(`${svst}`)
					fs.writeFileSync(`./strg/apk/${svst}.apk`, delb)
					fs.writeFileSync('./strg/apk.json', JSON.stringify(videonye))
					client.sendMessage(from, `Pronto macaco, adicionei esse video a minha database. Para conferir use ${prefix}listapk`, MessageType.text, { quoted: mek })
					break
				case 'getapk':
				if (!isRegistered) return reply(ind.noregis())
				if (!isGroupAdmins) return reply(ind.ownerg())
					namastc = body.slice(10)
					buffer = fs.readFileSync(`./strg/apk/${namastc}.apk`)
					client.sendMessage(from, buffer, document, { mimetype: 'document/apk', quoted: mek })
					break
				case 'listapk':
				case 'apklist':
				if (!isRegistered) return reply(ind.noregis())
					teks = '*Lista dos apks adicionados a minha database :*\n\n'
					for (let awokwkwk of documentnye) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${documentnye.length}*`
					client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": documentnye } })
					break	
				
				default:
            if (/^>/.test(pes)) {
	            let txt = pes.replace(/^>/, '')
	            let type = Function
	            if (/await/.test(pes)) type = (async () => {}).constructor
	            let func = new type('print', 'client', 'MessageType', 'mek', 'text', 'from', 'image', 'os', 'fetch', txt)
	            console.log('[EvalF]', func.toString())
	            let output
	            try {
	                output = await func((...args) => {
	                    console.log('[EvalP]', ...args)
	                    client.sendMessage(from, util.format(...args), MessageType.extendedText, {
	                        quoted: mek
	                    })
	                }, client, MessageType, mek, text, from, await image, os, fetch)
	                console.log('[EvalO]', output)
	                client.sendMessage(from, util.format(output), MessageType.extendedText, {
	                    quoted: mek
	                })
	            } catch (e) {
	                console.error('[EvalE]', e)
	                client.sendMessage(from, util.format(e), MessageType.extendedText, {
	                    quoted: mek
	                })
	            }
            }
			if (isGroup && !isCmd && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						reply(ind.cmdnf(prefix, command))
					} else {
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
