import {useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonImg } from '@ionic/react';
import {addCircle} from "ionicons/icons";
import RoostersList from '../components/RoostersList';
import AddRoosterModeSelector from '../components/AddRoosterModeSelector';
import AddRoosterForm from '../components/AddRoosterForm';
import {useTranslation} from "react-multi-lang";
import TrophyIcon from "../img/trophy.png";
import "./RoostersPage.css";
import { useIndexedDB } from 'react-indexed-db';
import RoosterRecordType from "../types/RoosterRecordType";
import { useLocation } from 'react-router';

const RoostersPage: React.FC = () => {
    const t = useTranslation();
    const {getAll} = useIndexedDB('roosters');
    const [showRoosterForm, setShowRoosterForm] = useState<number>(0); // 0 - hidden, 1 - choose mode, 2 - add single record, 3 - add multiple
    const [roosters, setRoosters] = useState<RoosterRecordType[]>([]);
    const location = useLocation();

    useEffect(() => {
        location.pathname === "/" && fetchLocalRoosters();
    }, [location.key]);

    const fetchLocalRoosters = async () => {
        const localRoosters = await getAll();
        setRoosters(localRoosters);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="appTitle">
                        <IonImg className="trophyIcon" src={TrophyIcon} /><b>{t("owner")}:</b> {t("app_name")}
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton className="addIcon" color="success" onClick={() => setShowRoosterForm(1)}>
                            <IonIcon slot="icon-only" icon={addCircle}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <RoostersList roosters={roosters} />
                <AddRoosterModeSelector mode={showRoosterForm} setMode={(newValue:number) => setShowRoosterForm(newValue)}/>
                <AddRoosterForm
                    mode={showRoosterForm}
                    setMode={(newValue:number) => setShowRoosterForm(newValue)}
                    fetchRoosters={fetchLocalRoosters}
                />
            </IonContent>
        </IonPage>
    );
};

export default RoostersPage;
