import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UrlScraper from "./pages/UrlScraper.jsx";
import Index from "./pages/Index.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/scrape" element={<UrlScraper />} />
      </Routes>
    </Router>
  );
}

export default App;
