import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    function handleRegister() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        const userData = {
            email,
            firstName,
            lastName,
            password,
        }
        if (phone){
            userData.phone = phone
        }

        setLoading(true)

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user", userData)
            .then((response) => {
                toast.success("Registration successful")
                navigate("/login")
            })
            .catch((error) => {
                console.log("Registration failed", error?.response?.data)
                toast.error(error?.response?.data?.message || "Registration failed")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="w-full h-screen bg-[url(/register-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] min-h-[750px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">
                    <input onChange={e => setFirstName(e.target.value)} className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="text" placeholder="First Name" />
                    <input onChange={e => setLastName(e.target.value)} className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="text" placeholder="Last Name" />
                    <input onChange={e => setEmail(e.target.value)} className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="email" placeholder="Email address" />
                    <input onChange={e => setPhone(e.target.value)} className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="tel" placeholder="Phone (optional)" />
                    <input onChange={e => setPassword(e.target.value)} className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="password" placeholder="Password" />
                    <input onChange={e => setConfirmPassword(e.target.value)} className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="password" placeholder="Confirm Password" />
                    <button onClick={handleRegister} className="w-[400px] h-[50px] text-white bg-green-400 rounded-xl m-[5px] cursor-pointer">
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <p className="text-white font-bold">
                        Already have an account?
                        &nbsp;
                        <span className="text-green-500 font-bold hover:text-green-600">
                            <Link to={"/login"}>Login</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}
