import * as Yup from "yup";

const postValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title must be at most 100 characters long")
    .required("Title is required"),
  content: Yup.string()
    .min(10, "Content must be at least 10 characters long")
    .max(3000, "Content must be at most 3000 characters long")
    .required("Content is required"),
});

export default postValidationSchema;
