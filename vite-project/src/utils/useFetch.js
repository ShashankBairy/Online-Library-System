import { useState ,useEffect } from "react";

function useFetch(url){
    const [data,setdata] = useState(null)
    const[err,seterror]= useState(null)
    const[loading,setloading] = useState(true)
    useEffect(()=>{
        const fetchdata = async ()=>{
        try{
            const response = await fetch(url);
            const data = await response.json();
            setdata(data);
        }catch(err){
            seterror(err);
        }finally{
            setloading(false);
        }};
    fetchdata();
    },[url])
    return{data, err, loading};
}

export default useFetch

