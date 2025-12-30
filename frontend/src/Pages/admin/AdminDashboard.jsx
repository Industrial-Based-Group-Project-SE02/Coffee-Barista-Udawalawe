import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import {
  DollarSign,
  ShoppingCart,
  ClipboardList,
  Boxes,
  Users,
  Briefcase,
  PlusSquare,
  FileText
} from "lucide-react"

export default function AdminDashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("userRole")

    if (!token || role !== "admin") {
      navigate("/login")
    }
  }, [navigate])

  const modules = [
    {
      title: "Salary Management",
      icon: <DollarSign size={42} />,
      //path: "/admin/salary-management"
    },
    {
      title: "POS",
      icon: <ShoppingCart size={42} />,
      // path: "/admin/pos"
    },
    {
      title: "Attendance",
      icon: <ClipboardList size={42} />,
      path: "/admin/attendance"
    },
    {
      title: "Inventory",
      icon: <Boxes size={42} />,
     // path: "/admin/inventory-management"
    },
    {
      title: "Management",
      icon: <Users size={42} />,
      // path: "/admin/management"
    },
    {
      title: "HR",
      icon: <Briefcase size={42} />,
      //path: "/admin/HR-management"
    },
    {
      title: "Add Item",
      icon: <PlusSquare size={42} />,
      //path: "/admin/add-item"
    },
    {
      title: "Blog",
      icon: <FileText size={42} />,
       path: "/admin/AdminBlogManager"
    },

    {
      title: "Feedbacks",
      icon: <FileText size={42} />,
       path: "/admin/AdminFeedbackManager"
    }

  
  ]

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/images/coffee-admin-bg.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Center container */}
      <div className="relative z-10 w-[90%] max-w-6xl rounded-3xl bg-stone-900/80 backdrop-blur-xl p-12 shadow-2xl">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-amber-400 mb-12 tracking-wide">
          Admin Dashboard
        </h1>

        {/* Dashboard buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {modules.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="
                cursor-pointer
                rounded-2xl
                bg-gradient-to-br from-amber-500 to-orange-600
                p-10
                text-center
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-4
                hover:scale-110
                hover:shadow-amber-500/40
                active:scale-95
              "
            >
              <div className="flex justify-center mb-5">
                {item.icon}
              </div>
              <div className="text-xl font-bold tracking-wide">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
