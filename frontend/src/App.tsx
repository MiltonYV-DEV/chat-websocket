import "./App.css";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

function App() {
  return (
    <>
      {/* <Navbar /> */}

      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
