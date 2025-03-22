import styles from './Image.module.css'
import {useState} from "react";
const Image = ({alt, ...props}:any)=>{
    const [eskeleton, setEskeleton] = useState(true)
    function handleLoad({target}){
        setEskeleton(false)
        target.style.opacity=1;
    }
    return(
        <div className={styles.wrapper}>
            {eskeleton &&  <div className={styles.eskelete}></div> }

            <img onLoad={handleLoad} className={styles.img} alt={alt} {...props}/>
        </div>
    )
}
export default Image