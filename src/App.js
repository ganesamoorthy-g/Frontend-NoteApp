import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import Allnotepage from './components/Allnotepage';
import Activity from './Pages/Activity';
import Expense from './Pages/Expense';
import OfficeLog from './Pages/Officelog';
import History from './Pages/History';
import Singlenote from "./Pages/Singlenote";
import ErrorPage from './Pages/ErrorPage';
import LoginSignupPage from './components/LoginSignupPage';


function App() {
  const [user, setUser] = useState(null);
  // console.log(user);

  return (
    <div className="app-container">
      <Router>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/*" element={<LoginSignupPage setUser={setUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/allnotepage" element={<Allnotepage user={user}/>} />
          <Route path="/note/activity" element={<Activity user={user} />} />
          <Route path="/note/expense" element={<Expense user={user} />} />
          <Route path="/note/officelog" element={<OfficeLog user={user} />} />
          <Route path="/history/:userId" element={<History user={user} />}/>
          <Route path="/history/:type/:id" element={<Singlenote user={user} />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
