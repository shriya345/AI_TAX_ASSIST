import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import TaxSuggestionPage from "./pages/TaxSuggestionPage";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/tax" element={<TaxSuggestionPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;