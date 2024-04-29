import { AppBar } from "../component/AppBar"
import {  BlogCard } from "../component/BlogCard"
import { BlogSkeleton } from "../component/BlogSkeleton"
import { useBlogs } from "../hooks"

export const Blogs=()=>{
    const {loading,blogs} = useBlogs();
    if(loading){
        return<div>
            <AppBar/>
        <div className="flex justify-center">
            <div>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
        </div>
            </div>
            </div>
    }
    

   
    return <div>
        <AppBar/>
    <div className="flex justify-center">
            <div >
                {blogs.map(blog=> <BlogCard
                id={blog.id}
                authorName={blog.author.name || "Anonymus"}
                title={blog.title}
                content={blog.content}
                publishedDate={"2nd feb 2024"}
                />
                )}
                 
            </div>
            </div>
    </div>
}