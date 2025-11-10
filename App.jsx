import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import TaskManager from './components/TaskManager';
import Users from './pages/Users';

const AppContent = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Layout onThemeToggle={toggleTheme} isDark={isDark}>
      <Routes>
        <Route path="/" element={<TaskManager />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
