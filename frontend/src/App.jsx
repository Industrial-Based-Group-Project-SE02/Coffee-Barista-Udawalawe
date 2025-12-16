import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Menu from "./Pages/Menu.jsx";
import Home from "./Pages/Home.jsx";
import Contact from "./Pages/Contact.jsx";
import PublicLayout from "./layout/publicLayout.jsx";
import About from "./Pages/About.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Registration.jsx";
import CartPage from "./Pages/CartPage.jsx";




function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       <Route path="/cart" element={<CartPage />} />

      </Route>
    </Routes>
  );
}

export default App;
