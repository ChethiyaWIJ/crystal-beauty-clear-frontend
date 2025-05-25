import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";

export default function ProductsPageTest() {

    const [products, setProducts] = useState([]);
    const[loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

useEffect(
    ()=>{
        if(!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                (response)=>{
                    setProducts(response.data)
                    setLoaded(true)
                }
            ).catch(
                (err)=>{
                    toast.error("Error fetching products")
                    console.log("Error",err)
                }
            )
        }
    },
    [loaded]
)

    return(
        <div className="w-full h-full rounded-lg relative">
            <Link to={"/admin/addProduct"} className="text-white text-3xl bg-gray-500 rounded-full p-[8px] cursor-pointer hover:bg-gray-200 hover:text-gray-600 absolute right-5 bottom-5">
                <FaPlus />
            </Link>
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-gray-300">
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
                            (product,index)=>{
                                return(
                                    <tr key={index} className="border-b-2 border-gray-300 text-center">
                                        <td className="p-2">{product.productId}</td>
                                        <td className="p-2">{product.productName}</td>
                                        <td className="p-2">{product.price}</td>
                                        <td className="p-2">{product.labledPrice}</td>
                                        <td className="p-2">{product.stock}</td>
                                        <td className="p-2">
                                            <div className="flex items-center justify-center ">
                                                <FaRegTrashAlt className="text-[25px] m-2 hover:text-red-500"/>
                                                <GrEdit onClick={()=>{
                                                    navigate("/admin/editProduct",
                                                        {
                                                            state : product
                                                        }
                                                    )
                                                }}className="text-[25px] m-2 hover:text-blue-500"/>
                                            </div>
                                        </td>
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