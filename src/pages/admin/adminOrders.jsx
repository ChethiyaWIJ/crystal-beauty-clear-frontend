    import { useEffect, useState } from "react"
    import axios from "axios"
    import toast from "react-hot-toast"
    import Loader from "../../compoenents/loader"
    import { IoClose } from "react-icons/io5";

    export default function AdminOrdersPage(){

        const [orders, setOrders] = useState([])
        const [loaded, setLoaded] = useState(false)
        const [isModelLoaded, setIsModelLoaded] = useState(false)
        const [displayingOrder, setDisplayingOrder] = useState(null)

        useEffect(
            ()=>{
                if(loaded == false){

                    const token = localStorage.getItem("token")
                    axios.get(import.meta.env.VITE_BACKEND_URL+"/api/order", {
                        headers : {
                            Authorization : "Bearer " + token
                        }
                    }).then(
                        (response)=>{
                            console.log(response)
                            setOrders(response.data)
                            setLoaded(true)
                        }
                    )
                }
            },
            [loaded]
        )

        function changeOrderStatus(orderId, status){
            const token = localStorage.getItem("token")
            axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId, {
                status : status
            },{
                headers : {
                    Authorization : "Bearer " + token
                }
            }).then(
                (res)=>{
                    toast.success("Order status updated succesfully")
                    setLoaded(false)
                }
            ).catch(
                (err)=>{

                }
            )
        }

        return(
            <div className ="w-full h-full">
                {   
                    loaded ? (
                    <div className="w-full h-full">
                        <table className="w-full"> 
                            <thead>
                                <tr className="border-b-2  border-gray-300">
                                    <th>Order Id</th>
                                    <th>Customer Email</th>
                                    <th>Customer Name</th>
                                    <th>Adderss</th>
                                    <th>Phone Number</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    orders.map(
                                        (order)=>{
                                            return(
                                                <tr key={order.orderId}
                                                className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-200">
                                                    <td className="p-2">{order.orderId}</td>
                                                    <td className="p-2">{order.name}</td>
                                                    <td className="p-2">{order.email}</td>
                                                    <td className="p-2">{order.address}</td>
                                                    <td className="p-2">{order.phoneNumber}</td>
                                                    <td className="p-2">
                                                        <select value={order.status} onChange={(e)=>{changeOrderStatus(order.orderId,e.target.value)}}>
                                                            <option value={"Pending"}>Pending</option>
                                                            <option value={"Deliverred"}>Delivered</option>
                                                            <option value={"Canceled"}>Canceled</option>
                                                            <option value={"Processing"}>Processing</option>
                                                        </select>
                                                    </td>
                                                    <td className="p-2">{order.total.toFixed(2)}</td>
                                                    <td className="p-2">{new Date(order.date).toDateString()}</td>
                                                    <td className="p-2">
                                                        <button className="w-[100px] h-[30px] bg-blue-500 text-white font-bold shadow-2xl rounded-lg cursor-pointer"
                                                            onClick={
                                                                ()=>{
                                                                    setIsModelLoaded(true)
                                                                    setDisplayingOrder(order)
                                                                }
                                                            }
                                                        >Details</button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                            </tbody>  
                        </table>
                        {
                            isModelLoaded && 
                            <div className="fixed bg-[#00000070] w-full h-full top-0 left-0 flex justify-center items-center">
                                <div className="w-[600px] h-[600px] bg-white relative">
                                    <div className="w-full h-[150px]">
                                        <h1 className="text-sm font-bold p-2">Order Id : {displayingOrder.orderId}</h1>
                                        <h1 className="text-sm font-bold p-2">Order Date : {new Date(displayingOrder.date).toDateString()} </h1>
                                        <h1 className="text-sm font-bold p-2">Order Status : {displayingOrder.status}</h1>
                                        <h1 className="text-sm font-bold p-2">Order Total : {displayingOrder.total.toFixed(2)}</h1>
                                    </div>
                                    <div className="w-full h-[450px] max-h-[450px] overflow-y-scroll">
                                        {
                                            displayingOrder.billItems.map(
                                                (item, index)=>{
                                                    return(
                                                        <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative">
                                                            <img src={item.image} className="h-full aspect-square object-cover"/>
                                                            <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                                                <h1 className="text-xl font-bold">{item.productName}</h1>
                                                                <h1 className="text-lg text-gray-500">LKR : {item.price.toFixed(2)}</h1>
                                                                <h1 className="text-lg text-gray-500">Quantity : {item.quantity}</h1>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                    <button className="w-[40px] h-[40px] bg-white shadow shadow-black rounded-full flex justify-center items-center absolute top-[-20px] right-[-20px] cursor-pointer"
                                    onClick={
                                        ()=>{
                                            setIsModelLoaded(false)
                                        }
                                    }
                                    >
                                        <IoClose />
                                    </button>
                                </div>
                            </div>
                        } 
                    </div>
                    ):(
                    <Loader/>
                    )
                }
            </div>
        )
    }
