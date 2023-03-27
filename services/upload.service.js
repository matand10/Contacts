


// const aws = require('aws-sdk')
// const multer = require('multer')
// const multerS3 = require('multer-s3')

// const { S3_ENDPOINT, BUCKET_NAME, AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID } = process.env

// aws.config.update({
//     endpoint: S3_ENDPOINT,
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY
// })

// const s3 = new aws.S3()

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: BUCKET_NAME,
//         acl: 'public-read',
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname })
//         },
//         key: function (req, file, cb) {
//             console.log('file', file)
//             cb(null, file.originalname)
//         }
//     })
// }).single('upload')

// module.exports = {
//     upload,
//     s3
// }

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const { S3_ENDPOINT, BUCKET_NAME } = process.env
const spacesEndpoint = new aws.Endpoint(S3_ENDPOINT)
const s3 = new aws.S3({
    endpoint: spacesEndpoint
})

const ACL = 'public-read'

const upload = multer({
    storage: multerS3({
        s3,
        bucket: BUCKET_NAME,
        acl: ACL,
        metadata: (req, file, cb) => {
            cb(null, {
                fieldName: file.fieldname
            })
        },
        key: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
}).single('upload')

module.exports = {
    upload,
    s3,
}