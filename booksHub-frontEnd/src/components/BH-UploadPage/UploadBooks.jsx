// src/UploadBooks.jsx
import React from "react";
import "../../App.css";

const UploadBooks = () => {
  return (
    <div className="upload-books-container">
      <form className="upload-books-form">
        <h5>Import Book</h5>
        <label>Book Name:</label>
        <input type="text" name="bookName" required />
        <label>Author:</label>
        <input type="text" name="author" required />
        <label>Category:</label>
        <input type="text" name="category" required />
        <label>Book URL:</label>
        <input type="text" name="bookUrl" required />
        <label>Book Description:</label>
        <textarea name="bookDescription" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadBooks;
