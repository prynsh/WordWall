import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog=({blog}:{blog:Blog})=>{
    return <div>
        <AppBar/>
        <div className="flex justify-center">

        
        <div className="grid grid-cols-12  w-full px-32 pt-200 max-w-screen-xl pt-12">
        <div className=" col-span-8">
            <div className="text-5xl font-extrabold">
               {blog.title}
            </div>
            <div className="pt-">
                {blog.content}
            </div>
        </div>
        <div className=" col-span-4 px-10">
            <div className="text-slate-600 text-lg">
             Author

            </div>
             <div className="flex">
             <div className=" pr-4 flex justify-center flex-col">
                <Avatar name={blog.author.name || "Anonymous"} />
             </div>
             <div>
             
             <div className="text-xl font-bold">
                {blog.author.name || "Anonymous"}
             </div>
             <div className="pt-2 text-slate-500">
                Random catch phrase about the author's ability to grab the user's attention 
             </div>
             </div>
             </div>
        </div>
        </div>
        </div>
    </div>
}