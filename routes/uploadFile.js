// const router = require("express").Router();
// const { upload } = require('../services/upload.service')
// const Image = require("../models/Image");

// router.post("/upload", upload, async (req, res) => {
//     try {
//         const content = { url: req.file.location }
//         const newImage = new Image(content)
//         res.status(200).send({ status: 'ok', content: newImage })
//     } catch (err) {
//         res.status(500).send({ err: 'Failed to upload files' })
//     }
// })

// router.get("/get", async (req, res) => {
//     try {
//         const images = await Image.find()
//         res.status(200).send({ status: 'ok' })
//     } catch (err) {
//         res.status(500).send({ err: 'Failed to upload files' })
//     }
// })

// module.exports = router;