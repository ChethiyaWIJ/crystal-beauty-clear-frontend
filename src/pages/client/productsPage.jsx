import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../compoenents/loader";
import ProductCard from "../../compoenents/product-card";

export default function ProductsPage(){

    const[productList, setProductList] = useState([]);
    const[productsLoaded, setProductsLoaded] = useState(false);
    useEffect(
        ()=>{
            if(!productsLoaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                    (res)=>{
                        setProductList(res.data)
                        setProductsLoaded(true)
                    }
                ).catch(
                    ()=>{
                        toast.error("Error fetching products")
                    }
                )
            }

        },
        [productsLoaded]
    )
    return(
        <div className="h-full w-full">
            {
                productsLoaded?
                <div className="w-full h-full flex flex-wrap justify-center">
                    {
                        productList.map(
                            (product,index)=>{
                                return(
                                    <ProductCard key={index} product={product}/>
                                )
                            }
                        )
                    }
                </div>
                :
                <Loader/>
            }

        </div>
    )
}