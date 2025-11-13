import { useContext, useEffect, useState } from "react";
import "./style.css"
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";

const AppSelectOptionInput = (/* {options} : {options : []} */) => {
    // const entity = "gender"
    const { user: userAuth } = useContext(AuthContext);
    // const { data : data2, error, isLoading, res } = useFetch(`http://localhost:5000/api/gender/by/user/${userAuth?.id}`);
    const { data: data2, error, isLoading, res } = useFetch(`http://localhost:5000/api/gender/by/admin`);
    // const { data: data2, error, isLoading, res } = useFetch(`http://localhost:5000/api/sense/by/admin`);


    const [options, setoptions] = useState([])

    const h = "h-auto";
    // const h = "h-[100px]";
    // const options = ['Pop', 'Rock', 'Cumbia', 'Salse', 'Hard Rock', 'Blues', 'Vallenato', 'Boleros', 'Rock and Roll', 'Hard Rock', 'Tropipop', 'Valada', 'Ranchera', 'Romantica', 'Country', 'Salsa Choke', 'Champeta', 'Flamenco']
    // const bg = "bg-gray-100"
    const bg = "bg-gray-50"
    // const bg = "bg-gray-500"

    useEffect(() => {
        if (isLoading || error) return
        // console.log(data2)
        const opt = data2.map((i: any) => i.name)
        // console.log(opt)
        setoptions(opt)
    }, [data2, isLoading])

    // console.log(options)
    return (
        <>
            <label htmlFor="">Attach Genders</label>
            <div className={`relative ${h}`}>

                <div
                    className={`${h} scrollable overflow-y-auto flex flex-wrap justify-center w-full ${bg} py-2 gap-x-2 gap-y-1 pr-3`}>
                    {
                        data2 && !isLoading ?
                            // options.map((item: string) => <OptionsInput id={item} name={item} />)
                            // data2.map((item: string) => <OptionsInput id={item} name={item} key={item} />)
                            options.map((item: string) => <OptionsInput id={item} name={item} key={item} />)
                            // <p>wait</p>
                            : <> No pass</>
                    }
                </div>
                <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-3 ${h} transition-opacity duration-300`}></div>

            </div>
        </>
    );
}
const OptionsInput = ({ id, name }: { id: string, name: string }) => {
    id;
    const [select, setSelect] = useState(false);
    const onClick = () => {
        setSelect(!select)
    }

    return (
        <span
            onClick={onClick}
            className={`badge ${!select && `badge-soft`} ${select && 'badge-primary'} rounded-full hover:cursor-pointer`}
        >
            {name}
        </span>
    );
}

export { AppSelectOptionInput }