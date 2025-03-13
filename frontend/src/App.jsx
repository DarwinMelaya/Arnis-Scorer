import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Display, Home } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/display" element={<Display/>} />
      </Routes>
    </Router>
  );
};

export default App;
