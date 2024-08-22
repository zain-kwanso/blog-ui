import { useNavigate } from "react-router-dom";
import { routeUrl } from "../utils/pageRoutes";
const useCustomNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (url, params = {}) => {
    let finalUrl = url;
    for (const [key, value] of Object.entries(params)) {
      finalUrl = finalUrl.replace(`:${key}`, value);
    }
    navigate(finalUrl);
  };
  return {
    navigateToPreviewPostPage: (postId) =>
      navigateTo(routeUrl.previewPost, { postId }),
    navigateToEditPostPage: (postId) =>
      navigateTo(routeUrl.editPost, { postId }),
    navigateToCreatePostPage: () => navigate(routeUrl.createPost),
    navigateTologinPage: () => navigate(routeUrl.login),
    navigateToSignupPage: () => navigate(routeUrl.signup),
    navigateToHomePage: () => navigate(routeUrl.base),
  };
};
export default useCustomNavigation;
