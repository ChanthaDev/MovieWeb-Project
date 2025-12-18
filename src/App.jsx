import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import MovieDetail from "./pages/MovieDetail";
import SeriesDetail from "./pages/SeriesDetail";
import MyList from "./pages/MyList";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

function App() {
  const [myList, setMyList] = useState([]); // My List state

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home + Search */}
        <Route path="/" element={<Home />} />

        {/* Movie + TV pages */}npm run dev
        <Route
          path="/movies"
          element={<Movies myList={myList} setMyList={setMyList} />}
        />
        <Route
          path="/tv-series"
          element={<TVSeries myList={myList} setMyList={setMyList} />}
        />

        {/* Detail pages */}
        <Route
          path="/movie/:id"
          element={<MovieDetail myList={myList} setMyList={setMyList} />}
        />
        <Route
          path="/series/:id"
          element={<SeriesDetail myList={myList} setMyList={setMyList} />}
        />

        {/* My List */}
        <Route path="/my-list" element={<MyList myList={myList} />} />

        {/* Login page (optional) */}
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
