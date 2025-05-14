export const getUserResponseWithoutPassword = (userResponse) => {
  const minUserResponse = {
    id: userResponse.id,
    name: userResponse.firstName,
    fullName: `${userResponse.firstName} ${userResponse.lastName}`,
    email: userResponse.email,
    image: userResponse.profilePicture,
    role: userResponse.isAdmin ? 901 : 902,
  };

  return minUserResponse;
};

export const getUserWithAuthToken = (userResponse, token) => {
  const minUserResponse = {
    user: {
      id: userResponse.id,
      name: userResponse.firstName,
      fullName: `${userResponse.firstName} ${userResponse.lastName}`,
      email: userResponse.email,
      image: userResponse.profilePicture,
      role: userResponse.isAdmin ? "admin" : "user",
    },
    token: token,
  };

  return minUserResponse;
};
