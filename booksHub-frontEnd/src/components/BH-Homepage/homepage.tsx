import React from "react";
import styled from "styled-components";
import FavoriteBooks from "./FavoriteBooks";

export const BooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 100px;
`;

const BooksHubPage: React.FC = () => {
  return (
    <div>
      <BooksContainer>
        <FavoriteBooks />
      </BooksContainer>
    </div>
  );
};

export default BooksHubPage;
