// src/contexts/UserContext.tsx
import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import {TOKEN_POST, TOKEN_VALIDATE_POST, USUARIO_GET} from '../api';
import {useNavigate} from "react-router-dom";

interface User {
    id: number;
    username: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    login: boolean;
    loading: boolean;
    error: string | null;
    getUser: (token: string) => Promise<void>;
    userLogin: (username: string, password: string) => Promise<void>;
    userLogout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [login, setLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navegate = useNavigate();
    useEffect(() => {
        async function autoLogin(){
            const token = window.localStorage.getItem('token');
            if (token) {
                try {
                    setLoading(true);
                    setError(null);

                    const {url,options} = TOKEN_VALIDATE_POST(token);
                    const response = await fetch(url,options);
                    if (!response.ok) throw new Error('Token Inválido');
                    getUser(token);
                }catch (err){
                    userLogout()
                }finally {
                    setLoading(false);
                }
            }else{
                setLogin(false)
            }
        }autoLogin()

    }, []);

    const getUser = async (token: string) => {
        try {
            setLoading(true);
            setError(null);

            const { url, options } = USUARIO_GET(token);
            const response = await fetch(url, options);

            if (!response.ok) throw new Error('Erro ao obter usuário');

            const json = await response.json();
            setUser(json);
            setLogin(true);

        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
            setLogin(false);
        } finally {
            setLoading(false);
        }

    };

    const userLogin = async (username: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const { url, options } = TOKEN_POST({ username, password });
            const response = await fetch(url, options);

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Usuário não autorizado. Verifique suas credenciais.');
                } else if (response.status === 401) {
                    throw new Error('Usuário ou senha incorretos.');
                } else {
                    throw new Error('Erro desconhecido. Tente novamente.');
                }
            }

            const { token } = await response.json();
            window.localStorage.setItem('token', token);
            await getUser(token);
            navegate('/conta');
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login');
            setLogin(false)
        } finally {
            setLoading(false);
        }
    };

    const userLogout = () => {
        setUser(null);
        setLogin(false);
        setError(null);
        setLoading(false)
        window.localStorage.removeItem('token');
        navegate('/login');
    };

    return (
        <UserContext.Provider value={{ user, login, loading, error, getUser, userLogin, userLogout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser deve ser usado dentro de UserProvider');
    }
    return context;
};
