import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import MovieDetail from "./pages/MovieDetail";
import SeriesDetail from "./pages/SeriesDetail";
import MyList from "./pages/MyList";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Login from "./pages/Login";

function App() {
  const [myList, setMyList] = useState([]); // State រក្សា My List

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies myList={myList} setMyList={setMyList} />} />
        <Route path="/tv-series" element={<TVSeries myList={myList} setMyList={setMyList} />} />
        <Route path="/movie/:id" element={<MovieDetail myList={myList} setMyList={setMyList} />} />
        <Route path="/series/:id" element={<SeriesDetail myList={myList} setMyList={setMyList} />} />
        <Route path="/my-list" element={<MyList myList={myList} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
