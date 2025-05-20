import { Link } from "react-router-dom";

export default function AddproductForm () {
    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] rounded-lg bg-white shadow-lg flex flex-col items-center">
                <h1 className="font-bold text-3xl text-gray-700 m-[10px]">Add product</h1>
                <input 
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Product ID"
                />

                <input 
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Product Name"
                />
                <input 
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Alternative Names"
                />
                <input 
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Price"
                />
                <input 
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Labled Price"
                />

                <textarea 
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Description"
                />

                <input 
                    className ="w-[400px] h-[50px] border border-gray-400 rounded-xl text-center m-[5px]"
                    placeholder="Stock"
                />

                <div className="w-[400px] h-[100px] rounded-lg flex justify-between items-center">
                    <Link to={"/admin/products"} className="w-[180px] p-[10px] bg-red-500 text-white text-center rounded-lg hover:bg-red-600 m-1">Cancel</Link>
                    <button className="w-[180px] p-[10px] rounded-lg bg-green-500 text-white hover:bg-green-600 m-1 cursor-pointer">Add Product</button>
                </div>
            </div>
        </div>
    )
}