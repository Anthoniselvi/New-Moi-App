import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Home/Navbar/Navbar";
import Header from "./components/Home/Header/Header";

function App() {
  return (
    <div className="app">
      {/* <Header />/ */}
      <Home />
      {/* <Routes>
        <Route path="/" element={<Home />} />
      </Routes> */}
    </div>
  );
}

export default App;
