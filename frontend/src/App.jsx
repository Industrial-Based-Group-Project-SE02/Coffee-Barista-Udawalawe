import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Menu from "./Pages/Menu.jsx";
import Home from "./Pages/Home.jsx";
import Contact from "./Pages/Contact.jsx";
import About from "./Pages/About.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Registration.jsx";
import CartPage from "./Pages/CartPage.jsx";

import CustomerDash from "./Pages/Customer/CustomerDash.jsx";
import EditProfile from "./Pages/Customer/editProfile.jsx";
import Reservation from "./Pages/Customer/reservation.jsx";

import CustomerLayout from "./layout/CustomerLayout.jsx";
import PublicLayout from "./layout/publicLayout.jsx";

function App() {
  return (
    <>
      {/* 🔔 Global Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#10b981",
            color: "#ffffff",
            fontWeight: "500",
          },
          success: {
            style: {
              background: "#10b981",
            },
          },
          error: {
            style: {
              background: "#ef4444",
            },
          },
        }}
      />

      {/* 🌐 Routes */}
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

        <Route element={<CustomerLayout />}>
          <Route path="/customer-dashboard" element={<CustomerDash />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/reservation" element={<Reservation />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
