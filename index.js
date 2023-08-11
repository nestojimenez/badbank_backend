let express = require("express");
let app = express();
let cors = require("cors");
let dal = require("./dal.js");

//app.use(cors);
//Implement this to allow swagger to receive data from APIs
app.use( (request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  res.send("Hi to my page");
});

//create user account
app.get("/account/create/:name/:email/:password", (req, res) => {
  dal
    .create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      //console.log('My user', JSON.stringify(user));
      res.send(user);
    });
});

//all accounts
app.get("/all", (req, res) => {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

//login
app.get("/account/create/:email/:password", (req, res) => {
  //ToDO Login
  /*dal
    .login( req.params.email, req.params.password)
    .then((user) => {
      //console.log('My user', JSON.stringify(user));
      //res.send(user);
    });*/
});

//getByEmail
app.get("/account/getByEmail/:email", (req, res) => {
  dal.getByEmail(req.params.email).then((user) => {
    console.log("My user", JSON.stringify(user));
    res.send(user);
  });
});

//update balance
app.get("/account/updateBalance/:email/:balance", (req, res) => {
  dal
    .updateBalanceByEmail(req.params.email, req.params.balance)
    .then((user) => {
      console.log("My user", JSON.stringify(user));
      res.send(user);
    });
});

//add transaction
app.get("/account/transaction/:name/:email/:amount/:type", (req, res) => {
  dal
    .createTransaction(
      req.params.name,
      req.params.email,
      req.params.amount,
      req.params.type
    )
    .then((user) => {
      //console.log('My user', JSON.stringify(user));
      //res.send(user);
    });
});

//transactions by email
app.get("/account/transByEmail/:email", (req, res) => {
  dal.allTransactions(req.params.email).then((user) => {
    console.log("My user", JSON.stringify(user));
    res.send(user);
  });
});

//updates balance on transactions.
app.get("/account/makeTransfer/:email/:amount", (req, res) => {
  dal.makeTransfer(req.params.email, req.params.amount).then((user) => {
    console.log("My transfer", JSON.stringify(user));
    res.send(user);
  });
});

let port = 8000;
app.listen(port);
console.log("Running on port: " + port);
