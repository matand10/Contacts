const supportchatService = require("./supportChat.service")

//CREATE
async function create(req, res) {
    try {
        const { userId, message, isUserSender } = req.body
        const userChat = await supportchatService.getById(userId)
        let newMessage = null

        if (userChat) {
            newMessage = await supportchatService.addMessageToChat(userChat, message, isUserSender)
        } else {
            const newChatWithNewMessage = await supportchatService.createChat(userChat, message)
            newMessage = await supportchatService.addMessageToChat(newChatWithNewMessage.chatId, message, isUserSender)
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

// GET BY ID
async function getById(req, res) {
    try {
        const chatId = req.params.id;
        supportChat = await supportchatService.getById(chatId)
        res.status(200).json({ status: 'ok', content: supportChat })
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    query,
    create,
    addAdminMsg,
    getById,
};