# Lab4

This is Lab4, a simple Express.js application that connects to a MongoDB database and provides CRUD operations for items.

## Project Structure
app.log index.js logger.js model/ item.js package.json routes/ itemRoutes.js


## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.geprm.mongodb.net/
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. For development, you can use:
    ```sh
    npm run dev
    ```

3. The server will start on port `5000`. You can access the API at `http://localhost:5000/api/items`.

## API Endpoints

- **GET /api/items**: Get all items
- **GET /api/items/:id**: Get a specific item by ID
- **POST /api/items**: Add a new item
- **PUT /api/items/:id**: Update an item by ID
- **DELETE /api/items/:id**: Delete an item by ID

## Logging

The application uses Winston for logging. Logs are written to the console and to a file named [app.log](http://_vscodecontentref_/6).

## Dependencies

- express
- body-parser
- mongoose
- morgan
- nodemon
- winston

## License

This project is licensed under the ISC License.
