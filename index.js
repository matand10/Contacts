const express = require("express");
const app = express();
// const mongodb = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

// const MongoClient = mongodb.MongoClient

// const connectionParams = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   tls: true,
// }

// mongoose
//   .connect(process.env.MONGO_URL, connectionParams)
//   .then(() => console.log("DB Connection Successfull!"))
//   .catch((err) => console.log(err));

// async function connectToDatabase() {
//   const client = MongoClient.connect(process.env.MONGO_URL, connectionParams)
//   const db = client.db('qleads')
//   return db
// }
// connectToDatabase()
// let client = new MongoClient(process.env.MONGO_URL, connectionParams)
// client.connect().then((client) => {
//   db = client.db("Test")
//   db.collection("test").insertOne({ message: "Hello from DigitalOcean" }).then(() => {
//     process.exit()
//   })
// })

app.use(cors());
app.use(express.json());
// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
// app.use("/api/carts", cartRoute);
// app.use("/api/orders", orderRoute);
// app.use("/api/checkout", stripeRoute);




app.use(express.static('public'));
// app.get('/**', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// });

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log("Backend server is running on port: ", port);
});
