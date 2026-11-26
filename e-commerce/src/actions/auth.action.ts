"use server"

import { registerSchemaType } from "@/schemas/auth.schema";
import { loginSchemaType } from "@/schemas/auth.schema";
export async function userRegister(data:registerSchemaType){
    try{
        const res= await fetch (`https://ecommerce.routemisr.com/api/v1/auth/signup`,
            {
                method:"POST",
                body:JSON.stringify(data),
                headers:{"content-type":"application/json"}
            }
        )
        const result=await res.json()
        return res.ok
    }
    catch(err){
        
    }
}
