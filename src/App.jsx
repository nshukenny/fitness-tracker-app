import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import Tables from './pages/Tables.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/home" element={<HomePage />} />
        <Route path="/dashboard/users" element={<Tables />} />
        <Route path="/Tables" element={<Tables />} />
      </Routes>
    </Router>
  );
}

export default App;
