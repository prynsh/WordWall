import { AvatarWithDropDown } from "./AvatarWithDropDown"
import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar=()=>{

    return <div className="border-b flex justify-between px-10 py-4">
        <div className="flex ">
            <Link to={"/blogs"} className="flex-col flex  justify-center" >
            <div className="flex justify-center flex-col pr-3">
                <Avatar name="WordWall"/>
            </div>
            </Link>
        <Link to={"/blogs"} className="flex-col flex  justify-center">
            WordWall
        </Link>
        </div>
        <div className="flex">
            <Link to={"/publish"}>
        <button type="button" className=" mr-4  mt-3 text-white bg-green-700 hover:bg-green-800 focus:outline-none 
        focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 
        mb-2 ">New Blog</button>
        </Link>
            <div className="flex justify-center flex-col">
            <AvatarWithDropDown /> 
            </div>
        </div>

    </div>
}
/*here add the dropdown waala component*/
