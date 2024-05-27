import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import Loading from "../components/Loading/Loading"
import { Navigate } from "react-router-dom"

const AuthMiddleware = ({ children }) => {
  const { isLoading, user } = useContext(UserContext)

  if (isLoading) return <Loading />

  if (!user) return <Navigate to={"/login"} />

  return children
}

export default AuthMiddleware