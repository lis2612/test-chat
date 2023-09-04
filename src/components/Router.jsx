import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Home />}
          path="/"
        />

        <Route
          element={<Login />}
          path="/login"
        />

        <Route
          element={<div>Page not found</div>}
          path="*"
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
