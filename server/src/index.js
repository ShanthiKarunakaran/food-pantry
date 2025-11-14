/* --------------------------------
Server/API for BE food pantry (Group 3)

DB Fiddle Link: https://www.db-fiddle.com/f/23eGM2YefNA2gjujh9ACF2/12
----------------------------------*/

/*----------------------------------
Boilerplate Code to Set Up Server


// importing Node Modules
import express from "express";
import pg from "pg"; // pg stands for PostgreSQL, for connecting to the database
import config from "./config.js"; // importing the connection string to our database hosted on Neon

//connecting to our PostgreSQL database, or db for short
const db = new pg.Pool({
  // new pg.Pool() creates a connection to the database
  connectionString: config.databaseUrl, // credentials to access the database. Keep private!
  ssl: true, // use SSL encryption when connecting to the database to keep data safe
});

const app = express(); // create an instance of the Express module, which gives us access to all of Express's functions, methods, useful superpowers

app.use(express.json()); // This server will receive and respond to requests with JSON data

const port = 3001; // Setting which port to listen or receive requests

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
----------------------------------*/
/*----------------------------------
Helper Functions (Test them in postman)
----------------------------------*/

//-------------------------------------
//📊 Users (Food Banks)
//-------------------------------------

// 1. GET /get-newest-user
async function getNewestUser() {
  // db.query() lets us query the SQL database
  // It takes in one parameter: a SQL query!
  const data = await db.query(
    "SELECT * FROM users ORDER BY user_id DESC LIMIT $1"
  );
  return data.rows; // we have to use dot notation to get value of the rows property from the data object
}

//2. GET /get-all-users

//-------------------------------------
//📊 Inventory ~
//-------------------------------------

//3. GET /get-food-by/:category
//we'll have to define what category means (which is column names)
//send a SQL query check (either or only)

//4 is a stech goal: (you'll haev to pass through a request body)
//4. GET /get-food-by/category
//seperate aprameter by sepereate dynamic parameters

//3. POST /add-one-user
async function addOneUser(name, company_name, email, address, bio) {
  await db.query(
    "INSERT INTO users (name, category, can_fly, lives_in) VALUES ($1, $2, $3, $4)",
    [name, country_name, email, bio]
  );
}

//1. GET /get-all-pantry-items

//2. GET /get-pantry-items

//3. GET /get-pantry-items/:index

//4. POST /post-one-pantry-item

//5. POST /post-remove-one-pantry-item

//6.

//-------------------------------------
//📊 Item COUNTS ~
//-------------------------------------

/*------------------------------------------------------
API Endpoints
--------------------------------------------------------*/

//-------------------------------------
//📊 USERS (Food Banks)
//-------------------------------------

// 1. GET /get-newest-user

app.get("/get-newest-user", async (req, res) => {
  const newestUser = await getNewestUser();
  res.json(newestUser);
});

//2. GET /get-all-users
app.get("/get-all-users", async (req, res) => {
  const allUsers = await getAllUsers();
  res.json(allUsers);
});

//3. POST /add-one-user
app.post("/add-one-user", async (req, res) => {
  const { name, country_name, email, bio } = req.body;
  await addOneUser(name, country_name, email, bio);
  res.send(`Success! A User was added.`);
});

///-------------------------------------
//📊 Inventory ~
//-------------------------------------

//1. GET /get-all-pantry-items

//2. GET /get-pantry-items

//3. GET /get-pantry-items

//4. POST /post-one-pantry-item

//5. POST /post-remove-one-pantry-item

//-------------------------------------
//📊 Item COUNTS ~
//-------------------------------------
