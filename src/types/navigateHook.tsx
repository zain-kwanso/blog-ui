export interface UseCustomNavigation {
  navigateToPreviewPostPage: (postId: number) => void;
  navigateToEditPostPage: (postId: number) => void;
  navigateToCreatePostPage: () => void;
  navigateTologinPage: () => void;
  navigateToSignupPage: () => void;
  navigateToHomePage: () => void;
}
