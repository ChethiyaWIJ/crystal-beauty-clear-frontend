import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import mediaUpload from "../../utils/mediaUpload";

export default function EditproductForm () {

const locationData = useLocation();
console.log(locationData)
if(locationData.state == null){
    toast.error("Please select a product to edit")
    window.location.href = "/admin/products"
}

const [productId, setProductId] = useState(locationData.state.productId);
const [productName, setProductName] = useState(locationData.state.productName);
const [altNames, setAltNames] = useState(locationData.state.altNames.join(","));
const [price, setPrice] = useState(locationData.state.price);
const [labledPrice, setLabledPrice] = useState(locationData.state.labledPrice);
const [description, setDescription] = useState(locationData.state.description);
const [stock, setStock] = useState(locationData.state.stock);
const [images, setImages] = useState([]);
const navigate = useNavigate();

    async function handleSubmit() {

        const promisesArray = []
        for(let i = 0; i < images.length; i++) {
            const promise = mediaUpload(images[i])
            promisesArray[i] = promise
        }
        try{
        let result = await Promise.all(promisesArray)
        
        if(images.length == 0){
            result = locationData.state.images
        }
        const altNamesInArray = altNames.split(",")

        const product = {
            productName : productName,
            altNames : altNamesInArray,
            price : price,
            labledPrice : labledPrice,
            description : description,
            stock : stock,
            images : result
        }

        const token = localStorage.getItem("token")
        console.log("token",token)

        await axios.put(import.meta.env.VITE_BACKEND_URL+"/api/product/"+productId, product, {
            headers : {
                "Authorization" : "Bearer "+ token
            }
        })

        toast.success("Product updated successfully");
        navigate("/admin/products");
        
    }catch(error) {
        console.log(error)
        toast.error("Product updating failed")
    }

    }




    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] rounded-lg bg-white shadow-lg flex flex-col items-center">
                <h1 className="font-bold text-3xl text-gray-700 m-[10px]">Edit Product</h1>
                <input
                    disabled
                    value={productId}
                    onChange={
                        (e)=>{  
                            setProductId(e.target.value)
                        }
                    }    
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Product ID"
                />

                <input 
                    value={productName}
                    onChange={
                        (e)=>{
                                setProductName(e.target.value)
                        }
                    }
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Product Name"
                />
                <input
                    value ={altNames}
                    onChange={
                        (e)=>{
                                setAltNames(e.target.value)
                        }
                    }
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Alternative Names"
                />
                <input
                    value = {price}
                    onChange={
                        (e)=>{
                                setPrice(e.target.value)
                        }
                    }
                    type="number"
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Price"
                />
                <input
                    value = {labledPrice}
                    onChange={
                        (e)=>{
                                setLabledPrice(e.target.value)
                        }
                    }
                    type="number" 
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Labled Price"
                />

                <textarea
                    value ={description}
                    onChange={
                        (e)=>{
                            setDescription(e.target.value)
                        }
                    } 
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Description"
                />

                <input
                    type="file"
                    onChange={
                        (e)=>{
                            setImages(e.target.files)
                        }
                    }
                    multiple
                    className="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Product Images"   
                />

                <input
                    value={stock}
                    onChange={
                        (e)=>{
                                setStock(e.target.value)
                        }
                    }
                    type="number" 
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Stock"
                />

                <div className="w-[400px] h-[100px] rounded-lg flex justify-between items-center">
                    <Link to={"/admin/products"} className="w-[180px] p-[10px] bg-red-500 text-white text-center rounded-lg hover:bg-red-600 m-1">Cancel</Link>
                    <button onClick={handleSubmit} className="w-[180px] p-[10px] rounded-lg bg-green-500 text-white hover:bg-green-600 m-1 cursor-pointer">Edit Product</button>
                </div>
            </div>
        </div>
    )
}