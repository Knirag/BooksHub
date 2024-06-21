import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import baseUrl from "../../utils";
import "../../App.css";

interface Book {
  _id: string;
  bookTitle: string;
  bookAuthor: string;
  genre: string;
  description: string;
  bookImage: string;
  bookEpubUrl: string;
  isFavorite: boolean;
}

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 43px;
  width: 900px;
  height: 100%;
  border-radius: 9px;
`;

const FavoriteBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/all-books`)
      .then((res) => {
        console.log("Response data:", res.data);
        if (Array.isArray(res.data.books)) {
          setBooks(res.data.books);
        } else {
          console.error("Fetched data is not an array:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching favorite books:", error);
      });
  }, []);

  const favoriteBooks = books.filter((book) => book.isFavorite);

  return (
    <div>
      <h1>Favorite Books</h1>
      <div>
        {favoriteBooks.map((book) => (
          <Link to={`/book/${book._id}`} className="slider-link" key={book._id}>
            <div className="favorite-books-container">
              <h2 className="book-title">{book.bookTitle}</h2>
              <div className="book-image-column">
                <img
                  src={book.bookImage}
                  alt={book.bookTitle}
                  className="book-image"
                />
              </div>
              <div className="book-detail-column">
                <h6 className="favbook-detail-label">Author:</h6>
                <span className="favbook-detail">{book.bookAuthor}</span>
                <h6 className="favbook-detail-label">Genre:</h6>
                <span className="favbook-detail">{book.genre}</span>
                <h6 className="favbook-detail-label">Description: </h6>
                <p className="book-detail-info">{book.description}</p>
                <a
                  href={book.bookEpubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Book
                </a>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoriteBooks;
