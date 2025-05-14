import UsersModel from "../model/Users.Model.js";

export const userById = async (id) => {
  const user = await UsersModel.findById(id);
  return user;
};

export const userByEmail = async (email) => {
  const user = await UsersModel.findOne({ email });
  return user;
};
