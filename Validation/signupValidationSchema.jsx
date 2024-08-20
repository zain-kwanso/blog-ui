import * as Yup from "yup";

const signupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters long")
    .max(20, "Name must be less than 20 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

export default signupValidationSchema;
