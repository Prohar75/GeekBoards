import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductsFormPage from "./pages/ProductsFormPage.jsx";

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  const [count, setCount] = useState(0);
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account/" element={<ProfilePage />} />
        <Route path="/account/bookings" element={<ProductsPage />} />
        <Route path="/account/bookings/new" element={<ProductsFormPage />} />
        <Route path="/account/bookings/:id" element={<ProductsFormPage />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
