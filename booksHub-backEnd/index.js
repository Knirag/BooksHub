const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Enable CORS for all routes
app.use(cors());

// Body parsing middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// MongoDB configuration
const uri =
  "mongodb+srv://tay600:11111@bookshub.gyxbwfe.mongodb.net/?retryWrites=true&w=majority&appName=booksHub";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const booksLibrary = client.db("BooksInventory").collection("books");

    // Endpoint to upload multiple books
    app.post("/upload-book", async (req, res) => {
      try {
        const books = req.body;
        if (!Array.isArray(books)) {
          return res
            .status(400)
            .send("Request body must be an array of books.");
        }
        console.log("Request body:", books);
        const result = await booksLibrary.insertMany(books);
        res.status(201).send(result);
      } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Internal Server Error");
      }
    });

    // Endpoint to get all books
    app.get("/all-books", async (req, res) => {
      try {
        const books = await booksLibrary.find({}).toArray();
        res.send(books);
      } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).send("Internal Server Error");
      }
    });

    // Endpoint to update a book
    app.patch("/book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updateBookData = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            ...updateBookData,
          },
        };
        const result = await booksLibrary.updateOne(filter, updateDoc, options);
        res.send(result);
      } catch (err) {
        console.error("Error updating book:", err);
        res.status(500).send("Internal Server Error");
      }
    });

    // Endpoint to delete a book
    app.delete("/book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await booksLibrary.deleteOne(filter);
        if (result.deletedCount === 1) {
          res.status(200).send({ message: "Book successfully deleted" });
        } else {
          res.status(404).send({ message: "Book not found" });
        }
      } catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).send("Internal Server Error");
      }
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
