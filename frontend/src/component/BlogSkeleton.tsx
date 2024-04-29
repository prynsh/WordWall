
export const BlogSkeleton=()=>{
    return <div role="status" className="animate-pulse">
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="font-extralight pl-2 flex justify-center flex-col  ">
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
            </div>
            <div className="font-thin pl-2 text-slate-500 flex justify-center flex-col">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
        </div>
        <div className="text-xl font-semibold pt-2">
        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
        </div>
        <div className="text-md font-thin">
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
        </div>
    </div>
        <span className="sr-only">Loading...</span>
    </div>
    
    
}