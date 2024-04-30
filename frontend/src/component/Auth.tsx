import { SignUpInput } from "@wordwall/blog-common";
import { ChangeEvent, useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "./config";

export const Auth=({type}:{type:"signup" | "signin"})=>{ 
    const navigate= useNavigate();
     const [postInputs,setPostInputs]  = useState<SignUpInput> ({
        email:"",
        password:"",
        name:""
     });

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup" : "signin"}`,postInputs)
            console.log(response)
            const token= response.data.jwt;
            localStorage.setItem("token",token);
            navigate("/blogs")
        }catch(e){
            alert("Error while sign up!")
        }
    }

     return <div className="h-screen flex justify-center flex-col">
                    <div className="text-3xl font-bold flex justify-center">
                        Create an Account
                    </div>
                    <div className="text-gray-500 flex justify-center mt-1 ">
                        {type === "signin" ?"Don't have an account" : "Already have an account?" } <Link  to={type==="signin"? "/signup" :"/signin"} className=" pl-1 underline">
                            {type==="signin"? "Sign Up" : "Sign In" } </Link>
                    </div>
                    <div className="flex justify-center">
                    {type === "signup" ? <LabelledInputs label="Name" placeholder="Harkirat Singh..." onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}
                    </div>
                    <div className="flex justify-center">
                    <LabelledInputs   label="Email" placeholder="Email..." onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            email:e.target.value
                        }))
                    }}/>
                    </div>
                    <div className="flex justify-center">
                    <LabelledInputs   label="Password"  type={"password"} placeholder="Password.." onChange={(e)=>{
                        setPostInputs(c=>({
                            ...c,
                            password:e.target.value
                        }))
                    }}/>
                    </div>
                    <div className="flex justify-center pt-3">
                    <button onClick={sendRequest} type="button" className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
                    focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 
                    dark:focus:ring-gray-700 dark:border-gray-700 w-80">{type==="signup"? "Sign Up" : "Sign In"}</button>
                    </div>
                    
            
            </div>
}
interface LabelledInputType{
    label:string,
    placeholder: string,
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void;
    type?: string;
}

function LabelledInputs({label,placeholder,onChange,type}:LabelledInputType){
    return <div>
            <label className="block mb-2 text-sm font-medium text-black pt-2">{label}</label>
            <input onChange={onChange} type={type ||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 " placeholder={placeholder} required />
    </div>

}