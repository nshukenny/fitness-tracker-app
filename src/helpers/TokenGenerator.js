const TokenGenerator = ({ length }) => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
};

export default TokenGenerator;
