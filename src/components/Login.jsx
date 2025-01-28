import { FaGoogle } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import useAuth from "../context/useAuth";
import Swal from 'sweetalert2'

const Login = () => {
 
    const [message, setMessage] = useState("")
    const {loginUser, signinWithGoogle} = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm() 

    const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password);
            let timerInterval;
            Swal.fire({
            title: "User LogedIn Successfully!",
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the Time");
            }
            });
            navigate("/")
        } catch (error) {
            setMessage("Please provide a Valid Email")
            console.error(error)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signinWithGoogle();
            let timerInterval;
            Swal.fire({
            title: "User registered Successfully!",
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the Time");
            }
            });
            navigate("/")
        } catch (error) {            
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Google SignIn Failed",
                showConfirmButton: false,
                timer: 1500
              });
            console.error(error)
        }
    }
    
    return (
    <div className='h-[calc(100vh-120px)] flex items-center justify-center'>
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className='text-xl font-semibold mb-4'>Please Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>
                    <input
                        {...register("email", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email Address"
                    
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        {...register("password", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                    />
                </div>

                {
                    message && <p className="text-red-500 text-xs italic mb-3">{message}</p> 
                }
                    
                <div className="flex flex-wrap space-y-2.5 items-center justify-between">
                    <button
                        className="bg-blue-950 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
            <p className="inline-block align-baseline font-medium mt-4 text-sm">
                Haven't an account? Please
                <Link to="/register" className='text-blue-900 hover:text-black'> Register</Link>
            </p>
            <div className="mt-4">
                <button
                    className="w-full flex flex-wrap gap-1 items-center justify-center bg-blue-950 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleGoogleSignIn}
                >
                    <FaGoogle className="mr-2" />
                    Sign in with Google
                </button>
            </div>
            <p className="mt-5 text-center text-gray-500 text-xs">
                &copy; {new Date().getFullYear()} Login Form. All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default Login