const supportchatService = require("./supportChat.service")

//CREATE
async function create(req, res) {
    try {
        const { userId, text, isUserSender } = req.body
        const userChat = await supportchatService.getById(userId)
        let newMessage = null

        if (userChat) {
            newMessage = await supportchatService.addMessageToChat(userChat, text, isUserSender)
        } else {
            const newChatWithNewMessage = await supportchatService.createChat(userChat, text)
            newMessage = await supportchatService.addMessageToChat(newChatWithNewMessage.chatId, text, isUserSender)
        }

        res.status(200).json({ status: 'ok', content: newMessage });
    } catch (err) {
        res.status(500).json(err);
    }
}

async function addAdminMsg(req, res) {
    try {
        const { recieverId, currentUserId, text } = req.body
        const newMessage = await supportchatService.addAdminMessageToChat(recieverId, currentUserId, text)
        console.log('newMessage', newMessage)
        res.status(200).json({ status: 'ok', content: newMessage });
    } catch (err) {
        res.status(500).json(err);
    }
}

// // //UPDATE
// async function update(req, res) {
//     try {
//         const { jobTitle } = JSON.parse(req.body.data)
//         await supportchatService.update(jobTitle)
//         res.status(200).json({ status: 'ok' });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

// // DELETE
// async function remove(req, res) {
//     try {
//         const { id } = JSON.parse(req.body.data)
//         await supportchatService.remove(id)
//         res.status(200).json({ status: 'ok' });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

// GET ALL
async function query(req, res) {
    try {
        const chatId = req.query.params;
        let supportChat = null
        if (chatId) {
            supportChat = await supportchatService.getById(chatId)
        } else {
            supportChat = await supportchatService.get(chatId)
        }
        res.status(200).json({ status: 'ok', content: supportChat })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

module.exports = {
    query,
    create,
    addAdminMsg,
    // remove,
    // update
};