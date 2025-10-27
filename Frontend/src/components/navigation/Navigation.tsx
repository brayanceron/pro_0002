
import { NavLink, } from "react-router"

const Navigation = () => {
    return (

        <>
            {/* <div className="w-full h-[45px] bg-black opacity-95 bg-opacity-95 fixed top-2 rounded-3xl"> */}
            {/* <div className="w-1/4 h-[45px] fixed top-2 rounded-3xl bg-gradient-to-r from-black to-gray-100 opacity-90 from-60% to-95%">
            </div>
            <div className="w-1/4 h-[45px] fixed top-2 rounded-3xl right-0 bg-gradient-to-r from-gray-100 to-black opacity-90 from-5% to-95%">
            </div> */}
            <div className="w-full flex top-2 left-auto right-auto mb-1 justify-center items-center content-center bg-transparent opacity-95 bg-opacity-95 z-10">

                <div className="w-full flex justify-center items-center content-center">

                    <div className="w-auto px-2 rounded-3xl border-white border-x-8 bg-white">

                        <ul className="menu menu-horizontal rounded-3xl  py-0 w-auto space-y-0.5 bg-black opacity-85 [&_.nested-collapse-wrapper]:space-y-0.5 [&_ul]:space-y-0.5">

                            <li className="text-white">
                                <NavLink to={'/playing'}>
                                    <span className="icon-[tabler--play] size-5"></span>
                                    Playing...
                                </NavLink>
                            </li>
                            <li className="text-white">
                                <NavLink to={'/generate'}>
                                    <span className="icon-[tabler--bolt] size-5"></span> {/* <span className="icon-[tabler--music-star] size-5"></span> */}
                                    Generate
                                </NavLink>
                            </li>
                            <li className="text-white">
                                <NavLink to={'/gender/get'}>
                                    <span className="icon-[tabler--category] size-5"></span>
                                    Genders
                                </NavLink>
                            </li>
                            <li className="text-white">
                                <NavLink to={'/playlist/get'}>
                                    <span className="icon-[tabler--playlist] size-5"></span>
                                    Playlists
                                </NavLink>
                            </li>
                            <li className="text-white">
                                <NavLink to={'/sense/get'}>
                                    <span className="icon-[tabler--mood-happy] size-5"></span>
                                    Sense
                                </NavLink>
                            </li>
                            <li className="text-white">
                                <NavLink to={'/singer/get'}>
                                    <span className="icon-[tabler--empathize] size-5"></span>
                                    Singers
                                </NavLink>
                            </li>
                            <li className="text-white">
                                <NavLink to={'/language/get'}>
                                    <span className="icon-[tabler--language] size-5"></span>
                                    Language
                                </NavLink>
                            </li>
                            <li className="text-white">
                                <NavLink to={'/user/get'}>
                                    <span className="icon-[tabler--user] size-5"></span>
                                    User
                                </NavLink>
                            </li>

                            <li className="text-white">
                                <NavLink to={'/song/get'}>
                                    <span className="icon-[tabler--user] size-5"></span>
                                    Songs
                                </NavLink>
                            </li>

                            <li className="text-white">
                                <a href="#">
                                    <span className="icon-[tabler--settings] size-5"></span>
                                    Settings
                                </a>
                            </li>

                        </ul>
                    </div>

                </div>


            </div>

            {/* <div className="w-full fixed top-0 right-0 px-2">
                <div className=" w-1/4 py-2 px-4 mx-auto my-1 bg-black opacity-85 rounded-3xl flex justify-center gap-4">
                    <button className="btn btn-lg btn-circle btn-soft text-white transform hover:scale-105" aria-label="Circle Soft Icon Button">
                        <span className="icon-[tabler--music]"></span>
                    </button>
                    <button className="btn btn-lg btn-circle btn-soft text-white transform hover:scale-105" aria-label="Circle Soft Icon Button">
                        <span className="icon-[tabler--category]"></span>
                    </button>
                    <button className="btn btn-lg btn-circle btn-soft text-white transform hover:scale-105" aria-label="Circle Soft Icon Button">
                        <span className="icon-[tabler--mood-happy]"></span>
                    </button>
                    <button className="btn btn-lg btn-circle btn-soft text-white transform hover:scale-105" aria-label="Circle Soft Icon Button">
                        <span className="icon-[tabler--language]"></span>
                    </button>
                    <button className="btn btn-lg btn-circle btn-soft text-white transform hover:scale-105" aria-label="Circle Soft Icon Button">
                        <span className="icon-[tabler--playlist]"></span>
                    </button>
                    <button className="btn btn-lg btn-circle btn-soft text-white transform hover:scale-105" aria-label="Circle Soft Icon Button">
                        <span className="icon-[tabler--empathize]"></span>
                    </button>
                </div>
            </div> */}
        </>

    )
}

export default Navigation
