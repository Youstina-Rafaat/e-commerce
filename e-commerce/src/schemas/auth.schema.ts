import * as zod from "zod"
export const registerSchema=zod.object({
    name: zod.string("name must be text").nonempty("name is required").min(3,"min length is 3 chars").max(20,"max length is 20 chars "),
    email:zod.email("invalid email").nonempty("email is required"),
    password:zod.string().nonempty("password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character (e.g. @, #, !, $)."),
    rePassword:zod.string().nonempty("repassword is required"),
    phone:zod.string().nonempty("phone is required").regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,"invalid phone"),
  }).refine((object)=>{
    return object.password === object.rePassword
  },{
    error:"password & repassword not match",
    path:['rePassword']
  })

  export type registerSchemaType= zod.infer<typeof registerSchema>

  export const loginSchema=zod.object({
    email:zod.email("invalid email").nonempty("email is required"),
    password:zod.string().nonempty("password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character (e.g. @, #, !, $)."),
  })

  export type loginSchemaType= zod.infer<typeof loginSchema>