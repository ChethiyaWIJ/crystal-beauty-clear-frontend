import { useState } from "react"
import toast from "react-hot-toast";
import mediaUpload from "../utils/mediaUpload";

export default function Testing() {

    const[file, setFile] = useState(null);
    

    function handleUpload() {

       mediaUpload(file).then(
        (url)=>{
            console.log(url)
            toast.success("File uploaded successfully")
        }
       ).catch(
        (err)=>{
            console.log(err)
            toast.error("File upload failed")
        }
       )
    }

    return(
        
        <div className="w-full h-screen flex flex-col justify-center items-center ">
            <input  type="file" onChange={
                (e)=>{
                    setFile(e.target.files[0])
                }
            } className="text-center"/>

            <button onClick={handleUpload} className="bg-green-400 rounded-lg p-1 text-white font-bold text-center cursor-pointer hover:bg-green-500">Upload</button>
        </div>
    )
}