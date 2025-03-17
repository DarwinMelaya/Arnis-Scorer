import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Arnis, ArnisScorer } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/arnis" element={<Arnis />} />
        <Route path="/arnis-scorer" element={<ArnisScorer />} />
      </Routes>
    </Router>
  );
};

export default App;
