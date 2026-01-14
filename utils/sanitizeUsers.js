const sanitizeUser = (user) => {
  const { password, ...rest } = user;
  return rest;
};

export default sanitizeUser;
