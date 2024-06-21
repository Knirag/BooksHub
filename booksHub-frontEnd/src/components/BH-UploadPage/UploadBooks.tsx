import React, { useState, ChangeEvent, FormEvent } from "react";
import "../../App.css";
import axios from "axios";
import baseUrl from "../../utils";

interface FormData {
  bookName?: string;
  bookTitle?: string;
  bookImage?: string;
  bookAuthor?: string;
  genre?: string;
  bookEpubUrl?: string;
  description?: string;
}

const UploadBooks: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/upload-book`, formData);
      alert("Book uploaded successfully!");
    } catch (error) {
      console.error("Error uploading book:", error);
      alert("There was an error uploading the book. Please try again.");
    }
  };

  return (
    <div className="upload-books-container">
      <form onSubmit={onSubmit} className="upload-form">
        <h5 className="form-label">Import Book</h5>
        <label className="book-label">Book Name:</label>
        <input
          type="text"
          name="bookName"
          onChange={onChangeHandler}
          className="book-input"
          required
        />
        <label className="book-label">Book Title:</label>
        <input
          type="text"
          name="bookTitle"
          className="book-input"
          onChange={onChangeHandler}
          required
        />
        <label className="book-label">Book Image URL:</label>
        <input
          type="text"
          name="bookImage"
          className="book-input"
          onChange={onChangeHandler}
          required
        />
        <label className="book-label">Author:</label>
        <input
          type="text"
          name="bookAuthor"
          className="book-input"
          onChange={onChangeHandler}
          required
        />
        <label className="book-label">Genre:</label>
        <input
          type="text"
          name="genre"
          className="book-input"
          onChange={onChangeHandler}
          required
        />
        <label className="book-label">Book URL:</label>
        <input
          type="text"
          name="bookEpubUrl"
          className="book-input"
          onChange={onChangeHandler}
          required
        />
        <label className="book-label">Book Description:</label>
        <textarea
          name="description"
          className="book-input-textarea"
          onChange={onChangeHandler}
          required
        ></textarea>
        <button type="submit" className="submit-book">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadBooks;
