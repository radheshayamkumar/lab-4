# Lab Manual 4: Creating RESTful APIs to Handle HTTP Requests

## Subject: MEAN Stack Web Development

### Lab Title: Creating RESTful APIs to Handle HTTP Requests

### Lab Duration: 2 Hours

### Prerequisites
- Basic understanding of Node.js, Express.js, and MongoDB.

---

## Objective
By the end of this lab, students will:
- Understand the concept of RESTful APIs.
- Learn how to set up a basic Node.js and Express.js application.
- Implement HTTP methods (GET, POST, PUT, DELETE) to interact with a MongoDB database.
- Test the API using tools like Postman.

---

## Materials Required
- A computer with Node.js installed.
- Code editor (e.g., VS Code).
- MongoDB (Local or MongoDB Atlas).
- Postman or any other API testing tool.

---

## Instructions

### Step 1: Project Setup
1. Create a new directory for the project:
   ```bash
   mkdir restful-api-lab
   cd restful-api-lab
   ```
2. Initialize a Node.js project:
   ```bash
   npm init -y
   ```
3. Install required dependencies:
   ```bash
   npm install express mongoose body-parser nodemon
   ```

### Step 2: Create Folder Structure
```plaintext
restful-api-lab
|-- node_modules
|-- app.js
|-- package.json
|-- models
|   |-- item.js
|-- routes
    |-- items.js
```

### Step 3: Define the API

#### `app.js`
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const itemsRoute = require('./routes/items');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/restfulApiLab', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/items', itemsRoute);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

#### `models/item.js`
```javascript
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Item', itemSchema);
```

#### `routes/items.js`
```javascript
const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new item
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
    });
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (update) an item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price,
            },
            { new: true }
        );
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an item
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
```

---

## Step 4: Run and Test the Application
1. Start the server:
   ```bash
   nodemon app.js
   ```
2. Test the API using Postman or another API testing tool:
   - `GET /api/items`: Retrieve all items.
   - `POST /api/items`: Add a new item (provide `name`, `quantity`, and `price` in the body).
   - `PUT /api/items/:id`: Update an existing item by ID.
   - `DELETE /api/items/:id`: Delete an item by ID.

---

## Expected Output
1. A functional RESTful API that connects to a MongoDB database.
2. Ability to perform CRUD operations (Create, Read, Update, Delete).

---

## Notes
- Make sure MongoDB is running locally or you have configured the connection string for MongoDB Atlas.
- Use Postman to verify all endpoints are working as expected.
