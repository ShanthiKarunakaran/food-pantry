// Server/API for BE food pantry (Group 3)

// DB Fiddle Link: https://www.db-fiddle.com/f/23eGM2YefNA2gjujh9ACF2/14

// Boilerplate Code to Set Up Server

// importing Node Modules
import express from "express";
import pg from "pg"; // pg stands for PostgreSQL, for connecting to the database
import config from "./config.js"; // importing the connection string to our database hosted on Neon

//enable cors
import cors from "cors";


//connecting to our PostgreSQL database, or db for short
const db = new pg.Pool({
  // new pg.Pool() creates a connection to the database
  connectionString: config.databaseUrl, // credentials to access the database. Keep private!
  ssl: true, // use SSL encryption when connecting to the database to keep data safe
});

const app = express(); // create an instance of the Express module, which gives us access to all of Express's functions, methods, useful superpowers

app.use(cors());          // allow cross-origin requests (Netlify → Render)

app.use(express.json()); // This server will receive and respond to requests with JSON data

// Setting which port to listen or receive requests
//const port = 3001; 

//for Render to work(as Render assigns its own port)
const port = process.env.PORT || 3001;

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
async function addOneFoodBank(
  name,
  address,
  phone,
  hours,
  website,
  bio,
  city,
  state
) {
  await db.query(
    "INSERT INTO food_banks (name, address, phone, hours, website, bio, city, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [name, address, phone, hours, website, bio, city, state]
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
    `SELECT 
    food_banks.name,
    food_banks.address,
    food_banks.phone,
    food_banks.hours,
    food_banks.website,
    food_banks.bio,
    food_banks.city,
    food_banks.state
    FROM food_banks INNER JOIN items ON food_banks.id = items.food_bank_id WHERE items.${category} = TRUE`
  );
  return data.rows;
}

//added for presentation, needs to be edited later
//7. /get-all-food-banks-by-category/:category?city=&state=&name=
async function getAllFoodBanksByCategoryCityState(category, city, state, name) {
  let query = `
    SELECT DISTINCT
      food_banks.id,
      food_banks.name,
      food_banks.address,
      food_banks.phone,
      food_banks.hours,
      food_banks.website,
      food_banks.bio,
      food_banks.city,
      food_banks.state
    FROM food_banks
    INNER JOIN items
    ON food_banks.id = items.food_bank_id
    WHERE items.${category} = TRUE
  `;

  if (city) {
    query += ` AND food_banks.city ILIKE '%${city}%'`;
  }

  if (state) {
    query += ` AND food_banks.state ILIKE '%${state}%'`;
  }

  if (name) {
    query += ` AND food_banks.name ILIKE '%${name}%'`;
  }

  const data = await db.query(query);
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
  const { name, address, phone, hours, website, bio, city, state } = req.body;
  await addOneFoodBank(name, address, phone, hours, website, bio, city, state);
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

//7. /get-all-food-banks-by-category/:category?city=&state=&name=
app.get(
  "/get-all-food-banks-by-category-city-state/:category",
  async (req, res) => {
    let category = req.params.category;
    let city = req.query.city;
    let state = req.query.state;
    let name = req.query.name;

    const food = await getAllFoodBanksByCategoryCityState(
      category,
      city,
      state,
      name
    );
    res.json(food);
  }
);

// 8. POST /chat  (placeholder AI endpoint for the chat widget)
//import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

//const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/chat", async (request, response) => {
  try {
    const { userMessageText } = request.body;

    if (!userMessageText) {
      return response
        .status(400)
        .json({ error: "Missing userMessageText in request body" });
    }

    /*const aiReply = await groqClient.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant for a food pantry app. You help users understand dietary needs (gluten-free, vegan, halal, low-sugar, etc.) and give supportive wellness advice for people facing homelessness.",
        },
        {
          role: "user",
          content: userMessageText,
        },
      ],
    });*/

   /* const replyText =
      aiReply.choices?.[0]?.message?.content ||
      "I'm sorry, I couldn't generate a response.";*/

    const replyText =
      "Our AI helper isn’t configured on this server yet, but we received your message: " +
      userMessageText;

    return response.json({ replyText });
  } catch (error) {
    console.error("Error in /chat endpoint:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
});
