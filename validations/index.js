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

const fileSchema = yup
  .object()
  .required()
  .test("is-valid", async (value, ctx) => {
    const schema = yup
      .object()
      .shape({
        fileSize: yup
          .number()
          .positive()
          .max(5000000, "fileSize must be less than or equal to 50MB")
          .required(),
        mimeType: yup
          .string()
          .min(
            1,
            "valid mimeTypes are video/*, image/jpeg, image/png, image/jpg"
          )
          .required()
          .test(
            "is-valid",
            "valid mimeTypes are video/*, image/jpeg, image/png, image/jpg",
            (value) =>
              value.startsWith("video/") ||
              ["image/jpeg", "image/png", "image/jpg"].includes(value)
          ),
      })
      .typeError("invalid file is uploaded!");
    const errorMessage = await schema
      .validate(value.assets)
      .catch((err) => err.message);
    if (typeof errorMessage === "string")
      return ctx.createError({ message: errorMessage });
    return true;
  });

export const videoSchema = {
  title: yup.string().min(4).required(),
  video: fileSchema.typeError("video is required"),
  thumbnail: fileSchema.typeError("thumbnail is required"),
  prompt: yup.string().min(4).required(),
};
