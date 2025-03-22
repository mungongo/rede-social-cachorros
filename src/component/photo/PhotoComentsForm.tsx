import { useState} from "react";
import {ReactComponent as Enviar} from "../../assets/enviar.svg";
import useFetch from "../../hooks/useFetch.tsx";
import {COMMENTS_POST} from "../../api.ts";
import Error from "../Helpe/Error.tsx";
import styles from './PhotoCommentsForm.module.css'


const PhotoComentsForm = ({id,setComments, single}:any)=>{
    const {request,error} = useFetch()
    const [comment, setComment] = useState('')
    async function handleSubmit(event:any){
        event.preventDefault()
        const { url, options} = COMMENTS_POST(id,{comment})
        const { response, json } = await request(url,options);

        if ( response && response.ok){
            setComment('')
            setComments((comments:any) => [...comments,json])
        }

    }

    function handle({target}:any){
        setComment(target.value)
    }
    return(
        <form className={`${styles.form} ${single ? styles.single: ''}`} onSubmit={handleSubmit}>
        <textarea className={styles.textarea}
            id="comment"
            name="comment"
            placeholder="comente..."
            value={comment}
            onChange={handle}>
        </textarea>
            <button className={styles.button}><Enviar/></button>
            <Error error={error}></Error>
        </form>
    )
}
export default PhotoComentsForm