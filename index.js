const express = require("express");
// const http = require('http')
const https = require('https')
const fs = require('fs')
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const contactRoute = require("./routes/contact");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const path = require("path");

const options = {
  key: fs.readFileSync(path.join(__dirname, 'certificates', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certificates', 'cert.pem'))
}

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/contacts", contactRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.use(express.static('public'));

const port = process.env.PORT || 80
// const sslServer = http.createServer(app)
const sslServer = https.createServer(options, app)
sslServer.listen(port, () => console.log('Listening on port ' + port))
