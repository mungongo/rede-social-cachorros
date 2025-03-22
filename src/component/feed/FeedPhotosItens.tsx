import styles from "./FeedPhotoItens.module.css"
import Image from "../Helpe/Image.tsx";
const FeedPhotosItens = ({photo,setModalPhoto}:any )=>{
    function handleClick(){
        setModalPhoto(photo)
    }
    return(
      <li className={styles.photo} onClick={handleClick} >
          <Image src={photo.src} alt={photo.title} />
          <span className={styles.visualizacao} >{photo.acesso}</span>
      </li>
    )
}
export default FeedPhotosItens