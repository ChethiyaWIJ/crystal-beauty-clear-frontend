import axios from "axios"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {
    
    const [products, setProducts] = useState([])
    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                (response)=>{
                    console.log(response.data)
                    setProducts(response.data)
                }
            ).catch(
                (error)=>{
                    console.log("Error fetcing products",error.response.data)
                }
            )
        },
        []
    )
      
    return(
        <div className="w-full h-full rounded-lg relative">
            <Link to={"/admin/addProduct"} className="text-white bg-gray-700 cursor-pointer p-[8px] text-3xl rounded-full hover:bg-gray-300 hover:text-gray-700 absolute right-5 bottom-5">
                <FaPlus />
            </Link>
            <table className="w-full">
                        <thead>
                            <tr className="border-b-2  border-gray-300">
                                <th className="p-2">Product ID</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Labled Price</th>
                                <th className="p-2">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(
                                    (product, index)=>{
                                        console.log("Mapping "+ product.productId+" "+index)
                                        return(
                                            <tr className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-500 hover:text-white">
                                                <td className="p-2">{product.productId}</td>
                                                <td className="p-2">{product.productName}</td>
                                                <td className="p-2">{product.price}</td>
                                                <td className="p-2">{product.labledPrice}</td>
                                                <td className="p-2">{product.stock}</td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                            
                        </tbody>
                </table>
           
        </div>
    )
}

// Sperbase project URL
//https://imobvubphexabqkzguud.supabase.co

//anon public key
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb2J2dWJwaGV4YWJxa3pndXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODM0MjIsImV4cCI6MjA2MzQ1OTQyMn0.0tg_SwrLoD0udjYM0BSlkjH2S5wXvsaTxKVuied-06c