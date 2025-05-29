import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

export default function Header() {
    return(
        <header className="h-[70px] w-full flex justify-center items-center bg-gray-100 relative">
            <div className="h-full w-[500px] flex items-center justify-evenly text-xl text-pink-500 font-bold">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/reviews">Reviews</Link>
                <Link to="/cart" className="text-3xl absolute right-[30px]"><BsCart4 /></Link>
            </div>
            
        </header>
    )
}