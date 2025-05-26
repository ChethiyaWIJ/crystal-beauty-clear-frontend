import { Link } from "react-router-dom"

export default function ProductCard(props){
    
    const product = props.product

    return(
        <Link to={"/overview/"+product.productId} className="w-[250px] h-[350px] m-4 shadow-2xl">
            <img src={product.images[0]} className="w-full h-[220px] object-cover"/>
            <div className="h-[130px] flex flex-col justify-center px-4">
                <p className="text-gray-300">{product.productId}</p>
                <p className="text-lg font-bold">{product.productName}</p>
                <p className="text-lg text-pink-400">{product.price.toFixed(2)}&nbsp;<span className="line-through text-gray-300 text-sm">{product.price<product.labledPrice&&product.labledPrice.toFixed(2)}</span></p>
            </div>
        </Link>
    )
}