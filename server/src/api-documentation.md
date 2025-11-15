# 📘 Food Banks API Documentation

Base URL: `http://localhost:3001`

## Overview

| Resource     | Method | Endpoint                    | Description                                  |
| ------------ | ------ | --------------------------- | -------------------------------------------- |
| `food_banks` | GET    | /get-all-food-banks         | Retrieves all food banks.                    |
| `food_banks` | GET    | /get-newest-food-bank/      | Retrieves most recently added food bank.     |
| `food_banks` | GET    | /add-one-food-bank          | Adds one food bank.                          |
| `items`      | GET    | /get-all-pantry-items       | Retrieves all pantry items.                  |
| `items`      | POST   | /get-pantry-items/:category | Retrieves all pantry items who fit category. |
| `items`      | POST   | /add-one-pantry-item        | Adds a new pantry item to the database.      |
| `items`      | POST   | /remove-one-pantry-item     | Removes a pantry item from the database.     |

---

## Database Schema

The `food_banks` SQL table was created with the following structure:

```sql
CREATE TABLE food_banks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  hours VARCHAR(15) NOT NULL,
  website VARCHAR(255) NOT NULL,
  bio VARCHAR(500)
);
```

The table was seeded with sample data:

```sql
INSERT INTO food_banks (name, address, phone,  hours, website, bio)
VALUES
  ('Food Bank 1', '123 First St', '1234567890', 'Tuesday 9-5', 'foodbank.com', 'Largest food bank in fake city'),
  ('Food Bank 2', '456 Second St', '1239876543', 'Saturday 7-4', 'foodbank2.com', 'Food bank bio');
```

The `items` SQL table was created with the following structure:

```sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  food_bank_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL UNIQUE,
  isproduce BOOLEAN SET DEFAULT FALSE,
  isperishable BOOLEAN SET DEFAULT FALSE,
  isvegetarian BOOLEAN SET DEFAULT FALSE,
  isvegan BOOLEAN SET DEFAULT FALSE,
  isketo BOOLEAN SET DEFAULT FALSE,
  isglutenfree BOOLEAN SET DEFAULT FALSE,
  ishalal BOOLEAN SET DEFAULT FALSE,
  iskosher BOOLEAN SET DEFAULT FALSE,
  isbabyfood BOOLEAN SET DEFAULT FALSE
);
```

The table was seeded with sample data:

```sql
INSERT INTO items (food_bank_id, name, isproduce, isperishable, isvegetarian, isvegan, isketo, isglutenfree, ishalal, iskosher, isbabyfood)
VALUES
  (1, 'apple', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE),
  (2, 'spinach', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE);
```

---

## Food Banks

### 🔹 GET `/get-all-food-banks`

**Description:** Retrieves all food banks stored in the database.

**Example Request URL:**
`GET http://localhost:3001/get-all-food-banks`

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "Food Bank 1",
    "address": "123 First St",
    "phone": "1234567890",
    "hours": "Tuesday 9-5",
    "website": "foodbank.com",
    "bio": "Largest food bank in fake city"
  },
  {
    "id": 2,
    "name": "Food Bank 2",
    "address": "456 Second St",
    "phone": "1239876543",
    "hours": "Saturday 7-4",
    "website": "foodbank2.com",
    "bio": "Food bank bio"
  }
]
```

---

### 🔹 GET `/get-newest-food-bank`

**Description:** Retrieves the most recently added food bank.

**Example Request URL:**
`GET http://localhost:3001/get-newest-food-bank`

**Example Response:**

```json
{
  "id": 2,
  "name": "Food Bank 2",
  "address": "456 Second St",
  "phone": "1239876543",
  "hours": "Saturday 7-4",
  "website": "foodbank2.com",
  "bio": "Food bank bio"
}
```

---

### 🔹 POST `/add-one-food-bank`

**Description:** Adds a new food bank to the database.

**Example Request URL:**
`POST http://localhost:3001/add-one-food-bank`

**Example Request Body:**

````json
{
  "name": "Tiger",
  "name": "Food Bank 3",
  "address": "789 Food Bank Road",
  "phone": "1239990000",
  "hours": "Saturday 9-5",
  "website": "foodbankthree.com",
  "bio": "Hello, world!"
}

---

## Pantry Items

### 🔹 GET `/get-all-pantry-items`

**Description:** Retrieves all pantry items stored in the database.

**Example Request URL:**
`GET http://localhost:3001/get-all-pantry-items`

**Example Response:**

```json
[
    {
        "id": 1,
        "food_bank_id": "1",
        "name": "apple",
        "isproduce": true,
        "isperishable": true,
        "isvegetarian": true,
        "isvegan": true,
        "isketo": true,
        "isglutenfree": true,
        "ishalal": true,
        "iskosher": true,
        "isbabyfood": false
    },
    {
        "id": 2,
        "food_bank_id": "2",
        "name": "spinach",
        "isproduce": true,
        "isperishable": true,
        "isvegetarian": true,
        "isvegan": true,
        "isketo": true,
        "isglutenfree": true,
        "ishalal": true,
        "iskosher": true,
        "isbabyfood": false
    }]
```

### 🔹 GET `/get-pantry-items-by/:category`

**Description:** Retrieves all pantry items that fit into the category.

**Example Request URL:**
`GET http://localhost:3001/get-pantry-items-by/:category`

**Example Response:**

```json
[
    {
        "id": 1,
        "food_bank_id": "1",
        "name": "apple",
        "isproduce": true,
        "isperishable": true,
        "isvegetarian": true,
        "isvegan": true,
        "isketo": true,
        "isglutenfree": true,
        "ishalal": true,
        "iskosher": true,
        "isbabyfood": false
    },
    {
        "id": 2,
        "food_bank_id": "2",
        "name": "spinach",
        "isproduce": true,
        "isperishable": true,
        "isvegetarian": true,
        "isvegan": true,
        "isketo": true,
        "isglutenfree": true,
        "ishalal": true,
        "iskosher": true,
        "isbabyfood": false
    }
]

````

### 🔹 POST `/add-one-pantry-item`

**Description:** Adds a new pantry item to the database.

**Example Request URL:**
`POST http://localhost:3001/add-one-pantry-item`

**Example Request Body:**

```json
{
  "food_bank_id": "2",
  "name": "baby formula",
  "isproduce": false,
  "isperishable": false,
  "isvegetarian": false,
  "isvegan": false,
  "isketo": false,
  "isglutenfree": false,
  "ishalal": false,
  "iskosher": false,
  "isbabyfood": true
}
```

**Example Response:**

```
Success! Pantry item was added.
```

---

### 🔹 POST `/remove-one-pantry-item/:id`

**Description:** Deletes one pantry item by its id number.

**Example Request URL:**
`POST http://localhost:3001/remove-one-pantry-item/:id`

**Example Response:**

```

{
    "id": 5,
    "food_bank_id": "2",
    "name": "canned corn",
    "isproduce": true,
    "isperishable": false,
    "isvegetarian": true,
    "isvegan": true,
    "isketo": true,
    "isglutenfree": true,
    "ishalal": true,
    "iskosher": true,
    "isbabyfood": false
}

```
