import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="mt-8 grow flex items-center justify-around">
      <div className="-mt-32">
        <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link to={"/register"} className="underline text-black">Register now!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
