import { useState,useEffect } from "react";
const useWindowSize=()=>{
    const [windwoSize,setWindowSize]=useState({
        width:undefined,
        height:undefined
    });
    useEffect(()=>{
const handleResize=()=>{
    setWindowSize({
        width:window.innerWidth,
        height:window.innerHeight
    })
}
handleResize();
window.addEventListener("resize",handleResize);
const cleanUp=()=>{
    console.log("run if a useEffect dep changes");
   
}

return ()=> window.removeEventListener("resize",handleResize)
    },[])
    return windwoSize;
}
export default useWindowSize