import "./App.css";
import Signin from "./components/signin";
import Profile from "./components/profile";
import Navbar from "./components/navbar";
import Netflix from "./components/netflix";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Searchcomp from "./components/searchcomp";
import Mylist from "./components/mylist";
import axios from "axios";
axios.defaults.withCredentials = true;


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/netflix" element={<Netflix />} />
        <Route path="/searchpage" element={<Searchcomp />} />
        <Route path="/mylist" element={<Mylist />} />
      </Routes>
    </Router>
  );
}

export default App;
