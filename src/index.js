import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FileUpload from "./components/upload/FileUpload";
import FileDisplayPage from "./components/upload/FileDisplayPage";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="TempFileHost/" element={<FileUpload />} />
        <Route path="/TempFileHost/file" element={<FileDisplayPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
