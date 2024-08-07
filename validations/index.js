import * as yup from "yup";

export const signInSchema = {
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
};
