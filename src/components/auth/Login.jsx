import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../store/authContext";
import { useEffect } from "react";
import toast from 'react-hot-toast';

const Login = () => {
  const { login,authState } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  

  const onLogin = async (data) => {
    const { username, password } = data;
    try {
      // const response = await fetch('http://localhost:4000/v2/auth/login', {
      const response = await fetch('https://v2contestinfo.onrender.com/v2/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const res = await response.json();

      if (!res.error) {
        login(res.token, res.username, res.role);
        navigate('/super');
      } else {
        console.error(res);
        toast.error(res.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onLogin)}
        className="p-6 max-w-md mx-auto border rounded-md mt-6 shadow-md"
      >
        <h1 className="text-2xl font-semibold text-blue-700 text-center mb-3">Login</h1>
        <div>
          <label htmlFor="username" className="labelText">Username</label>
          <input
            type="text"
            id="username"
            {...register("username")}
            className="w-full bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition duration-300 ease-in-out mb-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="labelText">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full bg-white border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition duration-300 ease-in-out mb-2"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;