const express = require("express");
const http = require('http')
const https = require('https')
const fs = require('fs')
const app = express();
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
app.use(cookieParser());


dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const contactRoute = require("./routes/contact");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const productRoute = require("./routes/product");
const uploadRoute = require('./routes/uploadFile')
const categoryRoute = require("./routes/category")
const jobTitleRoute = require("./routes/jobTitle")
const companyRoute = require("./routes/company")
const territoryRoute = require("./routes/territory")
const creditRoute = require("./routes/credit")
const creditTransactionRoute = require("./routes/creditTransaction")
const contactTransactionRoute = require("./routes/contactTransaction")
const contactRequestRoute = require("./routes/contactRequest")
const cors = require("cors");
const path = require("path");



const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000', 'https://164.92.245.54:80', 'https://qleads.info:80', 'https://qleads.info', 'http://qleads.info', 'http://qleads.info:80'],
    credentials: true
}
app.use(cors(corsOptions))

const options = {
    key: fs.readFileSync(path.join(__dirname, 'certificates', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certificates', 'cert.pem'))
}

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/contacts", contactRoute);
app.use("/api/product", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", stripeRoute);
app.use('/api/file', uploadRoute)
app.use("/api/categories", categoryRoute);
app.use("/api/jobTitle", jobTitleRoute)
app.use("/api/company", companyRoute)
app.use("/api/territory", territoryRoute)
app.use("/api/credit", creditRoute)
app.use("/api/credit/transaction", creditTransactionRoute)
app.use("/api/contact/transaction", contactTransactionRoute)
app.use("/api/contact/request", contactRequestRoute)
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = process.env.PORT || 80
let sslServer = https.createServer(options, app)
// if (process.env.NODE_ENV === 'production') {
//     // Code for production
//     sslServer = https.createServer(options, app)
// } else {
//     // Code for development
//     sslServer = http.createServer(app)
// }
sslServer.listen(port, () => console.log('Listening on port ' + port))
