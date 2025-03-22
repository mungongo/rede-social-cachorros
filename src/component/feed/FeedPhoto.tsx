import useFetch from "../../hooks/useFetch.tsx";
import {useEffect} from "react";
import {PHOTOS_GET} from "../../api.ts";
import Error from "../Helpe/Error.tsx";
import Loading from "../Helpe/Loading.tsx";
import FeedPhotosItens from "./FeedPhotosItens.tsx";
import styles from "./FeedPhoto.module.css"

const FeedPhoto = ({page, setModalPhoto, user, setInfinite}:any)=>{
    const {data,loading,error,request} = useFetch()
    const total = 3;
    useEffect(()=>{
        async function fetchPhotos(){
            const {url,options} = PHOTOS_GET({page,total,user})
            const {  response,json } =  await  request(url,options)
            console.log("request...",json)
            if (response && response.ok && json.length < total){
                setInfinite(false)
            }

        }
        fetchPhotos()
    },[request,user,page, setInfinite]);

    if (error) return <Error error={error}/>
    if (loading) return <Loading></Loading>
    if (data)
        return(
            <ul className={`${styles.feed} animeLeft `} >
                { data.map((photo:any) => <FeedPhotosItens key={photo.id} photo={photo} setModalPhoto={setModalPhoto}/>)}
            </ul>)

    else return null;
}
export default FeedPhoto