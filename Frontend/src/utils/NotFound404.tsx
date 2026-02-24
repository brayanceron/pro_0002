import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const NotFound404 = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full h-svh flex flex-col">
      <div className="w-auto my-auto">
        <h1 className="text-8xl font-bold text-center">404</h1>
        <h1 className="text-center text-lg mt-2 text-gray-600">Oops! this page Not Found</h1>
        <div className="w-full flex items-center justify-center text-sm gap-2 text-gray-400 mt-1">
          {/* <a href="/login" className=" text-center link link-animated">Login</a>
          <a href="/playing" className=" text-center link link-animated">Playing</a>
          <a href="/user/get" className=" text-center link link-animated">User</a> */}
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
