import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getMyToken(){
    const cookie=await cookies()
    const myToken=cookie.get("next-auth.session-token")?.value
    const decodeToken= await decode({
        token:myToken,
        secret:process.env.NEXTAUTH_SECRET!
    })
    const token=decodeToken?.routeToken
    return token
}