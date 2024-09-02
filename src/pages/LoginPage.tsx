import React from "react";
import LoginForm from "../components/LoginForm";
import { routeUrl } from "../utils/pageRoutes";

const LoginPage: React.FC = (): React.JSX.Element => {
  return (
    <div className="flex justify-center items-center h-full w-full p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <LoginForm />
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href={routeUrl.signup} className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
