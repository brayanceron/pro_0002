import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const Root = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="w-full h-svh flex flex-col">
            <div className="w-auto my-auto">
                <h1 className="text-8xl font-bold text-center">WELCOME!</h1>
                <h1 className="text-center text-lg text-gray-600 mt-2">To the <span className="font-bold">Proo 2</span> Music Platform!</h1>
                <div className="gap-2 w-full flex items-center justify-center text-sm text-gray-400 mt-1">
                    {
                        user ?
                            <>
                                <a href="/playing" className=" text-center link link-animated">Playing</a>
                                <a href="/song/get" className=" text-center link link-animated">Songs</a>
                                <a href="/generate" className=" text-center link link-animated">Generate</a>
                            </>
                            :
                            <>
                                <a href="/login" className=" text-center link link-animated">Login</a>
                                <a href="/signup" className=" text-center link link-animated">Sign Up</a>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}
