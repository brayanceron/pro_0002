
import localforage from 'localforage';
import { useEffect, useState } from 'react';

const DBNAME = 'pro_0002';
const STORENAME = 'user_playlists';

const defaultValues : UseLocalDataOptionalParams = {
    value : {},
    storeName : STORENAME,
    dbname : DBNAME,
    execInitAction : null,
    // execInitAction : 'GET' as ActionType,
}

const initState : LocalDataState = {
    data: null,
    isLoading: false, // isLoading: true,
    error: null,
}

//estatic config for localforage
localforage.config({
    name : DBNAME, // name of the database
    storeName : STORENAME, // name of the table
});

export const useLocalData = ({key, options } : UseLocalDataParams) => {
    const { value, storeName, dbname, execInitAction } = {  ...defaultValues, ...options };
    const [req, setReq] = useState<LocalDataState>({ ...initState, isLoading: execInitAction === 'GET' }); // const [req, setReq] = useState<LocalDataState>({ ...initValues, isLoading: action === 'GET' ? true : false });

    useEffect(() => { configDB(); }, [dbname, storeName]);
    useEffect(() => { exec(); }, []);

    const configDB = () => {
        if(!dbname || !storeName) return;
        if(dbname === DBNAME && storeName === STORENAME) return; // no need to reconfigure if same as default
        localforage.config({
            name : dbname, // name of the database
            storeName : storeName, // name of the table
        });
    }

    const exec = () => {
        if(execInitAction === 'GET') { getData(); return; }
        else if (execInitAction === 'SET' && value !== undefined) { setData(); } // if (action === 'SET' && value !== undefined) { setData(...{specificKey : key,  newValue : value}); }
        else if (execInitAction === 'DELETE') { deleteData(); }
    }
    
    // const getData = async (especificKey : string = key) : Promise<LocalDataState | null> => { // const getData = async (key: string) : Promise<any> => {
    const getData = async (especificKey : string = key) : Promise<LocalDataState> => { // const getData = async (key: string) : Promise<any> => {
        let newValue : LocalDataState | null = null; // const newValue = { data: null, isLoading: true, error: null };
        try {
            const gottenValue = await localforage.getItem(especificKey); // const valueGotten = await localforage.getItem(key);
            newValue = { data: gottenValue, isLoading: false, error: null } 
            setReq(newValue);
        } catch (error) {
            newValue = { data: null, isLoading: false, error: Error("Error getting data from indexedDB") }
            setReq(newValue);
        }
        return newValue;
    }

    const setData = async ({especificKey = key, newValue = value} : SetDataType = {}) => {  // const setData = async ({especificKey, newValue} : SetDataType = {especificKey : key, newValue: value}) => { 
        // especificKey = especificKey || key;
        // newValue = newValue || value;
        setReq({ ...req, isLoading: true });
        try {
            await localforage.setItem(especificKey!, newValue);
            setReq({ data : null, isLoading: false, error: null });
        } catch (error) {
            console.log("Error : ", error);
            setReq({ ...req, error: Error("Error setting data in indexedDB"), isLoading: false });
        }
    }

    const deleteData = async (especificKey : string = key) => {
        setReq({ ...req, isLoading: true });
        try {
            await localforage.removeItem(especificKey);
            setReq({ data : null, isLoading: false, error: null });
        } catch (error) {
            setReq({ data : null, error: Error("Error deleting data from indexedDB"), isLoading: false });
        }
        // await localforage.clear(); // delete all database
    }

    return {
        ...req,
        getData,
        setData,
        deleteData,
    }
}

type ActionType = 'SET' | 'GET' | 'DELETE' | null;

export type UseLocalDataParams = {
    key: string,
    options?: UseLocalDataOptionalParams
}

type UseLocalDataOptionalParams = {
    // key: string, 
    value?: any, 
    dbname?: string, 
    storeName?: string,
    execInitAction?: ActionType,
}

type LocalDataState = {
    data: any | null,
    isLoading: boolean,
    error: Error | null,
}

interface SetDataType  {
    especificKey?: string, 
    newValue?: any,
}