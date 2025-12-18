import { Routes, Route, Navigate } from "react-router-dom";
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

import CustomerLayout from "./layout/CustomerLayout.jsx";
import PublicLayout from "./layout/publicLayout.jsx";

import Blog from "./Pages/Blog.jsx";
import BlogArticle from "./Pages/BlogArticle.jsx";


// Import admin components
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import BlogAdmin from "./Pages/Admin/AdminBlogManager.jsx";
import AdminFeedbackManager from "./Pages/Admin/AdminFeedbackManager.jsx";
import AdminLogin from "./Pages/AdminLogin";

function App() {

  // Simple admin check (for demo - in real app, use proper auth)
  const isAdmin = () => {
    // For testing, you can temporarily hardcode return true
    return localStorage.getItem('adminToken') || 
           localStorage.getItem('userRole') === 'admin' ||
           true; // Remove this in production
  };

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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          
        </Route>

         <Route 
          path="/admin" 
          element={isAdmin() ? <AdminLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="blog" element={<BlogAdmin />} />
          <Route path="blog/create" element={<BlogAdmin />} />
          <Route path="feedback" element={<AdminFeedbackManager />} />
          <Route path="feedback/all" element={<AdminFeedbackManager mode="all" />} />
          <Route path="feedback/visible" element={<AdminFeedbackManager mode="visible" />} />
          <Route path="feedback/hidden" element={<AdminFeedbackManager mode="hidden" />} />
          {/* Add more admin routes as needed */}
        </Route>

        <Route element={<CustomerLayout />}>
          <Route path="/customer-dashboard" element={<CustomerDash />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
