import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Arnis, ArnisScorer, Main } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/arnis" element={<Arnis />} />
        <Route path="/arnis-scorer" element={<ArnisScorer />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
