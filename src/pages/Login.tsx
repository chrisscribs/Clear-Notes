import { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import clearnotesLogo from "../assets/clearnotes_logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // toggle login/signup
  const [error, setError] = useState("");

  const provider = new GoogleAuthProvider();

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

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full min-h-screen bg-green-500">
      <div className="py-4 px-12 w-full max-w-md mx-auto bg-white rounded-lg shadow">
        <img
          src={clearnotesLogo}
          alt="clearnotesLogo"
          width={80}
          className="block mx-auto mb-4"
        />
        <h2 className="text-xl mb-4 text-center">
          {isLogin ? "Login" : "Create Account"}
        </h2>
        <input
          className="block w-full p-2 mb-4 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="block w-full p-2 mb-4 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-200"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-green-600 text-white px-4 py-2 mb-2 rounded w-full hover:bg-green-400"
          onClick={handleSubmit}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <button
          className="text-sm text-teal-500 mb-4 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Have an account? Login"}
        </button>
        <button
          className="bg-white border mb-4 text-gray-700 px-4 py-2 rounded w-full flex items-center justify-center gap-2 mt-2 shadow hover:bg-gray-50"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
