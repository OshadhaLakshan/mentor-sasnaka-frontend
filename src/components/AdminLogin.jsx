import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from "axios"
import getBaseUrl from "../utils/baseURL"

const AdminLogin = () => {

  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/admin/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });      

      const { token } = response.data
      if (token) {
        localStorage.setItem('token', token)
        
        // Handle token expiration
        setTimeout(() => {
          localStorage.removeItem('token')
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Admin Token Expired",
            showConfirmButton: false,
            timer: 1500
          })
          navigate("/")
        }, 3600 * 1000)  // Token expiration time (1 hour)

        // Show login success message
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Admin Login Successful",
          showConfirmButton: false,
          timer: 1500
        })

        navigate("/dashboard") // Navigate to dashboard after successful login
      }
    } catch (error) {
      setMessage("Invalid Admin Credentials")
      console.error(error)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-semibold text-center mb-10">Admin Dashboard Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="email">
              Admin Email
            </label>
            <input
              {...register("email", { required: "Admin Email is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email.message}</p>
            )}
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="password">
              Admin Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password.message}</p>
            )}
          </div>

          {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}

          <div className="flex flex-wrap space-y-2.5 items-center justify-center">
            <button
              className="bg-blue-950 hover:bg-black text-white text-lg w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login as Administrator
            </button>
          </div>

          <p className="mt-8 text-center text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Admin Login. All rights reserved.
          </p>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
