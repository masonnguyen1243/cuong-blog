import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "~/utils/validatos";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SignInUser } from "~/store/slice/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import OAuth from "~/components/auth/OAuth";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSignup = (data) => {
    const { email, password } = data;

    toast
      .promise(dispatch(SignInUser({ email, password })), {
        pending: "Loading",
      })
      .then((res) => {
        if (!res.error) {
          navigate("/");
          toast.success("Logged in successfully!");
          reset();
        }
      });
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
            Please sign in to enjoy our services! You can sign up with email and
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

            <div className="relative">
              <label htmlFor="password">Password</label>
              <input
                type={isShowPassword ? "text" : "password"}
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
              <div
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-4 cursor-pointer select-none top-[50%] translate-y-[50%]"
              >
                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
              <FieldErrorAlert errors={errors} fieldName={"password"} />
            </div>

            <button
              type="submit"
              className="cursor-pointer outline-none w-full bg-gradient-to-r text-white hover:opacity-90 from-purple-500 to-pink-500 py-3 rounded-lg transition-all duration-200"
            >
              Sign In
            </button>
            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>
              Don't have an account?{" "}
              <Link to={"/sign-up"} className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </span>
          </div>

          <div className="flex gap-2 text-sm mt-3 justify-center">
            <span>
              <Link to={"/"} className="text-blue-500 hover:underline">
                &#60; Go home
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
