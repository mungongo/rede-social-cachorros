import { Navigate, Route, Routes} from 'react-router-dom';
import LoginForm from './LoginForm.tsx';
import LoginCreate from './LoginCreate.tsx';
import LoginPasswordLost from './LoginPasswordLost.tsx';
import LoginPasswordReset from './LoginPasswordReset.tsx';
import { useUser } from '../../contexts/UserContext.tsx';
import styles from './Login.module.css';
import NotFound from "../NotFound.tsx";

const Login = () => {
    const { login } = useUser();

    if (login) return <Navigate to="/conta" />;

    return (
        <section className={styles.login}>
            <div className={ styles.forms }>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="criar" element={<LoginCreate />} />
                    <Route path="perdeu" element={<LoginPasswordLost />} />
                    <Route path="resetar" element={<LoginPasswordReset />} />
                    <Route path="*" element={<NotFound/>}></Route>
                </Routes>
            </div>
        </section>
    );
};

export default Login;
