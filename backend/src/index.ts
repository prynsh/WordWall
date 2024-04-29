import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono<{ // this has been done for the env red squiggly  to go away  basically  just a type assertion that it is an object.
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string,
	},
  Variables:{
    userId:string
  }
}>();

app.use('/*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);





export default app
