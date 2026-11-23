import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";
import Recommendations from "./pages/Recommendations";
import CompleteOutfit from "./pages/CompleteOutfit";
import Wardrobe from "./pages/Wardrobe";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/outfit" element={<CompleteOutfit />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}