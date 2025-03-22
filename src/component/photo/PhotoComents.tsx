import {useUser} from "../../contexts/UserContext.tsx";
import PhotoComentsForm from "./PhotoComentsForm.tsx";
import {useEffect, useRef, useState} from "react";
import styles from './PhotoComments.module.css'

const PhotoComents = (props:any)=>{
    const [comments , setComments] = useState(()=> props.comments)
    const commentSection = useRef(null);
    const {login} = useUser()

    useEffect(()=>{
        commentSection.current.scrollTop = commentSection.current.scrollHeight;
    },[comments])
    return(
        <>
          <ul ref={commentSection} className={`${styles.comments} ${props.single ? styles.single: ''}`}>
              { comments.map(
                  (come:any) => (<li key={come.comment_ID}>
                      <b>{come.comment_author}: </b>
                     <span>{come.comment_content}</span>
                  </li>)
              )}
          </ul>
            {login && <PhotoComentsForm single={props.single} id={props.id} setComments={setComments}/>}
        </>
    )
}
export default PhotoComents