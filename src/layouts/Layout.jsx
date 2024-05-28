import React from "react"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router-dom"
import AuthMiddleware from "../middlewares/AuthMiddleware"






const Layout = () => {
  return (
   
      <AuthMiddleware>
       
        <Navbar />
        <Outlet />
        <Footer />
       
      </AuthMiddleware>
  



  )
}

export default Layout
