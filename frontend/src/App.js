import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useContext } from "react";
import ToursPage from "./Pages/ToursPage/ToursPage";
import TourDetailsPage from "./Pages/TourDetailsPage/TourDetailsPage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/tours" />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/tours/:id" element={<TourDetailsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer>
        <p>This app uses React Router Dom v6</p>
      </Footer>
    </div>
  );
}

export default App;
