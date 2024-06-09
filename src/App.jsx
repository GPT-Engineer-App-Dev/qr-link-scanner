import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Scraper from "./pages/Scraper.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/scraper" element={<Scraper />} />
      </Routes>
    </Router>
  );
}

export default App;
