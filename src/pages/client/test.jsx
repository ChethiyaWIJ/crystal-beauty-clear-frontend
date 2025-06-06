import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function TestPage(){

    const params = useParams();

    if(params.id == null){
        window.location.href = "/products"
    }

    const [product, setProduct] = useState(null);
    const[status, setStatus] = useState("loading") // loaded, error

    useEffect(
        ()=>{
            if(status == "loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then(
                    (res)=>{
                        setProduct(res.data.product)
                        setStatus("loaded")
                    }
                ).catch(
                    (err)=>{
                        console.log(err)
                        setStatus("error")
                    }
                )
            }
        },
        [status]
    )
    return(
        <div>

        </div>
    )
}