import { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // toggle login/signup
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-20 bg-white rounded shadow">
      <h2 className="text-xl mb-4 text-center">
        {isLogin ? "Login" : "Create Account"}
      </h2>
      <input
        className="block w-full p-2 mb-2 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="block w-full p-2 mb-2 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-400"
        onClick={handleSubmit}
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
      <button
        className="text-sm text-teal-500 mt-2 underline"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Don't have an account? Sign up" : "Have an account? Login"}
      </button>
    </div>
  );
};

export default Login;
