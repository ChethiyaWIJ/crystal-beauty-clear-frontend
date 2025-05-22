import { createClient } from "@supabase/supabase-js";

    const supabase = createClient(
        "https://imobvubphexabqkzguud.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb2J2dWJwaGV4YWJxa3pndXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODM0MjIsImV4cCI6MjA2MzQ1OTQyMn0.0tg_SwrLoD0udjYM0BSlkjH2S5wXvsaTxKVuied-06c"
    );


export default function mediaUpload(file) {
    
    const promise = new Promise(
        (resolve,reject)=>{
            if(file == null){
                reject("No file selected")
            }
            const timeStamp = new Date().getTime()
            const newFileName = timeStamp+file.name

            supabase.storage.from("images").upload(newFileName, file, {
                cacheControl : "3600",
                upsert : false
            }).then(
                ()=>{
                    const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                (error)=>{
                    console.log(error)
                    reject("File upload failed")
                }
            )
        }
    )
    return promise
}