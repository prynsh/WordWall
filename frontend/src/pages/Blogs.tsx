import { AppBar } from "../component/AppBar"
import { Avatar, BlogCard } from "../component/BlogCard"

export const Blogs=()=>{
    

   
    return <div>
        <AppBar/>
    <div className="flex justify-center">
            <div className="max-w-xl ">
                <BlogCard
                authorName={"Priyansh"}
                title={"Title"}
                content={"Content hvbqikhv"}
                publishedDate={"2nd feb 2024"}
                />
                <BlogCard
                authorName={"Priyansh"}
                title={"Title"}
                content={"Content hvbqikhv"}
                publishedDate={"2nd feb 2024"}
                />
                 
            </div>
            </div>
    </div>
}