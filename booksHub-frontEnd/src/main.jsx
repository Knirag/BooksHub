import React from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BooksHubPage from "./components/BH-Homepage/homepage";
import BookInfo from './components/BH-BookInfoPage/BookInfo';
import Personalbooks from './components/BH-BookCollectionPage/personalbooks';
import UploadBooks from './components/BH-UploadPage/UploadBooks';
import NavBar from "./components/NavBar"
import './App.css'
export default function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<BooksHubPage />} />
          <Route index element={<BooksHubPage />} />
          <Route path="/bookInfo" element={<BookInfo />} />
          <Route path="/myBooks" element={<Personalbooks />} />
          <Route path="/uploadbooks" element={<UploadBooks />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
const root = createRoot(document.getElementById("root"));
root.render(<App />);
