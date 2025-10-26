import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../lib/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

type LoginForm = {
  email: string;
  password: string;
  name: string
};

export default function Signup() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await api.post("/auth/signup", data); // Replace with your backend login endpoint
      toast("Sign up successful!");
      navigate('/login')
    } catch (err) {
      console.error(err);
      toast(err.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 text-start">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    {...register("name", { required: "Name is required" })}
            placeholder="Enter Your Name"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 text-start">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email" {...register("email", { required: "Email is required" })}
            placeholder="Enter Your Email"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 text-start">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    placeholder="Enter Your Email"
            type="password"
            {...register("password", { required: "Password is required" })}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit" disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isSubmitting ? "Logging in..." : "Sign in"}
                </button>
              </div>
            </form>

            
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Singup
            </Link>
          </p>
        </div>
      </div>
    
  );
}
