import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Arnis, ArnisScorer, Billiard, BilliardScorer, Main } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<Main />} />
        {/* Arnis */}
        <Route path="/arnis" element={<Arnis />} />
        <Route path="/arnis-scorer" element={<ArnisScorer />} />
        {/* Billiard */}
        <Route path="/billiard" element={<Billiard />} />
        <Route path="/billiard-scorer" element={<BilliardScorer />} />
      </Routes>
    </Router>
  );
};

export default App;
