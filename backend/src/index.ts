import { Hono } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign ,verify} from 'hono/jwt'

const app = new Hono<{ // this has been done for the env red squiggly  to go away  basically  just a type assertion that it is an object.
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string,
	},
  Variables:{
    userId:string
  }
}>();

app.use('/api/v1/blog/*', async (c, next) => {
  //get the header
  const jwt = c.req.header('Authorization')|| "";
  if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
  const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
  //verify the header
  //if the header is correct we proceed 
  //else we give 403 status code
  await next()
})

app.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
    const token = await sign({id:user.id}, c.env.JWT_SECRET);
	
		return c.json({
      jwt:token
    })
	} catch(e) {
		return c.status(403);
	}
})
app.post("/api/v1/signin", async (c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
  const body = await c.req.json();

  const user= await prisma.user.findUnique({
    where : {
      email: body.email,
      password: body.password
    }
  });
  if(!user){
     c.status(403);
     return c.json({
      error:"User not found"
    })
  }
  const jwt = await sign({id:user.id} , c.env.JWT_SECRET);

  return c.json({
    jwt
  })
})
app.post("/api/v1/blog", (c)=>{
  return c.text('SignIn Route')
})
app.put("/api/v1/blog", (c)=>{
  return c.text('SignIn Route')
})
app.get('/api/v1/blog/:id', (c) => {
  const id= c.req.param('id')
  return c.text('Get Blog Route')
})
app.get("/api/v1/blog/bulk", (c)=>{
  return c.text('Signup Route')
})


export default app
