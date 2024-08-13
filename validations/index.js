import * as yup from "yup";

export const signInSchema = {
  email: yup.string().email().required(),
  password: yup.string().min(8).max(256).required(),
};

export const signUpSchema = {
  ...signInSchema,
  username: yup.string().min(2).required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match"),
};

export const searchSchema = {
  searchValue: yup.string().min(1).required(),
};

export const videoSchema = {
  title: yup.string().min(4).required(),
  video: yup.string().min(4, "video must be uploaded").required(),
  thumbnail: yup.string().min(4, "thumbnail must be uploaded").required(),
  prompt: yup.string().min(4).required(),
};
