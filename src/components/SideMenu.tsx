import {IonMenu, IonMenuButton, IonIcon, IonButton, useIonToast, IonSpinner} from '@ionic/react';
import {reorderTwoOutline as MenuButton} from "ionicons/icons";
import './SideMenu.css';
import {cloudUpload as saveIcon} from "ionicons/icons";
import {useTranslation} from "react-multi-lang";
import AuthForm from "./Auth/AuthForm";
import {syncRoosters, fetchRoosters} from '../api/Roosters';
import {useState} from "react";
import {useIndexedDB} from "react-indexed-db";


interface ContainerProps {
}

const SideMenu: React.FC<ContainerProps> = () => {
    const t = useTranslation();
    const [user, setUser] = useState<object|false>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { getAll, clear, add } = useIndexedDB('roosters');
    const [present] = useIonToast();

    const uploadChanges = async () => {
        setLoading(true);
        const roosters = await getAll()
        const response = await syncRoosters(roosters);
        if (response.success) {
            present({message: t('sync_success'), color: "success", duration: 500});
            setLoading(false);
        } else {
            present({message: t('error_unknown'), color: "danger", duration: 500});
            setLoading(false);
        }
        fetchDBRoosters();
    }

    //@TODO move these DB handlers somewhere else, they don't belong here
    const fetchDBRoosters = async () => {
        const {roosters} = await fetchRoosters();
        if (roosters.length > 0) {
            clear();
            roosters.map((r:object) => {
                add(r);
            })
        }
    }

    return (<>
        <IonMenuButton id="menu_button">
            <IonIcon slot="icon-only" icon={MenuButton} color="dark"/>
        </IonMenuButton>
        <IonMenu contentId="main_content">
            {user ? <IonButton disabled={loading} className="sync_roosters_button" onClick={uploadChanges}>{loading ? <IonSpinner/> : <><IonIcon slot="start" icon={saveIcon}/> {t('sync_roosters')}</>}</IonButton> : <AuthForm setUser={setUser} />}
        </IonMenu>
    </>);
};

export default SideMenu;
