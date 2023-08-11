//MyMonogoDB_AWS 3.140.242.4:27017 [direct]

const { MongoClient } = require("mongodb");
const url = "mongodb://3.140.242.4:27017";

const client = new MongoClient(url);

const dbName = "BadBank";

//connect to mongodb
async function run() {
  try {
    client.connect();
    console.log("Connected to MongoDB!");
  } catch (e) {
    console.log(e.stack);
  }
}

//crate user account
const create = async (name, email, password) => {
  try {
    const db = client.db(dbName);

    const col = db.collection("Users");

    //new user

    let userDocument = {
      name: name,
      email: email,
      pasword: password,
      balance: 100,
    };

    // Insert a single document, wait for promise so we can read it back
    const p = await col.insertOne(userDocument);
    // Find one document
    const myDoc = await col.find().toArray();
    // Print to the console
    console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  }
};

//get all Users
const all = async () => {
  try {
    const db = client.db(dbName);
    const col = db.collection("Users");
    const myDoc = await col.find().toArray();
    return myDoc;
  } catch (err) {
    console.log(err.stack);
  }
};

//get user by email
const getByEmail = async (email) => {
  try {
    const db = client.db(dbName);
    const col = db.collection("Users");
    const myDoc = await col.findOne({ email: email });
    return myDoc;
  } catch (err) {
    console.log(err.stack);
  }
};

//update balance by user email
const updateBalanceByEmail = async (email, balance) => {
  try {
    const db = client.db(dbName);
    const col = db.collection("Users");
    const myDoc = await col.updateOne(
      { email: email },
      { $set: { balance: balance } }
    );
    return myDoc;
  } catch (err) {
    console.log(err.stack);
  }
};

//crate transaction
const createTransaction = async (name, email, amount, type) => {
  try {
    const db = client.db(dbName);

    const col = db.collection("Transactions");

    //new transaction

    let userDocument = {
      name: name,
      email: email,
      amount: amount,
      type: type,
    };

    // Insert a single document, wait for promise so we can read it back
    const p = await col.insertOne(userDocument);
    // Find one document
    const myDoc = await col.find().toArray();
    // Print to the console
    console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  }
};

//get all transactions by email
const allTransactions = async (email) => {
  try {
    const db = client.db(dbName);
    const col = db.collection("Transactions");
    const myDoc = await col.find({email:email}).toArray();
    return myDoc;
  } catch (err) {
    console.log(err.stack);
  }
};

//make transfers
const makeTransfer = async (email, amount) => {
  try {
    const db = client.db(dbName);
    const col = db.collection("Users");
    const myDoc = await col.updateOne(
      { email: email },
      { $set: { balance: amount } }
    );
    return myDoc;
  } catch (err) {
    console.log(err.stack);
  }
};

run().catch(console.dir);

module.exports = { create, all, getByEmail, updateBalanceByEmail, createTransaction, allTransactions, makeTransfer };
