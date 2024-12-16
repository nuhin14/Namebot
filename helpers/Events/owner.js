/*!-======[ Module Imports ]======-!*/
const fs = "fs".import()
const path = "path".import()
const { getContentType } = "baileys".import()

/*!-======[ Function Imports ]======-!*/
const { catbox } = await (fol[0] + 'catbox.js').r()

let Lists = {
  audio: Object.keys(Data.audio),
  fquoted: Object.keys(Data.fquoted)
}
/*!-======[ Default Export Function ]======-!*/
export default async function on({ cht, Exp, store, ev, is }) {

   let infos = Data.infos
   const { func } = Exp

   const { id } = cht
    const options = {
        public: 'mode public',
        autotyping: 'auto typing',
        autoreadsw: 'auto read sw',
        autoreadpc: 'auto read pc',
        autoreadgc: 'auto read group',
        premium_mode: 'premium mode',
        editmsg: 'edit message',
        similarCmd: 'similarity command'
    }

    function sendPremInfo({ _text, text }, cust=false, number){
        return Exp.sendMessage(number || id, {
            text:`${_text ? (_text + "\n\n" + text) : text}`,
                contextInfo: {
                    externalAdReply: {
                    title: !cust ? "🔐Premium Access!" : "🔓Unlocked Premium Access!",
                    body: !cust ? infos.owner.lockedPrem : "Sekarang kamu adalah user 🔑Premium, dapat menggunakan fitur² terkunci!",
                    thumbnailUrl: !cust ? 'https://telegra.ph/file/310c10300252b80e12305.jpg' : 'https://telegra.ph/file/ae815f35da7c5a2e38712.jpg',
                    mediaUrl: `http://ẉa.me/6283110928302/${!cust ? "89e838":"jeie337"}`,
                    sourceUrl: `https://wa.me/${owner[0].split("@")[0]}?text=Hello,+I+have+buy+🔑Premium`,
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    mediaType: 1,
                },
                mentionedJid:cht.mention
            }
        }, { quoted: cht })
    }
    
    ev.on({ 
        cmd: ['set'], 
        listmenu: ['set'],
        tag: "owner",
        isOwner: true,
        args: infos.owner.set
    }, async () => {
        let fquotedKeys = Object.keys(Data.fquoted)
        let [t1, t2, t3] = cht.q.split(" ")
        if(!options[t1] && t1.includes("\n")){
          t1 = t1.split("\n")[0]
        }

        const mode = options[t1] || (t1 == "fquoted" 
           ? `Success ${fquotedKeys.includes(t2) ? "change" : "add"} fake quoted ${t2}\n\nList fake quoted:\n\n- ${!fquotedKeys.includes(t2) ? [...fquotedKeys, t2].join("\n- ") : fquotedKeys.join("\n- ")}`
           : t1 == "welcome"
           ? `Successfully set welcome with type ${t2}`
           : t1 == "voice"
           ? infos.owner.successSetVoice
           : t1 == "logic"
           ? infos.owner.successSetLogic
           : t1 == "menu"
           ? infos.owner.successSetMenu
           : t1 == "lang" 
           ? true
           : t1 == "call"
           ? infos.owner.setCall
           : false)

        if (!mode) return cht.reply(infos.owner.set)
        
        if(t1 == "fquoted"){
          if(!t2) return cht.reply(infos.owner.setFquoted)
          let json;
            if(t3) {
              json = cht.q.split(" ").slice(2).join("")
            } else if(is.quoted) {
              let { key } = await store.loadMessage(cht.id, cht.quoted.stanzaId); 
              let msg = { key }
              let qmsg = cht.message.extendedTextMessage.contextInfo.quotedMessage
              let type = getContentType(qmsg)
                if(type.includes("pollCreationMessage")){
                  msg.message = { pollCreationMessage: qmsg.pollCreationMessage || qmsg.pollCreationMessageV2 || qmsg.pollCreationMessageV3 }
                } else {
                  msg.message = qmsg
                }
              json = JSON.stringify(msg)
            }
            try {
              let obj = JSON.parse(json)
              Data.fquoted[t2] = obj
              cht.reply(mode)
            } catch (e) {
              cht.replyWithTag(infos.owner.checkJson, { e, rm: infos.others.readMore })
            }
        } else if(t1 == "welcome"){
          let list = ["linkpreview","order","product","image","text"]
          let tlist = `\`List type welcome yang tersedia:\`\n\n- ${list.join("\n- ")}`
          if(!t2) return cht.reply(tlist)
          if(!list.includes(t2)) return cht.reply(`*Type welcome _${t2}_ notfound!*\n\n${tlist}`)
          global.cfg.welcome = t2
          cht.reply(mode)
        } else if(t1 == "logic"){
          if(!t2) return cht.replyWithTag(infos.owner.setLogic, { logic: cfg.logic, botnickname, botfullname, cmd: cht.prefix + cht.cmd })
          let fullname = func.findValue("fullainame", cht.q)
          let nickname = func.findValue("nickainame", cht.q)
          let profile = func.findValue("profile", cht.q)||func.findValue("logic", cht.q)
          if(!profile || !nickname || !fullname) return cht.replyWithTag(infos.owner.setLogic, { logic: cfg.logic, botnickname, botfullname, cmd: cht.prefix + cht.cmd })
          global.botfullname = fullname
          global.botnickname = nickname
          global.cfg.logic = profile
          cht.replyWithTag(mode, { logic: cfg.logic })
        } else if(t1 == "menu"){
          let list = ["linkpreview","order","liveLocation","image","text"]
          let tlist = func.tagReplacer(infos.owner.listSetmenu, { list:list.join("\n- ") })
          if(!t2) return cht.reply(tlist)
          if(!list.includes(t2)) return cht.reply(`*Type menu _${t2}_ notfound!*\n\n${tlist}`)
          global.cfg.menu_type = t2
          cht.replyWithTag(mode, { menu:t2 })
          if(t2 == "liveLocation") cht.reply(infos.owner.menuLiveLocationInfo)
          
        } else if(t1 == "lang"){
          let langs = fs.readdirSync(fol[9])
          if(!langs.includes(t2)) return cht.reply(`\`List Language:\`\n\n- ${langs.join("\n- ")}\n\nExample:\n _${cht.prefix + cht.cmd} ${t1} ${langs[0]}_`)
          global.locale = t2
          const files = await fs.readdirSync(fol[9] + locale + "/").filter(file => file.endsWith('.js'));

          for (const file of files) {
            await (fol[9] + locale + "/" + file).r();
          }

          cht.replyWithTag(global.Data.infos.owner.succesSetLang, { lang: t2 })
        } else if(t1 == "voice"){
            let listv = "`LIST VOICES`\n- "+Data.voices.join("\n- ")
            if(!t2){
              func.archiveMemories.setItem(cht.sender, "questionCmd", { 
                emit: `${cht.cmd} ${t1}`,
                exp: Date.now() + 60000,
                accepts: Data.voices
              })
              return cht.reply(listv)
            }
            if(!Data.voices.includes(t2.trim())) return cht.reply("*[ VOICE NOTFOUND❗️ ]*\n\n`LIST VOICES`\n- "+Data.voices.join("\n- "))
            global.cfg.ai_voice = t2.trim()
            cht.replyWithTag(mode, { voice: global.cfg.ai_voice })
        } else if(t1 == "call"){
            if(!t2) return cht.reply(mode)
            cfg.call = cfg.call || { block: false, reject: false }
            let listaction = Object.keys(cfg.call)
            let actions = t2.split("+")
            let off = ["off","false"]
            let isOff = actions.find(a => off.includes(a))
            let notfound = actions.find(a => ![...off,...listaction].includes(a))
            if(notfound) return cht.reply(`Action \`${notfound}\` tidak ada dalam list!\n\n${mode}`)
            for(let i of listaction){
              global.cfg.call[i] = actions.includes(i)
            }
            cht.replyWithTag(infos.owner[isOff ? "successOffCall":"successSetCall"], { action: t2 })
        } else {
          if (t2 === "on" || t2 === "true") {
            if (global.cfg[t1]) return cht.replyWithTag(infos.owner.isModeOn, { mode })
            global.cfg[t1] = true
            return cht.replyWithTag(infos.owner.isModeOnSuccess, { mode })
          } else if (t2 === "off" || t2 === "false") {
            if (!global.cfg[t1]) return cht.replyWithTag(infos.owner.isModeOff, { mode })
            global.cfg[t1] = false
            return cht.replyWithTag(infos.owner.isModeOffSuccess, { mode })
          } else {
            await cht.reply("on/off ?")
            func.archiveMemories.setItem(cht.sender, "questionCmd", { 
                emit: `${cht.cmd} ${t1}`,
                exp: Date.now() + 60000,
                accepts: ["on","off","true","false"]
            })
          }
        }
    })
}
