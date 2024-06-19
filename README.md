# BooksHub

This is a Book Upload and Management Application built using MongoDB, Node.js, Express, and React with TypeScript. The frontend is styled using CSS and styled-components and utilizes UI libraries like Swiper. The frontend application is created using Vite, and Axios is used for API fetching.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/Knirag/BooksHub.git
   cd BooksHub
   ```

2. Navigate to the backend directory and install dependencies:

   ```bash
   cd booksHub-backEnd
   npm install
   ```

3. Create a `.env` file in the backend directory and add your MongoDB URI:

   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the frontend directory and install dependencies:

   ```bash
   cd ../booksHub-frontEnd
   npm install
   ```

2. Start the frontend application:
   ```bash
   npm run dev
   ```

## Usage

- Navigate to `http://localhost:3000` to view the frontend application.
- Use Postman or any API client to interact with the backend server at `http://localhost:5000`.

## Project Structure

BooksHub/
├── .vscode/
├── booksHub-backEnd/
│ ├── .env
│ ├── server.js
│ ├── package.json
│ └── ...
├── booksHub-frontEnd/
│ ├── src/
│ │ ├── components/
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ ├── styles/
│ │ ├── services/
│ │ └── ...
│ ├── public/
│ ├── index.html
│ ├── vite.config.ts
│ ├── package.json
│ └── ...
├── node_modules/
├── package-lock.json
├── package.json
├── README.md
└── ...

## Features

- **Upload Books**: Upload book details including name, author, category, URL, and description.
- **View Books**: Display a list of uploaded books.
- **Update Books**: Update details of an existing book.
- **Delete Books**: Delete a book by its ID.
- **Responsive Design**: Frontend built with responsive design principles.

## API Endpoints

### Backend

- **POST /upload-book**: Upload a new book.
- **GET /all-books**: Retrieve all books.
- **PATCH /book/:id**: Update a book by its ID.
- **DELETE /book/:id**: Delete a book by its ID.

## Technologies Used

- **Backend**:

  - Node.js
  - Express
  - MongoDB

- **Frontend**:
  - React
  - TypeScript
  - Vite
  - Axios
  - CSS
  - styled-components
  - Swiper

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
