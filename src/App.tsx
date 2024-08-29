import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { AuthContext } from "./context/authContext";
import AboutUsPage from "./pages/AboutUsPage";
import PublicRoute from "./components/PublicRoutes";
import PreviewPostPage from "./pages/PreviewPostPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import { routeUrl } from "./utils/pageRoutes";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        {/* Public Layout */}
        <Route
          path={routeUrl.base}
          element={<PublicLayout isAuthenticated={!!user} />}
        >
          <Route element={<PublicRoute redirectPath={routeUrl.base} />}>
            <Route path={routeUrl.login} element={<LoginPage />} />
            <Route path={routeUrl.signup} element={<SignupPage />} />
          </Route>
          <Route path={routeUrl.base} element={<HomePage />} />
          <Route path={routeUrl.about} element={<AboutUsPage />} />
          <Route path={routeUrl.previewPost} element={<PreviewPostPage />} />
        </Route>

        {/* Private Routes */}
        <Route
          path={routeUrl.base}
          element={<PrivateLayout isAuthenticated={!!user} />}
        >
          {/* <Route path={routeUrl.home} element={<HomePage />} /> */}
          <Route path={routeUrl.editPost} element={<EditPostPage />} />
          <Route path={routeUrl.createPost} element={<CreatePostPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
