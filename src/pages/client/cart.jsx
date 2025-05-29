import { TbTrash } from "react-icons/tb";
import { addToCart, getCart, removeFromCart } from "../../utils/cart"
import { useEffect, useState } from "react";

export default function CartPage(){

    const [cartLoaded , setCartLoaded] = useState(false);
    const [cart , setCart] = useState([]);
    useEffect(
        ()=>{
            if(cartLoaded == false){
                const cart = getCart()
                setCart(cart)
                setCartLoaded(true)
            }
        },
        [cartLoaded]
    )

    return(
        <div className="w-full h-full flex justify-center p-[40px]">
            <div className="w-[700px]">
                {
                    cart.map(
                        (item , index)=>{
                            return(

                                <div key={index} className="w-full h-[100px] my-[10px] bg-white shadow-2xl rounded-lg flex justify-between items-center relative">
                                    <button className="w-[40px] h-[40px] text-white text-2xl bg-red-500 rounded-full flex justify-center items-center shadow cursor-pointer absolute right-[-60px]" 
                                    onClick={
                                        ()=>{
                                            removeFromCart(item.productId)
                                            setCartLoaded(false)
                                        }
                                    }>
                                        <TbTrash/>
                                    </button>
                                    <img src={item.image} className="h-full aspect-square object-cover"/>
                                    <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                        <h1 className="text-xl font-bold">{item.name}</h1>
                                        <h1 className="text-lg text-gray-500">{item.altNames.join(" | ")}</h1>
                                        <h1 className="text-lg text-gray-500">LKR: {item.price.toFixed(2)}</h1>
                                    </div> 
                                    <div className="h-full w-[100px] flex justify-center items-center">
                                        <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                        onClick={
                                            ()=>{
                                                addToCart(item,-1)
                                                setCartLoaded(false)
                                            }
                                        }>-</button>
                                        <h1 className="text-xl font-bold">{item.quantity}</h1>
                                        <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                        onClick={
                                            ()=>{
                                                addToCart(item,1)
                                                setCartLoaded(false)
                                            }
                                        }>+</button>
                                    </div>
                                    <div className="h-full w-[100px] flex justify-center items-center">
                                        <h1 className="text-xl">{(item.price*item.quantity).toFixed(2)}</h1>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}