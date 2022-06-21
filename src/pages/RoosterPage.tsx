import {useState, useEffect} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButtons,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel, IonChip,
    IonIcon
} from '@ionic/react';
import {chevronBack, chevronForward} from "ionicons/icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInterface, Navigation as SwiperNavigation } from 'swiper';
import AddRoosterForm from '../components/AddRoosterForm';
import {useTranslation} from "react-multi-lang";
import { useIndexedDB } from 'react-indexed-db';
import RoosterRecordType from "../types/RoosterRecordType";
import {useParams, useHistory} from 'react-router-dom';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import "./RoosterPage.css";

const RoosterPage: React.FC = () => {
    const t = useTranslation();
    const { id } = useParams<{id:string}>();
    const { getAll } = useIndexedDB('roosters');
    const [prevRooster, setPrevRooster] = useState<RoosterRecordType>();
    const [rooster, setRooster] = useState<RoosterRecordType>();
    const [nextRooster, setNextRooster] = useState<RoosterRecordType>();
    const [editRooster, setEditRooster] = useState<boolean>(false);
    const [swiperInstance, setSwiperInstance] = useState<SwiperInterface>();
    const history = useHistory();

    useEffect(() => {
        fetchLocalRoosters();
    }, [id]);

    useEffect(() => {
        (prevRooster && swiperInstance?.activeIndex === 0) && swiperInstance?.slideTo(1);
    }, [prevRooster, swiperInstance]);


    const fetchLocalRoosters = async () => {''
        const allRoosters = await getAll();
        const localRoosterIndex = allRoosters.findIndex(r => r.id === +id);
        if (localRoosterIndex < 0) return false;

        const localRooster = allRoosters[localRoosterIndex];
        const localPrevRooster = (localRoosterIndex-1 >= 0) ? allRoosters[localRoosterIndex-1] : false;
        const localNextRooster = allRoosters[localRoosterIndex+1] || false;

        setRooster(localRooster);
        setPrevRooster(localPrevRooster);
        setNextRooster(localNextRooster);
    }

    const slideActiveRooster = (swiper:any) => {
        if (swiper.activeIndex === 0 && prevRooster) {
            history.replace('/rooster/'+prevRooster?.id);
        } else if ((!prevRooster && swiper.activeIndex === 1 || swiper.activeIndex === 2) && nextRooster) {
            history.replace('/rooster/'+nextRooster?.id);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="danger" routerLink="/">{t("back")}</IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={()=>setEditRooster(true)}>{t("edit")}</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <Swiper
                    onSwiper={(swiper) => setSwiperInstance(swiper)}
                    onActiveIndexChange={slideActiveRooster}
                    className="rooster_selector_slider"
                    modules={[SwiperNavigation]}
                    navigation={{ nextEl: "#swiper-forward", prevEl: "#swiper-back" }}
                >
                    {prevRooster && <SwiperSlide>
                        <div className="rooster_slide_value rooster_id_value">{prevRooster.id}</div>
                        <IonChip color={prevRooster.color?.toLocaleLowerCase()}>
                            <IonLabel color={prevRooster.color?.toLocaleLowerCase()}>{t("color_"+prevRooster.color?.toLocaleLowerCase())}</IonLabel>
                        </IonChip>
                        <div className="rooster_slide_value">{prevRooster.initials}</div>
                    </SwiperSlide>}
                    <SwiperSlide>
                        <div className="rooster_slide_value rooster_id_value">{rooster?.id}</div>
                        <IonChip color={rooster?.color?.toLocaleLowerCase()}>
                            <IonLabel color={rooster?.color?.toLocaleLowerCase()}>{t("color_"+rooster?.color?.toLocaleLowerCase())}</IonLabel>
                        </IonChip>
                        <div className="rooster_slide_value">{rooster?.initials}</div>
                    </SwiperSlide>
                    {nextRooster && <SwiperSlide>
                        <div className="rooster_slide_value rooster_id_value">{nextRooster.id}</div>
                        <IonChip color={nextRooster.color?.toLocaleLowerCase()}>
                            <IonLabel color={nextRooster.color?.toLocaleLowerCase()}>{t("color_"+nextRooster.color?.toLocaleLowerCase())}</IonLabel>
                        </IonChip>
                        <div className="rooster_slide_value">{nextRooster.initials}</div>
                    </SwiperSlide>}
                    <IonButton id="swiper-back" fill="clear" disabled={!prevRooster}>
                        <IonIcon slot="icon-only" icon={chevronBack} color="dark"/>
                    </IonButton>
                    <IonButton id="swiper-forward" fill="clear" disabled={!nextRooster}>
                        <IonIcon slot="icon-only" icon={chevronForward} color="dark"/>
                    </IonButton>
                </Swiper>
                <IonGrid>
                    <IonRow>
                        <IonCol size="4">
                            <div className="rooster_value_label">{t('feather')}</div>
                            <div className="rooster_value">{rooster?.feather}</div>
                        </IonCol>
                        <IonCol size="4">
                            <div className="rooster_value_label">{t('crest')}</div>
                            <div className="rooster_value">{rooster?.crest}</div>
                        </IonCol>
                        <IonCol size="4">
                            <div className="rooster_value_label">{t('fecha')}</div>
                            <div className="rooster_value">{rooster?.fecha}</div>
                        </IonCol>
                    </IonRow>
                    <IonRow style={{textAlign: 'center'}}>
                        <IonCol size="5">
                            <div className="rooster_parent rooster_mother" data-title={t('mother')}>{rooster?.mother_id} {rooster?.mother_initials}</div>
                            <div className="rooster_parent_arrow"/>
                            <div className="rooster_parent rooster_mother" data-title={t('abuelo_materna')}>{rooster?.mother_mother_id} {rooster?.mother_mother_initials}</div>
                            <div className="rooster_parent rooster_father" data-title={t('abuela_materna')}>{rooster?.mother_father_id} {rooster?.mother_father_initials}</div>
                        </IonCol>
                        <IonCol size="5" offset="2">
                            <div className="rooster_parent rooster_father" data-title={t('father')}>{rooster?.father_id} {rooster?.father_initials}</div>
                            <div className="rooster_parent_arrow"/>
                            <div className="rooster_parent rooster_mother" data-title={t('abuelo_paterna')}>{rooster?.father_mother_id} {rooster?.father_mother_initials}</div>
                            <div className="rooster_parent rooster_father" data-title={t('abuela_paterna')}>{rooster?.father_father_id} {rooster?.father_father_initials}</div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <div className="placa_official">
                    <p>{t('owner')}</p>
                    <p>{t('placa_official')}</p>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol size="6">{t('estado')}:</IonCol>
                        <IonCol size="6" className="rooster_status">{t('status_'+rooster?.estado)}</IonCol>
                    </IonRow>
                </IonGrid>
                {rooster?.notes && <>
                    <div className="rooster_notes">{t('notes')}</div>
                    <div className="rooster_notes_value">{rooster?.notes}</div>
                </>}
                <AddRoosterForm
                    rooster={rooster}
                    mode={editRooster ? 2 : 0}
                    setMode={(newValue:number) => setEditRooster(!!newValue)}
                    fetchRoosters={fetchLocalRoosters}
                />
            </IonContent>
        </IonPage>
    );
};

export default RoosterPage;
