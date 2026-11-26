"use server"

import { getMyToken } from "@/utilites"

export async function addToCart(productId : string){
    const token=await getMyToken()

    if(!token){
        throw new Error("please login frist..")
    }

    const res= await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:"POST",
        headers:{
        token:token as string,
        "content-type":"application/json",

    },
    body :JSON.stringify({productId:productId}),
})

const data=await res.json()
return data
}

export async function getLoggedUserCart(){
    const token=await getMyToken()

    if(!token){
        throw new Error("please login frist..")
    }

    const res= await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:"GET",
        headers:{
        token:token as string,
        "content-type":"application/json",

    },
})

const data=await res.json()
return data
}

export async function updateProductQuantity(productId : string,count:number){
    const token=await getMyToken()

    if(!token){
        throw new Error("please login frist..")
    }

    const res= await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`,{
        method:"PUT",
        headers:{
        token:token as string,
        "content-type":"application/json",

    },
    body :JSON.stringify({count:count}),
})

const data=await res.json()
return data
}

export async function removeProductFromCart(productId : string){
    const token=await getMyToken()

    if(!token){
        throw new Error("please login frist..")
    }

    const res= await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`,{
        method:"DELETE",
        headers:{
        token:token as string,
        "content-type":"application/json",
    },
})

const data=await res.json()
return data
}

export async function removeAllProductsFromCart(){
    const token=await getMyToken()

    if(!token){
        throw new Error("please login frist..")
    }

    const res= await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:"DELETE",
        headers:{
        token:token as string,
    },
})

const data=await res.json()
return data
}