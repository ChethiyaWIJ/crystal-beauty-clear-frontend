import axios from "axios"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import toast from "react-hot-toast";
import Loader from "../../compoenents/loader";

export default function AdminProductsPage() {
    
    const [products, setProducts] = useState([])
    const[loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(
        ()=>{
            if(!loaded){
                    axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                    (response)=>{
                        console.log(response.data)
                        setProducts(response.data)
                        setLoaded(true)
                    }
                ).catch(
                    (error)=>{
                        console.log("Error fetcing products",error.response.data)
                    }
                )
            }
            
        },
        [loaded]
    )

    async function deleteProduct(id) {
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Login first to delete a product")
            return
        }
    
        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+ id, {
                headers:{
                        Authorization : "Bearer "+token
                }
            })
            setLoaded(false)
            toast.success("Product deleted successfully")
        }catch(err){
            console.log(err)
            toast.error("Error deleting product")
            return
        }
    }
      
    return(
        <div className="w-full h-full rounded-lg relative">
            <Link to={"/admin/addProduct"} className="text-white bg-gray-700 cursor-pointer p-[8px] text-3xl rounded-full hover:bg-gray-300 hover:text-gray-700 absolute right-5 bottom-5">
                <FaPlus />
            </Link>
            {loaded&&<table className="w-full">
                        <thead>
                            <tr className="border-b-2  border-gray-300">
                                <th className="p-2">Product ID</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Labled Price</th>
                                <th className="p-2">Stock</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(
                                    (product, index)=>{
                                        return(
                                            <tr key={index} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-200">
                                                <td className="p-2">{product.productId}</td>
                                                <td className="p-2">{product.productName}</td>
                                                <td className="p-2">{product.price}</td>
                                                <td className="p-2">{product.labledPrice}</td>
                                                <td className="p-2">{product.stock}</td>
                                                <td className="p-2">
                                                    <div className="w-full h-full flex justify-center">
                                                        <FaRegTrashAlt onClick={()=>{
                                                            deleteProduct(product.productId)
                                                        }} className="text-[25px] m-2 hover:text-red-500"/>
                                                        <GrEdit onClick={
                                                            ()=>{
                                                                navigate("/admin/editProduct",{
                                                                    state : product
                                                                })
                                                            }
                                                        } className="text-[25px] m-2 hover:text-blue-500"/>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                            
                        </tbody>
                </table>}
                {
                    !loaded&&<Loader/>
                }
           
        </div>
    )
}

// Supabase project URL
//https://imobvubphexabqkzguud.supabase.co

//anon public key
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb2J2dWJwaGV4YWJxa3pndXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODM0MjIsImV4cCI6MjA2MzQ1OTQyMn0.0tg_SwrLoD0udjYM0BSlkjH2S5wXvsaTxKVuied-06c