import styles from './PhotoContent.module.css'
import {Link} from "react-router-dom";
import PhotoComents from "./PhotoComents.tsx";
import {useUser} from "../../contexts/UserContext.tsx";
import PhotoDelete from "./PhotoDelete.tsx";
import Image from "../Helpe/Image.tsx";
const PhotoContent = ({data, single}:any)=>{
    const {photo, comments} = data;
    const {user} = useUser()
    return(
        <div className={`${styles.photo} ${ single ? styles.single: ''}`} >
            <div className={styles.img} >
                <Image src={photo.src} alt={photo.title} />
            </div>
            <div className={styles.details} >
                <div>
                    <p className={styles.autor}>
                        {user?.username && user.username === photo.author ? <PhotoDelete id={photo.id}/>: <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>}

                        <span className={styles.visualiza}>{photo.acesso}</span>
                    </p>
                    <h1 className="title">
                        <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
                    </h1>
                    <ul className={styles.atributos} >
                       <li>{photo.peso} Kg</li>
                        <li>{photo.idade} anos</li>
                    </ul>
                </div>
            </div>
            <PhotoComents single={single} id={photo.id} comments={comments}></PhotoComents>
        </div>
    )
}
export default PhotoContent