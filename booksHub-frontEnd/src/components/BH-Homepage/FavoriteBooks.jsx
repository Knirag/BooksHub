import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../utils";

const FavoriteBooks = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/all-books`)
      .then((res) => {
        setFavoriteBooks(res.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite books:", error);
      });
  }, []); 
  return (
    <div>
      <h1>Favorite Books</h1>
      <ul>
        {favoriteBooks.map((book) => (
          <li key={book.id}>{book.bookName}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteBooks;
