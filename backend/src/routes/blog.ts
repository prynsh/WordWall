import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign ,verify} from 'hono/jwt'

export const blogRouter=new Hono<{
    Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string,
	},
  Variables:{
    userId:string
  }
}> ();

blogRouter.use("/*", async(c,next)=>{
    
    const authHeader = c.req.header("Authorization") || "";
    try{

        const user=await verify(authHeader,c.env.JWT_SECRET);
        if(user){
            c.set("userId",user.id);
            await next();
        }else{
            c.status(403);
            c.json({
                message:"Not verified"
            })
        }
    }
    catch(e){
            c.status(403);
            c.json({
                message:"Not Logged In"
            })
    }
    next();
})


blogRouter.post("/", async (c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
    const userId= c.get("userId");
    
   
    const blog= await prisma.post.create({
        data :{
            title: body.title,
            content: body.content,
            authorId : userId
        }
    })
    console.log(blog.authorId);
   return c.json({
        id: blog.id,
    })
  })
blogRouter.put("/", async(c)=>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
        const body = await c.req.json();

        const blog= await prisma.post.update({
        where:{
            id:body.id,
            },
        data :{
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: blog.id,
    })
})


  //todo add pagination
  blogRouter.get("/bulk",async (c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
    const blogs= await prisma.post.findMany();
    return c.json({
        blogs
    })
  })


blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const id =  c.req.param("id");
    try{
        const blog= await prisma.post.findUnique({
            where:{
                id:id,
            },
        })
        return c.json({
            blog
        })   
    }catch(e){
        c.status(401);
        c.json({
            message: "Invalid User"
        })
    }
  })



