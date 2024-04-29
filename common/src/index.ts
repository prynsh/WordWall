import { z } from "zod"

export  const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})


export const createBlogInput=z.object({
    title: z.string(),
    content:z.string(),
    
})

export  const signUpInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name:z.string()
})

export const updateBlogs=z.object({
    title: z.string(),
    content : z.string(),
    id:z.string()
})

export type UpdateBlogs = z.infer<typeof updateBlogs>
export type SignInInput= z.infer<typeof signInInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type SignUpInput= z.infer<typeof signUpInput>

