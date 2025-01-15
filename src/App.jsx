import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import HealthForm from './components/HealthForm';
import { UserProvider } from './context/UserContext';
import RecipeList from './components/Rezeptlist';
import KalorienTracker from './components/KalorienTracker';

import TrainingPlan from './components/Trainingplan';
import SignUp from './components/SignUp';


const Navigation = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333', // Dunkelgrauer Hintergrund
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#fff' // Weiße Schrift
    }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        NutriLog
      </div>
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}>
        <li style={{ margin: '0 15px' }}>
          <Link to="/" style={{
            textDecoration: 'none',
            color: '#fff', // Weiße Schrift
            fontWeight: '500',
            fontSize: '16px'
          }}>Home</Link>
        </li><li style={{ margin: '0 15px' }}>
          <Link to="/signup" style={{
            textDecoration: 'none',
            color: '#fff', // Weiße Schrift
            fontWeight: '500',
            fontSize: '16px'
          }}>Signup</Link>
        </li>
        <li style={{ margin: '0 15px' }}>
          <Link to="/login" style={{
            textDecoration: 'none',
            color: '#fff', // Weiße Schrift
            fontWeight: '500',
            fontSize: '16px'
          }}>Login</Link>
        </li>
        <li style={{ margin: '0 15px' }}>
          <Link to="/gur" style={{
            textDecoration: 'none',
            color: '#fff', // Weiße Schrift
            fontWeight: '500',
            fontSize: '16px'
          }}>Rechner</Link>
        </li>
        <li style={{ margin: '0 15px' }}>
          <Link to="/tracker" style={{
            textDecoration: 'none',
            color: '#fff', // Weiße Schrift
            fontWeight: '500',
            fontSize: '16px'
          }}>Tracker</Link>
        </li><li style={{ margin: '0 15px' }}>
          <Link to="/rezept" style={{
            textDecoration: 'none',
            color: '#fff', // Weiße Schrift
            fontWeight: '500',
            fontSize: '16px'
          }}>Rezept</Link>
        </li>
        <li style={{ margin: '0 15px' }}>
          <Link to="/plan" style={{
            textDecoration: 'none',
            color: '#fff', // Weiße Schrift
            fontWeight: '500',
            fontSize: '16px'
          }}>Trainingplan</Link>
        </li>
      </ul>
    </nav>
  );
};

function App() {
  return (
    <UserProvider>
      <Navigation />
      <div style={{
        paddingTop: '60px', // Platz für die Navigation schaffen
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gur" element={<HealthForm />} />
          <Route path="/tracker" element={<KalorienTracker />} />
          <Route path="/rezept" element={<RecipeList />} />
          <Route path="/plan" element={<TrainingPlan />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
