import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./modules/auth/LoginPage";
import NotFoundPage from "./modules/errors/NotFoundPage";
import HomePage from "./modules/home/HomePage";
import ProductsPage from "./modules/products/ProductsPage";
import UsersPage from "./modules/users/UsersPage";

const Wrapper = styled(Box)(
  () => `
  background-color: #ffffff;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  border-width: 0px;
  
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
`
);

const App = () => {
  return (
    <Wrapper>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </Wrapper>
  );
};

export default App;
