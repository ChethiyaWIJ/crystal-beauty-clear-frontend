import { useState } from "react"

export default function ImageSlider(props){
    
    const images = props.images
    const [activeImage, setActiveImage] = useState(images[0])

    return(
        <div className=" w-full h-full flex justify-center items-center">
            <div className="w-[70%] aspect-square flex relative">
                {/*There was a <div></div> wrapped arround this <img> tag */}
                    <img src={activeImage} className="h-full w-full object-cover"/>
                
                <div className="w-full h-[100px] bg-pink-500 absolute bottom-0 left-0 flex justify-center items-center">
                    {
                        images.map(
                            (image,index)=>{
                                return(
                                    <img key={index} src={image} onClick={
                                        ()=>{
                                            setActiveImage(image)
                                        }
                                    } className="h-full aspect-square mx-[5px] cursor-pointer"/>
                                )
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}