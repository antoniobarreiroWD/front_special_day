import React from "react"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router-dom"
import AuthMiddleware from "../middlewares/AuthMiddleware"
import ContentWrapper from "../components/ContentWrapper/ContentWrapper"






const Layout = () => {
  return (
   
      <AuthMiddleware>
      <ContentWrapper>
        <Navbar />
        <Outlet />
        <Footer />
      </ContentWrapper>
      </AuthMiddleware>
       
       
  



  )
}

export default Layout
