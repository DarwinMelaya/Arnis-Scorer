import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Arnis, ArnisScorer, Billiard, Main } from "./pages";

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
      </Routes>
    </Router>
  );
};

export default App;
