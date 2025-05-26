import { Route, Routes } from "react-router-dom";
import Header from "../compoenents/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";

export default function HomePage() {
    return(
        <div className="w-full h-screen">
            <Header/>
            <div className="min-h-[calc(100vh-70px)] w-full">
                <Routes path="/*">
                    <Route path="/" element={<h1>Home Page</h1>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/contact" element={<h1>Contact Us</h1>}/>
                    <Route path="/reviews" element={<h1>Reviews</h1>}/>
                    <Route path="/overview/:id" element={<ProductOverview/>}/>
                    <Route path="/*" element={<h1>404 Error Not Found !</h1>}/>
                </Routes>
            </div>
        </div>
    )
}