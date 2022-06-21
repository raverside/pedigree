import React, {useEffect, useState} from "react";
import {IonInput, IonLabel, IonButton, IonSpinner, IonText} from '@ionic/react';
import Cookies from 'js-cookie';
import {login, tokenLogin} from '../../api/Auth';
import { useTranslation } from 'react-multi-lang';
import "./AuthForm.css";

interface ContainerProps {
    setUser: (user:object|false) => void;
}

const Login: React.FC<ContainerProps> = ({setUser}) => {
    const t = useTranslation();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|false>(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            (async () => {
                const response = await tokenLogin();
                if (response.user) setUser(response.user);
            })();
        } else setLoading(false);
    }, [])

    const Submit = async () => {
        setLoading(true);
        setError(false);
        const response = await login(username, password);
        if (response.error) {
            setError(response.error);
            setLoading(false);
        } else if (response.token && response.user) {
            Cookies.set('token', response.token, { expires: 7 });
            setLoading(false);
        } else {
            setLoading(false);
            setError("error_unknown");
        }
    }

    return (
        <div className="auth_form">
            <IonLabel>{t('username')}</IonLabel>
            <IonInput value={username} onIonChange={(e) => setUsername(e.detail.value!)} placeholder={t('username')}/>
            <IonLabel>{t('password')}</IonLabel>
            <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} placeholder={t('password')}/>
            {error && <IonText color="danger"><p>{t(error)}</p></IonText>}
            <IonButton disabled={loading} onClick={Submit}>{loading ? <IonSpinner/> : t('login')}</IonButton>
        </div>
    );
};

export default Login;
