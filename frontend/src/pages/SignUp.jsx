import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "~/utils/validatos";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSignup = (data) => {
    const { email, username, password } = data;

    console.log({ email, username, password });
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        <div className="flex-1">
          <Link to={"/"} className="font-bold text-4xl">
            <span className="px-2 py-1 self-center rounded-lg bg-gradient-to-r text-white from-purple-500 to-pink-500">
              Cuong's
            </span>{" "}
            Blog
          </Link>
          <p className="text-sm mt-5">
            Please sign up to enjoy our services! You can sign up with email and
            password or with google
          </p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit(handleSignup)}
            className="flex flex-col gap-4"
          >
            <div className="">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Your username"
                id="username"
                {...register("username", {
                  required: FIELD_REQUIRED_MESSAGE,
                })}
                className="px-4 py-2 border border-gray-400 rounded-lg mt-1 bg-gray-50 w-full"
              />
              <FieldErrorAlert errors={errors} fieldName={"username"} />
            </div>

            <div className="">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                id="email"
                {...register("email", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE,
                  },
                })}
                className="px-4 py-2 border border-gray-400 rounded-lg mt-1 bg-gray-50 w-full"
              />
              <FieldErrorAlert errors={errors} fieldName={"email"} />
            </div>

            <div className="">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Your password"
                id="password"
                {...register("password", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE,
                  },
                })}
                className="px-4 py-2 border border-gray-400 rounded-lg mt-1 bg-gray-50 w-full"
              />
              <FieldErrorAlert errors={errors} fieldName={"password"} />
            </div>

            <button
              type="submit"
              className="cursor-pointer outline-none w-full bg-gradient-to-r text-white hover:opacity-90 from-purple-500 to-pink-500 py-3 rounded-lg transition-all duration-200"
            >
              Sign Up
            </button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>
              Already have an account?{" "}
              <Link to={"/sign-in"} className="text-blue-500 hover:underline">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
