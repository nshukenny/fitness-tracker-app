export const isLoggedIn = () => {
  const authToken = localStorage.getItem('authToken');
  return !!authToken;
};
