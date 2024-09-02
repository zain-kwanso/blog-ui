import SignupForm from "../components/SignupForm";
import { routeUrl } from "../utils/pageRoutes";

const SignupPage: React.FC = (): React.JSX.Element => {
  return (
    <div className="flex justify-center items-center h-full w-full p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <SignupForm />
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href={routeUrl.login} className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
