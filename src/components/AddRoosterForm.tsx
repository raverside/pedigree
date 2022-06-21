import {useState, useEffect} from 'react';
import { IonModal, IonButtons, IonButton, IonTitle, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonInput, IonTextarea, IonSelect, IonSelectOption } from '@ionic/react';
import './AddRoosterForm.css';
import RoosterRecordType from "../types/RoosterRecordType";
import RoosterColorSelect from './RoosterColorSelect';
import {useTranslation} from "react-multi-lang";
import { useIndexedDB } from 'react-indexed-db';

interface ContainerProps {
    rooster?: RoosterRecordType;
    mode: number;
    setMode: (newValue: number) => void;
    fetchRoosters: () => void;
}

const AddRoosterForm: React.FC<ContainerProps> = ({rooster, mode, setMode, fetchRoosters}) => {
    const t = useTranslation();
    const [formData, setFormData] = useState<RoosterRecordType>();
    const {add, update} = useIndexedDB('roosters');

    useEffect(() => {
        setFormData(rooster);
    }, [rooster])

    const isFormValid = () => {
        if (
            !formData ||
            !formData.id ||
            !formData.initials ||
            !formData.feather ||
            !formData.crest ||
            !formData.fecha ||
            !formData.mother_id ||
            !formData.mother_color ||
            !formData.mother_initials ||
            !formData.mother_mother_id ||
            !formData.mother_mother_initials ||
            !formData.mother_father_id ||
            !formData.mother_father_initials ||
            !formData.father_id ||
            !formData.father_color ||
            !formData.father_initials ||
            !formData.father_mother_id ||
            !formData.father_mother_initials ||
            !formData.father_father_id ||
            !formData.father_father_initials
        ) return false;

        return true;
    }

    const Submit = async () => {
        if (!isFormValid()) return false;
        (rooster?.id ? update(formData) : add(formData)).then(() => fetchRoosters());
        setMode(0);
    }

    return (<>
        <IonModal className="rooster_form" isOpen={mode === 2} onDidDismiss={() => setMode(0)}>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton color="danger" onClick={() => setMode(0)}>{t("cancel")}</IonButton>
                </IonButtons>
                <IonTitle><b>{rooster?.id ? t("edit_record") : t("add_single_record")}</b></IonTitle>
                <IonButtons slot="end">
                    <IonButton disabled={!isFormValid()} color="success" onClick={Submit}>{t("done")}</IonButton>
                </IonButtons>
            </IonToolbar>
            <IonContent>
                <div className="rooster_form_title">{t("ID")}</div>
                <IonGrid>
                    <IonRow>
                        <IonCol size="4"><IonInput readonly={!!rooster?.id} value={formData?.id} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, id: +e.detail.value!}))} type="number" placeholder={(t("id_number"))}/></IonCol>
                        <IonCol size="4">
                            <RoosterColorSelect value={formData?.color || "red"} setValue={(newValue) => setFormData((currentFormData) => ({...currentFormData, color: newValue}))} />
                        </IonCol>
                        <IonCol size="4"><IonInput value={formData?.initials} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, initials: e.detail.value!}))} placeholder={(t("initials"))}/></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="4"><IonInput value={formData?.feather} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, feather: e.detail.value!}))} placeholder={(t("feather"))}/></IonCol>
                        <IonCol size="4"><IonInput value={formData?.crest} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, crest: e.detail.value!}))} placeholder={(t("crest"))}/></IonCol>
                        <IonCol size="4"><IonInput value={formData?.fecha} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, fecha: e.detail.value!}))} placeholder={(t("fecha"))}/></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonSelect value={formData?.estado || "in_farm"} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, estado: e.detail.value!}))} placeholder={(t("estado"))}>
                                <IonSelectOption value="in_farm">{t("status_in_farm")}</IonSelectOption>
                                <IonSelectOption value="sold">{t("status_sold")}</IonSelectOption>
                                <IonSelectOption value="lend">{t("status_lend")}</IonSelectOption>
                                <IonSelectOption value="gifted">{t("status_gifted")}</IonSelectOption>
                                <IonSelectOption value="dead">{t("status_dead")}</IonSelectOption>
                            </IonSelect>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <div className="form_divider"/>

                <div className="rooster_form_title">{t("mother")}</div>
                <IonGrid>
                    <IonRow>
                        <IonCol size="4"><IonInput value={formData?.mother_id} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, mother_id: +e.detail.value!}))} type="number" placeholder={(t("id_number"))}/></IonCol>
                        <IonCol size="4">
                            <RoosterColorSelect value={formData?.mother_color || "red"} setValue={(newValue) => setFormData((currentFormData) => ({...currentFormData, mother_color: newValue}))} />
                        </IonCol>
                        <IonCol size="4"><IonInput value={formData?.mother_initials} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, mother_initials: e.detail.value!}))} placeholder={(t("initials"))}/></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">
                            <IonRow><div className="abuelo">{t("abuelo_materna")}</div></IonRow>
                            <IonRow>
                                <IonCol size="6"><IonInput value={formData?.mother_mother_id} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, mother_mother_id: +e.detail.value!}))} type="number" placeholder={(t("id_number"))}/></IonCol>
                                <IonCol size="6"><IonInput  value={formData?.mother_mother_initials} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, mother_mother_initials: e.detail.value!}))} placeholder={(t("initials"))}/></IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol size="6">
                            <IonRow><div className="abuelo">{t("abuela_materna")}</div></IonRow>
                            <IonRow>
                                <IonCol size="6"><IonInput value={formData?.mother_father_id} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, mother_father_id: +e.detail.value!}))} type="number" placeholder={(t("id_number"))}/></IonCol>
                                <IonCol size="6"><IonInput value={formData?.mother_father_initials} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, mother_father_initials: e.detail.value!}))} placeholder={(t("initials"))}/></IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <div className="form_divider"/>

                <div className="rooster_form_title">{t("father")}</div>
                <IonGrid>
                    <IonRow>
                        <IonCol size="4"><IonInput value={formData?.father_id} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, father_id: +e.detail.value!}))} type="number" placeholder={(t("id_number"))}/></IonCol>
                        <IonCol size="4">
                            <RoosterColorSelect value={formData?.father_color || "red"} setValue={(newValue) => setFormData((currentFormData) => ({...currentFormData, father_color: newValue}))} />
                        </IonCol>
                        <IonCol size="4"><IonInput value={formData?.father_initials} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, father_initials: e.detail.value!}))} placeholder={(t("initials"))}/></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">
                            <IonRow><div className="abuelo">{t("abuelo_paterna")}</div></IonRow>
                            <IonRow>
                                <IonCol size="6"><IonInput value={formData?.father_mother_id} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, father_mother_id: +e.detail.value!}))} type="number" placeholder={(t("id_number"))}/></IonCol>
                                <IonCol size="6"><IonInput value={formData?.father_mother_initials} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, father_mother_initials: e.detail.value!}))} placeholder={(t("initials"))}/></IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol size="6">
                            <IonRow><div className="abuelo">{t("abuela_paterna")}</div></IonRow>
                            <IonRow>
                                <IonCol size="6"><IonInput value={formData?.father_father_id} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, father_father_id: +e.detail.value!}))} type="number" placeholder={(t("id_number"))}/></IonCol>
                                <IonCol size="6"><IonInput value={formData?.father_father_initials} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, father_father_initials: e.detail.value!}))} placeholder={(t("initials"))}/></IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <div className="form_divider"/>

                <div className="rooster_form_title">{t("notes")}</div>
                <IonGrid>
                    <IonRow>
                        <IonCol><IonTextarea  value={formData?.notes} onIonChange={(e) => setFormData((currentFormData) => ({...currentFormData, notes: e.detail.value!}))} placeholder={t("notes_placeholder")}/></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol style={{textAlign: "center"}}>
                            <IonButton color="dark" disabled={!isFormValid()} onClick={Submit} className="submit_record_button">{rooster?.id ? t("save_record") : t("add_record")}</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    </>);
};

export default AddRoosterForm;
