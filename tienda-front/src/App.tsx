import { Routes, Route } from "react-router-dom";

import LoginPage from "./modules/auth/LoginPage";
import NotFoundPage from "./modules/errors/NotFoundPage";
import HomePage from "./modules/home/HomePage";
import ProductsPage from "./modules/products/ProductsPage";
import UsersPage from "./modules/users/UsersPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="login" element={<LoginPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
