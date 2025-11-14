// Server/API for BE food pantry (Group 3)

// DB Fiddle Link: https://www.db-fiddle.com/f/23eGM2YefNA2gjujh9ACF2/14

// Boilerplate Code to Set Up Server

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

/*----------------------------------
Helper Functions (Test them in postman)
----------------------------------*/

//-------------------------------------
//📊 Users (Food Banks)
//-------------------------------------

// 1. GET /get-newest-food-bank
async function getNewestFoodBank() {
  // db.query() lets us query the SQL database
  // It takes in one parameter: a SQL query!
  const data = await db.query(
    "SELECT * FROM food_banks ORDER BY user_id DESC LIMIT $1"
  );
  return data.rows; // we have to use dot notation to get value of the rows property from the data object
}

//2. GET /get-all-food-banks
async function getAllFoodBanks() {
  const data = await db.query("SELECT * FROM food_banks ORDER BY id ASC");
  return data.rows;
}

//3. POST /add-one-food-bank
async function addOneFoodBank(name, address, phone, hours, website, bio) {
  await db.query(
    "INSERT INTO animals (name, address, phone, hours, website, bio) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, address, phone, hours, website, bio]
  );
}

//-------------------------------------
//📊 Inventory ~
//-------------------------------------

//1. GET /get-all-pantry-items

//2. GET /get-pantry-items

//3. GET /get-pantry-items/:index

//4. POST /post-one-pantry-item

//5. POST /post-remove-one-pantry-item

//1. GET /get-pantry-item-by/:category
async function getPantryItemByCategory(category) {
  // Allowed category columns to prevent SQL injection
  // const allowedCategories = [
  //   "isproduce",
  //   "isperishable",
  //   "isvegetarian",
  //   "isvegan",
  //   "isketo",
  //   "isglutenfree",
  //   "ishalal",
  //   "iskosher",
  //   "isbabyfood",
  // ];
  console.log(category);
  console.log(`SELECT * FROM items WHERE ${category} = TRUE`);
  const data = await db.query(`SELECT * FROM items WHERE ${category} = TRUE`);
  return data.rows;
}

//-------------------------------------
//📊 Item COUNTS ~
//-------------------------------------

/*------------------------------------------------------
API Endpoints
--------------------------------------------------------*/

//-------------------------------------
//📊 USERS (Food Banks)
//-------------------------------------

// 1. GET /get-newest-food-bank
app.get("/get-newest-food-bank", async (req, res) => {
  const newestFoodBank = await getNewestFoodBank();
  res.json(newestFoodBank);
});

//2. GET /get-all-food-banks
app.get("/get-all-food-banks", async (req, res) => {
  const allFoodBanks = await getAllFoodBanks();
  res.json(allFoodBanks);
});

//3. POST /add-one-food-bank
app.post("/add-one-food-bank", async (req, res) => {
  const { name, address, phone, hours, website, bio } = req.body;
  await addOneFoodBank(name, address, phone, hours, website, bio);
  res.send(`Success! A Food Bank was added.`);
});

///-------------------------------------
//📊 Inventory ~
//-------------------------------------

// 1. GET /get-pantry-items-by/:category
app.get("/get-pantry-items-by/:category", async (req, res) => {
  let category = req.params.category;
  const food = await getPantryItemByCategory(category);
  res.json(food);
});
//1. GET /get-all-pantry-items

//2. GET /get-pantry-items

//3. GET /get-pantry-items

//4. POST /post-one-pantry-item

//5. POST /post-remove-one-pantry-item

//-------------------------------------
//📊 Item COUNTS ~
//-------------------------------------
