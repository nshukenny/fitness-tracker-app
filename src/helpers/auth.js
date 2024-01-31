export const isLoggedIn = () => {
  const authToken = localStorage.getItem('FITNESS_TRACKER_APP_ADMIN_TOKEN');
  return !!authToken;
};
