/*!-======[ Module Imports ]======-!*/
const axios = "axios".import()
const fs = "fs".import()

/*!-======[ Functions Imports ]======-!*/
const { gpt } = await (fol[2] + "gpt3.js").r()
const { GeminiImage } = await (fol[2] + "gemini.js").r()
const { tmpFiles } = await (fol[0] + 'tmpfiles.js').r()

/*!-======[ Default Export Function ]======-!*/
export default async function on({ Exp, ev, store, cht, ai, is }) {
    let infos = Data.infos
    let { sender, id } = cht
    const { func } = Exp
    ev.on({ 
        cmd: ['bell', 'autoai', 'aichat', 'ai_interactive'],
        tag: "ai",
        listmenu: ["autoai"]
    }, async () => {
        function sendAiInfo(){
          Exp.sendMessage(id, {
            text: infos.ai.bell,
            contextInfo: { 
                externalAdReply: {
                    title: cht.pushName,
                    body: "Artificial Intelligence, The beginning of the robot era",
                    thumbnailUrl: "https://telegra.ph/file/e072d1b7d5fe75221a36c.jpg",
                    sourceUrl: "https://github.com/Rifza123",
                    mediaUrl: `http://ẉa.me/6283110928302/9992828`,
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    mediaType: 1,
                }
            }
          }, { quoted: cht })
        }
        if(!cht.q) return sendAiInfo()
        Data.preferences[id] = Data.preferences[id] || {}
        let q = cht.q
        let set = {
            "on": {
                "done": infos.ai.interactiveOn,
                "value": true
            },
            "off": {
                "done": infos.ai.interactiveOff,
                "value": false
            },
            "on-group": {
                "done": infos.ai.interactiveOnGroup,
                "owner": true,
                "for": from.group,
                "value": true
            },
            "on-private": {
                "done": infos.ai.interactiveOnPrivate,
                "owner": true,
                "for": from.sender,
                "value": true
            },
            "off-group": {
                "done": infos.ai.interactiveOffGroup,
                "owner": true,
                "for": from.group,
                "value": false
            },
            "off-private": {
                "done": infos.ai.interactiveOffPrivate,
                "owner": true,
                "for": from.sender,
                "value": false
            },
            "on-all": {
                "done": infos.ai.interactiveOnAll,
                "owner": true,
                "for": "all",
                "value": true
            },
            "off-all": {
                "done": infos.ai.interactiveOffAll,
                "owner": true,
                "for": "all",
                "value": false
            },
            "on-energy": {
                "done": infos.ai.interactiveOnEnergy,
                "owner": true,
                "type": "energy",
                "value": true
            },
            "off-energy": {
                "done": infos.ai.interactiveOffEnergy,
                "owner": true,
                "type": "energy",
                "value": false
            }
        }[q]

        let alls = Object.keys(Data.preferences)
        if (!set) return sendAiInfo()
        if (set.owner && !is.owner) return cht.reply(infos.messages.isOwner)
        if (id.endsWith(from.group) && !(is.groupAdmins || is.owner)) return cht.reply(infos.messages.isAdmin)

        if (set.for) {
            let $config = set.for === from.group ? "group" :
                set.for === from.sender ? "private" :
                "all"
            if ($config === "all") {
                cfg.ai_interactive.group = set.value
                cfg.ai_interactive.private = set.value
            } else {
                cfg.ai_interactive[$config] = set.value
            }
            alls = set.for === from.group ? alls.filter(a => a.endsWith(from.group)) :
                set.for === from.sender ? alls.filter(a => a.endsWith(from.sender)) :
                alls
            for (let i of alls) {
                Data.preferences[i].ai_interactive = set.value
            }
        } else if(set.type == "energy"){
            cfg.ai_interactive.energy = set.value
        } else {
            Data.preferences[id].ai_interactive = set.value
        }
        
        cht.reply(set.done)
    })
    
	ev.on({ 
        cmd: ['resetaichat','clearsesichat'],
        tag: "ai",
        listmenu: ["resetaichat"]
    }, async() => {
        let ai = await fetch(`${api.xterm.url}/api/chat/logic-bell/reset?id=${cht.sender}&key=${api.xterm.key}`)
        .then(response => response.json())
        cht.reply(ai.msg)
	})
        }