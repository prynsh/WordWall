import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signInInput, signUpInput} from "@wordwall/blog-common"

export const userRouter= new Hono<{
    Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string,
	},
  Variables:{
    userId:string
  }
}> ();

userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signUpInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
	try {
		const user = await prisma.user.create({
			data: {
        name: body.name,
				email: body.email,
				password: body.password
			}
		});
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ token });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})
userRouter.post("/signin", async (c)=>{
    const body = await c.req.json();
    const {success } = signInInput.safeParse(body)
    if(!success){
        c.status(411);
        return c.json({
            message:"Input are not correct"
        })
    }
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

  const user= await prisma.user.findUnique({
    where : {
      email: body.email,
      password: body.password,
    }
  });
  if(!user){
     c.status(403);
     return c.json({
      error:"User not found"
    })
  }
  const token = await sign({id:user.id} , c.env.JWT_SECRET);

  return c.json({
    jwt:token
  })
})