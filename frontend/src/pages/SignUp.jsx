import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterUserMutation } from "../redux/usersApiSlice";
import { setCredentials } from "../redux/authSlice";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data).unwrap();
      dispatch(setCredentials({ ...res }));
      toast(res.message);
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "opps failed to register.";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[90vh] mt-6 p-6 bg-gray-900 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="p-6 bg-gray-900 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl text-center text-white font-semibold mb-4">
          Sign Up Here
        </h2>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-white">Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required..",
              })}
              placeholder="Enter your name.."
              className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required..",
                validate: (value) => {
                  if (!value.includes("@")) {
                    return "Email must include @";
                  }
                },
              })}
              placeholder="Enter your email.."
              className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required..",
                minLength: {
                  value: 8,
                  message: "Password must be 8 characters long..",
                },
              })}
              className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
            />
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md"
          >
            {isSubmitting || isLoading ? "Registering...." : "SignUp"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white">Already have an account?</p>
          <Link
            to="/login"
            className="text-blue-400 hover:underline mt-2 inline-block"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
