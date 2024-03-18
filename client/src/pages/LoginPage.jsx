import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function handleLoginSubmit(ev){
    ev.preventDefault();
    try{
      axios.post('/login',{email,password});
      alert("login succesful");
      setRedirect(true);
    }catch(err){
      alert("Something went wrong.");
    }
  }

  if(redirect){
    return <Navigate to= {"/"} />
  }
  return (
    <div className="mt-8 grow flex items-center justify-around">
      <div className="-mt-32">
        <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link to={"/register"} className="underline text-black ml-1">
              Register now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
