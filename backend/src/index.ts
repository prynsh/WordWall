import { Hono } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign ,verify} from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

const app = new Hono<{ // this has been done for the env red squiggly  to go away  basically  just a type assertion that it is an object.
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string,
	},
  Variables:{
    userId:string
  }
}>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);





export default app
