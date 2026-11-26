import NextAuth from "next-auth";
declare module "next-auth"{
    interface User {
        name:string,
        email:string,
        id:string,
        accessToken:string
    }

    interface Session {
        user:{
            name:string,
            email:string,
            id:string
        },
        expires:string
        
    }
}


declare module "next-auth/jwt"{
    interface JWT{
        routeToken:string,
        id:string,
    }
}