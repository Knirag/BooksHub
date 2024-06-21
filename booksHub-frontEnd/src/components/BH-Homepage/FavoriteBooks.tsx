import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../utils";
import BookCards from "./BookCards";
import RecomendedBooks from "./RecomendedBooks";

interface Book {
  _id: string;
  bookTitle: string;
  bookAuthor: string;
  bookImage: string;
  bookName: string;
  genre: string;
  description: string;
  bookEpubUrl: string;
  isFavorite: boolean;
}

const FavoriteBooks: React.FC = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/all-books`)
      .then((res) => {
        console.log("Response data:", res.data);
        if (Array.isArray(res.data.books)) {
          setFavoriteBooks(res.data.books);
        } else {
          console.error("Fetched data is not an array:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching favorite books:", error);
      });
  }, []);

  return (
    <div>
      <BookCards favoriteBooks={favoriteBooks} headline="Popular Favorites" />
      <RecomendedBooks
        favoriteBooks={favoriteBooks}
        headline="Your Recommendations"
      />
    </div>
  );
};

export default FavoriteBooks;
