import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginValidationSchema from "../../Validation/loginValidationSchema";
import { AuthContext } from "../context/authContext";

const LoginForm = () => {
  const { user, signin } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const onSubmit = async (data) => {
    try {
      await signin(data.email, data.password);
    } catch (error) {
      setError("apiError", {
        type: "manual",
        message: "Invalid Credentials",
      });
    }
  };

  return (
    <form
      className="w-full max-w-3xl self-center p-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          {...register("email")}
          className={`w-full px-3 py-2 border rounded-lg ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          {...register("password")}
          className={`w-full px-3 py-2 border rounded-lg ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {errors.apiError && (
        <p className="text-red-500 text-sm mt-1">{errors.apiError.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 rounded-lg"
      >
        {isSubmitting ? "Signing In..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
