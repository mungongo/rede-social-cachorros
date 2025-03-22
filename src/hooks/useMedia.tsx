import {useEffect, useState} from "react";
interface Props{
    media:string
}
const useMedia = ({media}:Props)=>{
    const [match, setMatch] = useState<boolean>()

    useEffect(()=>{
        function changeMatch(){
            const  {matches}= window.matchMedia(media);
            setMatch(matches);
        }
        changeMatch();
        window.addEventListener('resize', changeMatch);
        return  ()=>{
            window.removeEventListener('resize',changeMatch)
        }

    },[media])
    return match
}
export default useMedia