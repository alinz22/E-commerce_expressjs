const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware to set req.user
app.use((req, res, next) => {
  User.findById("66b2bb51329c68500320c6f8") // Provide a valid user ID
    .then((user) => {
      if (user) {
        req.user = user;
      }
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://butter:food@cluster0.x7ufutg.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    return User.findOne();
  })
  .then((user) => {
    if (!user) {
      const user = new User({
        name: "John Doe",
        email: "john@example.com",
        cart: { items: [] },
      });
      return user.save();
    }
    return user;
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log(err));
