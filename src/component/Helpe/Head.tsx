import {useEffect} from "react";

const Head = (props:any)=>{
    useEffect(()=>{
        document.title = props.title + ' | Dogs';
    },[props])
    return(
        <></>
    )
}
export default Head