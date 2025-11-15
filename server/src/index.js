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

//1. GET /get-all-food-banks
async function getAllFoodBanks() {
  const data = await db.query("SELECT * FROM food_banks ORDER BY id ASC");
  return data.rows;
}

// 2. GET /get-newest-food-bank
async function getNewestFoodBank() {
  // db.query() lets us query the SQL database
  // It takes in one parameter: a SQL query!
  const data = await db.query(
    "SELECT * FROM food_banks ORDER BY id DESC LIMIT 1"
  );
  return data.rows; // we have to use dot notation to get value of the rows property from the data object
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
async function getAllPantryItems() {
  const data = await db.query("SELECT * FROM items ORDER BY id ASC");
  return data.rows;
}

//2. GET /get-pantry-items-by/:category
async function getPantryItemByCategory(category) {
  const data = await db.query(`SELECT * FROM items WHERE ${category} = TRUE`);
  return data.rows;
}

// Possible idea for error handling
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

//3. POST /add-one-pantry-item
async function addOnePantryItem(
  food_bank_id,
  name,
  isproduce,
  isperishable,
  isvegetarian,
  isvegan,
  isketo,
  isglutenfree,
  ishalal,
  iskosher,
  isbabyfood
) {
  await db.query(
    "INSERT INTO items (food_bank_id, name, isproduce, isperishable, isvegetarian, isvegan, isketo,isglutenfree, ishalal, iskosher, isbabyfood) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
    [
      food_bank_id,
      name,
      isproduce,
      isperishable,
      isvegetarian,
      isvegan,
      isketo,
      isglutenfree,
      ishalal,
      iskosher,
      isbabyfood,
    ]
  );
}

//4. POST /remove-one-pantry-item/:id
async function removeOnePantryItem(id) {
  const removedItem = await db.query(
    "DELETE FROM items WHERE id = $1 RETURNING *",
    [id]
  );
  return removedItem.rows[0];
}

//5. GET /get-all-food-banks-by-category/:category
async function getAllFoodBanksByCategory(category) {
  const data = await db.query(
    `SELECT * FROM food_banks LEFT JOIN items ON food_banks.id = items.food_bank_id WHERE items.${category} = TRUE`
  );
  return data.rows;
}

/*------------------------------------------------------
API Endpoints
--------------------------------------------------------*/

//-------------------------------------
//📊 USERS (Food Banks)
//-------------------------------------

//1. GET /get-all-food-banks
app.get("/get-all-food-banks", async (req, res) => {
  const allFoodBanks = await getAllFoodBanks();
  res.json(allFoodBanks);
});

//2. GET /get-newest-food-bank
app.get("/get-newest-food-bank", async (req, res) => {
  const newestFoodBank = await getNewestFoodBank();
  res.json(newestFoodBank);
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

// 1. GET /get-all-pantry-items
app.get("/get-all-pantry-items", async (req, res) => {
  const pantryItems = await getAllPantryItems();
  res.json(pantryItems);
});

// 2. GET /get-pantry-items-by/:category
app.get("/get-pantry-items-by/:category", async (req, res) => {
  let category = req.params.category;
  const food = await getPantryItemByCategory(category);
  res.json(food);
});

//3. POST /add-one-pantry-item
app.post("/add-one-pantry-item", async (req, res) => {
  const {
    food_bank_id,
    name,
    isproduce,
    isperishable,
    isvegetarian,
    isvegan,
    isketo,
    isglutenfree,
    ishalal,
    iskosher,
    isbabyfood,
  } = req.body;

  await addOnePantryItem(
    food_bank_id,
    name,
    isproduce,
    isperishable,
    isvegetarian,
    isvegan,
    isketo,
    isglutenfree,
    ishalal,
    iskosher,
    isbabyfood
  );

  res.send(`Success! Pantry item was added.`);
});

//5. POST /remove-one-pantry-item/:id
app.post("/remove-one-pantry-item/:id", async (req, res) => {
  const id = req.params.id;
  const removedItem = await removeOnePantryItem(id);

  res.json(removedItem);
});

//6. GET /get-all-food-banks-by-category/:category
app.get("/get-all-food-banks-by-category/:category", async (req, res) => {
  console.log(req.params.category);
  let category = req.params.category;
  const food = await getAllFoodBanksByCategory(category);
  res.json(food);
});
