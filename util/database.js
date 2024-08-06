// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "Butter", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://butter:food@cluster0.x7ufutg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected to MongoDB!");
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
