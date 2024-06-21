import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineDownload } from "react-icons/md";
import baseUrl from "../../utils";

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

const BookInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get<Book>(`${baseUrl}/book/${id}`);
        setBook(response.data);
        setIsFavorite(response.data.isFavorite);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const response = await axios.put<Book>(`${baseUrl}/book/${id}/favorite`, {
        isFavorite: !isFavorite,
      });
      setIsFavorite(response.data.isFavorite);
    } catch (err) {
      console.error("Error updating favorite status:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="book-info-container">
        <h2 className="bookInfo-Title">{book!.bookTitle}</h2>
        <div className="bookInfo-image-container">
          <img
            src={book!.bookImage}
            alt={book!.bookTitle}
            className="bookInfo-image"
          />
        </div>

        <div className="bookDetail-container">
          <h6 className="book-detail-label">Author:</h6>{" "}
          <span className="book-detail">{book!.bookAuthor}</span>
          <h6 className="book-detail-label">Genre:</h6>
          <span className="book-detail">{book!.genre}</span>
          <h6 className="book-detail-label">Description: </h6>
          <p className="book-detail-info">{book!.description}</p>
          <div className="info-download-button">
            <button className="download-book">
              <a href={book!.bookEpubUrl} className="download-link">
                <MdOutlineDownload />
                Download
              </a>
            </button>
            <div className="favorite-button">
              <button onClick={toggleFavorite} className="button-favorite">
                {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
