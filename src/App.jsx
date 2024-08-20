import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { AuthContext } from "./context/authContext";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout isAuthenticated={!!user} />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          {/* Add more public routes here */}
        </Route>

        {/* Private Routes */}
        <Route path="/" element={<PrivateLayout isAuthenticated={!!user} />}>
          <Route path="home" element={<HomePage />} />
          {/* Add more private routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
