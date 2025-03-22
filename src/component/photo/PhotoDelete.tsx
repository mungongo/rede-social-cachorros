import styles from './PhotoDelete.module.css'
import useFetch from "../../hooks/useFetch.tsx";
import {PHOTO_DELETE} from "../../api.ts";
const PhotoDelete = ({id}:any)=>{
    const {request, loading}= useFetch()
    async function handleClick(){
        const confirmar = window.confirm("Voce tem certeza que deseja Deletar?")

        if (confirmar){
            const {url, options} = PHOTO_DELETE(id)
            const {response} =  await request(url,options)
            if(response && response.ok) window.location.reload()
        }

    }
    return(
        <>

            <button
                onClick={handleClick}
                className={styles.delete}
                disabled={loading}>
                 {loading? "Deletando...": "Delete"}
            </button>
        </>
    )
}
export default PhotoDelete