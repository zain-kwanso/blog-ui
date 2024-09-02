import { useNavigate } from "react-router-dom";
import { routeUrl } from "../utils/pageRoutes";
const useCustomNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (url: string, params = {}): void => {
    let finalUrl = url;
    for (const [key, value] of Object.entries(params)) {
      finalUrl = finalUrl.replace(`:${key}`, value as string);
    }
    navigate(finalUrl);
  };
  return {
    navigateToPreviewPostPage: (postId: number) =>
      navigateTo(routeUrl.previewPost, { postId }),
    navigateToEditPostPage: (postId: number) =>
      navigateTo(routeUrl.editPost, { postId }),
    navigateToCreatePostPage: () => navigate(routeUrl.createPost),
    navigateTologinPage: () => navigate(routeUrl.login),
    navigateToSignupPage: () => navigate(routeUrl.signup),
    navigateToHomePage: () => navigate(routeUrl.base),
  };
};
export default useCustomNavigation;
