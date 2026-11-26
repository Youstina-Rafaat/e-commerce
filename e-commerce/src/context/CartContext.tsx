"use client"

import { getLoggedUserCart } from "@/actions/cart.action"
import { createContext, ReactNode, useEffect, useState } from "react"

export const CartContext=createContext( {numberOfCartItems :0 , setnumberOfCartItems( num : number){}})
export default function CartContextProvider({children} :{children :ReactNode}){
    const [numberOfCartItems, setnumberOfCartItems] = useState(0)
    async function getUserCart(){
        try{
            const res= await getLoggedUserCart()
            setnumberOfCartItems(res.numOfCartItems)
        }catch(err :unknown){
            if(err instanceof Error){
                console.log(err.message)
            }
        }
    }
    useEffect(()=>{
        getUserCart()
    },[])
    return <CartContext.Provider value={{numberOfCartItems,setnumberOfCartItems}}>
        {children}
    </CartContext.Provider>
}
