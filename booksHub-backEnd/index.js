const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

    // Endpoint to upload a book
    app.post("/upload-book", async (req, res) => {
      try {
        let book = req.body;
        if (typeof book !== "object" || Array.isArray(book)) {
          return res
            .status(400)
            .send("Request body must be a single book object.");
        }

        // Transform the genre string into an array
        if (book.genre && typeof book.genre === "string") {
          book.genre = book.genre.split(",").map((genre) => genre.trim());
        }

        console.log("Request body:", book);
        const result = await booksLibrary.insertOne(book);
        res.status(201).send(result);
      } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Internal Server Error");
      }
    });


    // Endpoint to get all books
// Endpoint to get all books with pagination
app.get("/all-books", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 30; // Default to 30 books per page
    const skip = (page - 1) * limit;

    const books = await booksLibrary.find({}).skip(skip).limit(limit).toArray();
    const totalBooks = await booksLibrary.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    res.json({ books, totalBooks, totalPages });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Internal Server Error");
  }
});


    // Endpoint to get a single book by id
    app.get("/book/:id", async (req, res) => {
      try {
        const book = await booksLibrary.findOne({
          _id: new ObjectId(req.params.id),
        });
        res.send(book);
      } catch (err) {
        console.error("Error fetching book:", err);
        res.status(500).send("Internal Server Error");
      }
    });

    // Endpoint to update the favorite status of a book
    app.put("/book/:id/favorite", async (req, res) => {
      try {
        const { id } = req.params;
        const { isFavorite } = req.body;

        const result = await booksLibrary.updateOne(
          { _id: new ObjectId(id) },
          { $set: { isFavorite } }
        );

        if (result.modifiedCount === 1) {
          res.json({ isFavorite });
        } else {
          res.status(404).send("Book not found");
        }
      } catch (err) {
        console.error("Error updating favorite status:", err);
        res.status(500).send("Internal Server Error");
      }
    });

    // Other endpoints for updating and deleting books...
    app.patch("/book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updateBookData = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: { ...updateBookData },
        };
        const result = await booksLibrary.updateOne(filter, updateDoc, options);
        res.send(result);
      } catch (err) {
        console.error("Error updating book:", err);
        res.status(500).send("Internal Server Error");
      }
    });

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
