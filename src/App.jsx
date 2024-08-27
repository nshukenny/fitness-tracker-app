import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import UsersPage from './pages/users/UsersPage.jsx';
//import UsersTable from './pages/users/UsersTable.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/home" element={<HomePage />} />
        <Route path="/dashboard/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
