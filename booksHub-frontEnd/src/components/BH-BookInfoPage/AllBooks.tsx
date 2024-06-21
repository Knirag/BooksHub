import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import styled from "styled-components";
import baseUrl from "../../utils";
import "../../App.css";
import { Link } from "react-router-dom";

interface Book {
  _id: string;
  bookTitle: string;
  bookAuthor: string;
  genre: string;
  description: string;
  bookImage: string;
  bookEpubUrl: string;
}

interface FetchBooksResponse {
  books: Book[];
  totalPages: number;
}

const SelectContainer = styled.select`
  background: none;
  height: 28px;
  align-items: center;
  text-decoration: none;
  color: #4d2800;
  font-size: 13px;
  text-align: center;
  width: 140px;
  margin: 0 auto;
  padding: 3px;
  border: 1px solid #773801;
  border-radius: 4px;
`;

const AllBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const fetchBooks = (page: number) => {
    axios
      .get<FetchBooksResponse>(`${baseUrl}/all-books`, {
        params: { page, limit: 30 },
      })
      .then((res) => {
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages);
        setFilteredBooks(res.data.books);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  const uniqueGenres = [...new Set(books.flatMap((book) => book.genre))];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = event.target.value;
    setSelectedGenre(selectedGenre);
    filterBooks(selectedGenre, selectedAuthor);
  };

  const handleAuthorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedAuthor = event.target.value;
    setSelectedAuthor(selectedAuthor);
    filterBooks(selectedGenre, selectedAuthor);
  };

  const filterBooks = (genre: string, author: string, query = searchQuery) => {
    let filtered = books;

    if (genre) {
      filtered = filtered.filter((book) => book.genre.includes(genre));
    }

    if (author) {
      filtered = filtered.filter((book) => book.bookAuthor === author);
    }

    if (query) {
      filtered = filtered.filter(
        (book) =>
          book.bookTitle.toLowerCase().includes(query) ||
          book.bookAuthor.toLowerCase().includes(query)
      );
    }

    setFilteredBooks(filtered);
  };

  return (
    <div className="all-books-container">
      <form onSubmit={(e: FormEvent) => e.preventDefault()}>
        <label htmlFor="search">Search for books :</label>
        <input
          id="search"
          type="search"
          name="search"
          pattern=".*\\S.*"
          required
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value.toLowerCase());
            filterBooks(
              selectedGenre,
              selectedAuthor,
              e.target.value.toLowerCase()
            );
          }}
        />
        <button className="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>

      <div className="filtering-row">
        <SelectContainer onChange={handleGenreChange} value={selectedGenre}>
          <option value="">All Genres</option>
          {uniqueGenres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </SelectContainer>

        <SelectContainer onChange={handleAuthorChange} value={selectedAuthor}>
          <option value="">All Authors</option>
          {Array.from(new Set(books.map((book) => book.bookAuthor))).map(
            (author, index) => (
              <option key={index} value={author}>
                {author}
              </option>
            )
          )}
        </SelectContainer>
      </div>

      <div className="books-grid">
        {filteredBooks.length > 0
          ? filteredBooks.map((book) => (
              <div key={book._id} className="book-card">
                <Link to={`/book/${book._id}`}>
                  <img
                    src={book.bookImage}
                    alt={book.bookTitle}
                    className="book-image"
                  />
                </Link>
                <h3>{book.bookTitle}</h3>
                <p>
                  <strong>Author:</strong> {book.bookAuthor}
                </p>
                <p>
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p>{book.description}</p>
                <a
                  href={book.bookEpubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Book
                </a>
              </div>
            ))
          : books.map((book) => (
              <div key={book._id} className="book-card">
                <Link to={`/book/${book._id}`}>
                  <img
                    src={book.bookImage}
                    alt={book.bookTitle}
                    className="book-image"
                  />
                </Link>
                <h3>{book.bookTitle}</h3>
                <p>
                  <strong>Author:</strong> {book.bookAuthor}
                </p>
                <p>
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p>{book.description}</p>
                <a
                  href={book.bookEpubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Book
                </a>
              </div>
            ))}
      </div>

      <div className="pagination">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num + 1}
            className={currentPage === num + 1 ? "active" : ""}
            onClick={() => handlePageChange(num + 1)}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
