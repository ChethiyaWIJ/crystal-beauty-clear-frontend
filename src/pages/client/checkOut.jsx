import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";

export default function CheckOutPage(){

    let navigate = useNavigate();
    const location = useLocation();
    const [cart , setCart] = useState(location.state.items)
    const [cartRefresh, setCartRefresh] = useState(false)
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    function getTotal(){
        let total = 0;
        cart.forEach((item)=>{
            total += item.price * item.quantity
        })
        return total;
    }

    function getTotalForLabledPrice(){
        let total = 0;
        cart.forEach((item)=>{
            total += item.labledPrice *  item.quantity
        }) 
        return total;
    }

    function placeOrder(){
        const orderData = {
            name : name,
            address : address,
            phoneNumber : phoneNumber,
            billItems : []
        }

        for(let i = 0; i < cart.length; i++){
            orderData.billItems[i] = {
                productId : cart[i].productId,
                quantity : cart[i].quantity
            }
        }

        const token = localStorage.getItem("token");
        axios.post(import.meta.env.VITE_BACKEND_URL+ "/api/order", orderData, {
            headers : {
                Authorization  : "Bearer " + token
            },
        }).then(
            ()=>{
                toast.success("Order placed succesfully")
                navigate("/")
            }
        ).catch(
            (err)=>{
                console.log(err)
                toast.error("Order placement failed")
            }
        )
    }

    return(
        <div className="w-full h-full flex justify-center p-[40px]">
            <div className="w-[700px]">
                    {
                        (cart.length === 0) ? (
                            <div className="w-full h-full flex flex-col mt-[40px] items-center">
                                <p className="text-4xl font-bold text-pink-500 m-2">There are no items in the cart.</p>
                                <BsCart4 className="text-5xl font-bold text-pink-500 m-2"/>
                                <button className=" w-[100px] h-[40px] text-white font-bold border-2 border-pink-500 bg-pink-500 rounded-lg shadow-2xl m-2 cursor-pointer hover:bg-white hover:text-pink-500" onClick={
                                    ()=>{
                                        navigate("/products")
                                    }
                                }>Products</button>
                            </div>
                        ) :(
                        cart.map(
                            (item , index)=>{
                                return(

                                    <div key={index} className="w-full h-[120px] my-[10px] bg-white shadow-2xl rounded-lg flex justify-between items-center relative">
                                        <button className="w-[40px] h-[40px] text-white text-2xl bg-red-500 rounded-full flex justify-center items-center shadow cursor-pointer absolute right-[-60px]" 
                                        onClick={
                                            ()=>{
                                                const newCart = cart.filter((product) => product.productId !== item.productId)
                                                setCart(newCart)
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
                                                    const newCart = cart
                                                    newCart[index].quantity -= 1
                                                    if(newCart[index].quantity <= 0) newCart[index].quantity = 1
                                                    setCart(newCart)
                                                    setCartRefresh(!cartRefresh)
                                                }
                                            }>-</button>
                                            <h1 className="text-xl font-bold">{item.quantity}</h1>
                                            <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                            onClick={
                                                ()=>{
                                                    const newCart  = cart
                                                    newCart[index].quantity += 1
                                                    setCart(newCart)
                                                    setCartRefresh(!cartRefresh)
                                                }
                                            }>+</button>
                                        </div>
                                        <div className="h-full w-[100px] flex justify-center items-center">
                                            <h1 className="text-xl w-full text-end pr-2">{(item.price*item.quantity).toFixed(2)}</h1>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    )}
                    <div className="w-full flex justify-end">
                        <h1 className="w-[120px] text-xl text-end pr-2">Total</h1>
                        <h1 className="w-[120px] text-xl text-end pr-2">{getTotalForLabledPrice().toFixed(2)}</h1>
                    </div>
                    <div className="w-full flex justify-end">
                        <h1 className="w-[120px] text-xl text-end pr-2">Discount</h1>
                        <h1 className="w-[120px] text-xl text-end border-b-[2px] pr-2">{(getTotalForLabledPrice()-getTotal()).toFixed(2)}</h1>
                    </div>
                    <div className="w-full flex justify-end">
                        <h1 className="w-[120px] text-xl text-end pr-2">Net total</h1>
                        <h1 className="w-[120px] text-xl text-end pr-2 border-b-[5px] border-double">{getTotal().toFixed(2)}</h1>
                    </div>
                    <div className="w-full my-[5px] p-[4px]">
                        <input type="text" value={name} placeholder="Name" onChange={(e)=>setName(e.target.value)}
                        className="w-full h-[40px] border-2 border-gray-500 rounded-lg my-[4px] p-1"/>
                        <input type="text" value={address} placeholder="Address" onChange={(e)=>setAddress(e.target.value)}
                        className="w-full h-[40px] border-2 border-gray-500 rounded-lg my-[4px] p-1"/>
                        <input type="tel" value={phoneNumber} placeholder="Phone Number" onChange={(e)=>setPhoneNumber(e.target.value)}
                        className="w-full h-[40px] border-2 border-gray-500 rounded-lg my-[4px] p-1"/>
                    </div>
                    <div className="w-full flex justify-center mt-4">
                        <button className="w-[100px] h-[30px] bg-pink-500 border border-pink-500 text-center text-white font-bold rounded-lg cursor-pointer hover:bg-white hover:text-pink-500"
                        onClick={
                            ()=>{
                               placeOrder()
                            }
                        }
                        >Place Order</button>
                    </div>
                    
            </div>
        </div>
    )
}