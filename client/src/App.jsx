import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import HotelsList from "./pages/HotelsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotelsList" element={<HotelsList />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
