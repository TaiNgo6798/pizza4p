const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
var cors = require("cors");

// Instantiating the express app
const app = express();

app.use(cors({ origin: true, credentials: true }));

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const TOKEN =
  "78296248978335a6cbf24c4915a08a5a6905df73c3824d3b38c23f8d721a351a27c74b3418354bf3f02b527e53dbb22c63bf2a541196de4412f65a02d5fcbe9d";
// INstantiating the express-jwt middleware

const jwtMW = exjwt({
  secret: TOKEN,
  algorithms: ["HS256"],
});

// MOCKING DB just for test
let users = [
  {
    id: 1,
    username: "test@gmail.com",
    password: "test123",
    name: "TaiNgo",
  },
];

// LOGIN ROUTE
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Use your DB ORM logic here to find user and compare password
  let foundUser = users.find(
    (user) => user.password == password && user.username == username
  );
  if (foundUser) {
    //If all credentials are correct do this
    let token = jwt.sign(
      { id: foundUser.id, username: foundUser.username, name: foundUser.name },
      TOKEN,
      {
        expiresIn: 129600,
      }
    ); // Sigining the token
    res.json({
      success: true,
      token,
      user: foundUser,
    });
  } else {
    res.status(401).json({
      success: false,
      token: null,
      err: "Username or password is incorrect",
    });
  }
});

// REGISTER ROUTE
app.post("/register", (req, res) => {
  const { username, password, name } = req.body;
  users.push({ username, password, name, id: Date.now() });
  res.status(200).json({
    success: true,
    users,
  });
});

app.get("/", jwtMW /* Using the express jwt MW here */, (req, res) => {
  res.json({
    success: true,
    message: "You are authenticated",
    user: users.find((user) => user.id == req.user.id),
  }); //Sending some response when authenticated
});

// USER ENDPOINTS
app.get(
  "/users",
  jwtMW /* Using the express jwt MW here */,
  async (req, res) => {
    try {
      let users = await getUser();
      res.json({
        success: true,
        data: users,
      }); //Sending some response when authenticated
    } catch (e) {
      res.status(404).json({
        success: false,

        message: e.message,
      });
    }
  }
);

app.get(
  "/users/:id",
  jwtMW /* Using the express jwt MW here */,
  async (req, res) => {
    try {
      const user_id = req.params.id;
      let data = await getSingleUser(user_id);
      res.json({
        success: true,
        data,
      }); //Sending some response when authenticated
    } catch (e) {
      res.status(404).json({
        success: false,
        message: e.message,
      });
    }
  }
);

app.use(function (req, res, next) {
  // Invalid request
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// Starting the app on PORT 3000
const PORT = 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Magic happens on port ${PORT}`);
});
