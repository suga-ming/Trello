import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDo from "./ToDo";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToDo />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
