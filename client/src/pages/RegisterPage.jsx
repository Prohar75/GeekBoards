import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in.");
    } catch (err) {
      alert("Registration failed, please try again later.");
    }
  }
  return (
    <div className="mt-8 grow flex items-center justify-around">
      <div className="-mt-32">
        <h1 className="text-4xl font-bold text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
          {/*<input type="password" placeholder="confirm the password" />*/}
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?
            <Link to={"/login"} className="underline text-black ml-1">
              Login now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
