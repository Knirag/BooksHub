import React from "react";
import styled from "styled-components";
import BookCards from "./BookCards";
import FavoriteBooks from "./FavoriteBooks";

export const BooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 100px;
`;
const BooksHubPage = () => {
  return (
    <div>
      <BooksContainer>
        <h2>FOR YOU</h2>
      </BooksContainer>
      <BookCards />
      <FavoriteBooks />
    </div>
  );
};

export default BooksHubPage;
