import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "../../App.css";
import { Link } from "react-router-dom";

interface Book {
  _id: string;
  bookTitle: string;
  bookAuthor: string;
  bookImage: string;
  bookName: string;
}

interface RecomendedBooksProps {
  favoriteBooks: Book[];
  headline: string;
}

const RecomendedBooks: React.FC<RecomendedBooksProps> = ({
  favoriteBooks,
  headline,
}) => {
  const limitedBooks = favoriteBooks.slice(10, 23);

  return (
    <div>
      <h2 className="comp-label">{headline}</h2>
      <div className="book-cards-container2">
        <Swiper
          slidesPerView={5}
          spaceBetween={1}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {limitedBooks?.map((book) => (
            <SwiperSlide key={book._id}>
              <Link to={`/book/${book._id}`} className="slider-link">
                <div className="slider-image ">
                  <img src={book.bookImage} alt={book.bookTitle} />
                </div>
                <div className="book-rec-text">
                  <h5 className="book-Name">{book.bookName}</h5>
                  <h5 className="book-Author">{book.bookAuthor}</h5>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecomendedBooks;
