import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import Loader from "../../compoenents/loader";
import ImageSlider from "../../compoenents/imageSlider";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverview(){
    
const params = useParams();

 if(params.id == null){
    window.location.href = "/products";
 }

 const[product, setProduct] = useState(null);
 const[status, setStatus] = useState("loading"); // loaded, error

 useEffect(
    ()=>{
        if(status == "loading"){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id).then(
                (res)=>{
                    //console.log(res)
                    setProduct(res.data.product)
                    setStatus("loaded")
                }
            ).catch(
                ()=>{
                    toast.error("Product is not available")
                    setStatus("error")
                }
            )
        }
    },
    [status]
 )

    return(
        <div className="w-full h-full">
            {
                status == "loading"&&<Loader/>
            }
            {
                status == "loaded"&&
                    <div className="w-full h-full flex">
                        <div className="w-[50%] h-full">
                            <ImageSlider images={product.images}/>
                        </div>
                        <div className="w-[50%] h-full p-[60px]">
                            <h1 className="text-3xl text-center font-bold mb-[40px]">{product.productName}{" | "}<span className="text-3xl text-center font-semibold text-gray-500">{product.altNames.join(" | ")}</span></h1>
                            <div className="w-full flex justify-center mb-[40px]">
                                {
                                    product.labledPrice > product.price ? 
                                    <>
                                        <h2 className="text-lg font-semibold mr-[20px]"><span>LKR: </span>{product.price.toFixed(2)}</h2>
                                        <h2 className="text-lg line-through text-gray-500"><span>LKR: </span>{product.labledPrice.toFixed(2)}</h2>
                                    </> :
                                        <h2><span>LKR: </span>{product.price}</h2>
                                }
                            </div>
                            <p className="text-center text-gray-500 mb-[40px]">{product.description}</p>

                            <div className="w-full flex justify-center mb-[40px]">
                                <button  className="w-[200px] h-[50px] bg-pink-500 border border-pink-500 text-white text-center font-bold rounded-lg cursor-pointer hover:bg-white hover:text-pink-500 mx-5 " onClick={
                                    ()=>{
                                        addToCart(product, 1)
                                        toast.success("Product added to cart")
                                        console.log(getCart())
                                    }}>
                                    Add to Cart
                                </button>
                                <button className="w-[200px] h-[50px] bg-pink-500 border border-pink-500 text-white text-center font-bold rounded-lg cursor-pointer hover:bg-white hover:text-pink-500 mx-5 ">
                                    Buy now
                                </button>
                            </div>
                        </div>
                    </div>
            }
            {
                status == "error"&&
                    <div>
                        Error !
                    </div>

            }
        </div>
    )
}