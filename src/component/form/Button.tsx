import styles from './Button.module.css'
const Button = ({children, ...props}:any)=>{
    return( <button {...props}className={styles.button}>{children}</button>)




}
export default Button