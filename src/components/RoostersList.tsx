import {useState} from 'react';
import { IonSearchbar } from '@ionic/react';
import {IonList, IonListHeader, IonItem, IonGrid, IonRow, IonCol, IonChip, IonLabel, IonSegment, IonSegmentButton} from '@ionic/react';
import './RoostersList.css';
import {useTranslation} from "react-multi-lang";
import RoosterRecordType from "../types/RoosterRecordType";

interface ContainerProps {
    roosters: RoosterRecordType[];
}

const RoostersList: React.FC<ContainerProps> = ({roosters}) => {
    const t = useTranslation();
    const [search, setSearch] = useState<string>("");
    const [color, setColor] = useState<string>("all");
    const allColors = Array.from(new Set(roosters.map(r => r.color))); //unique existing colors
    const filteredRoosters = roosters
        .filter(r => r.id === +search || t("color_"+r.color).toLowerCase().includes(search.toLowerCase()) || r.initials?.toLowerCase().includes(search.toLowerCase()))
        .filter(r => r.color === color || color === "all");

    return (<>
        <IonSearchbar placeholder={t('search_id')} value={search} onIonChange={(e) => setSearch(e.detail.value!)}/>
        {allColors.length > 0 && <IonGrid className="color_folders">
            <IonRow>
                <IonCol size="3" className="color_folders_title">{t('color_folders')}:</IonCol>
                <IonCol size="9">
                    <IonSegment value={color} scrollable color="dark" onIonChange={(e) => setColor(e.detail.value!)}>
                        <IonSegmentButton key="all" value="all"><IonChip color="all">{t('color_all')}</IonChip></IonSegmentButton>
                        {allColors.map(c => <IonSegmentButton key={c} value={c}>
                            <IonChip color={c}>{t('color_'+c)}</IonChip>
                        </IonSegmentButton>)}
                    </IonSegment>
                </IonCol>
            </IonRow>
        </IonGrid>}
        {filteredRoosters.length > 0 ? <IonList className="roosters_list">
            <IonListHeader>
                <IonGrid>
                    <IonRow>
                        <IonCol size="3">{t("id")}</IonCol>
                        <IonCol size="3">{t("id_color")}</IonCol>
                        <IonCol size="3">{t("initials")}</IonCol>
                        <IonCol size="3">{t("estado")}</IonCol>
                    </IonRow>
                </IonGrid>
            </IonListHeader>
            {filteredRoosters.map((r) => <IonItem key={r.id} routerLink={"/rooster/"+r.id}>
                <IonGrid>
                    <IonRow>
                        <IonCol size="3" className="rooster_id">{r.id}</IonCol>
                        <IonCol size="3">
                            <IonChip color={r.color?.toLocaleLowerCase()}>
                                <IonLabel color={r.color?.toLocaleLowerCase()}>{t("color_"+r.color?.toLocaleLowerCase())}</IonLabel>
                            </IonChip>
                        </IonCol>
                        <IonCol size="3" className="rooster_initials">{r.initials}</IonCol>
                        <IonCol size="3" className={"rooster_estado status_"+r.estado}>{t("status_"+r.estado)}</IonCol>
                    </IonRow>
                    {r.notes && <IonRow className="rooster_notes">
                        <IonCol offset="1" size="9">{r.notes}</IonCol>
                    </IonRow>}
                </IonGrid>
            </IonItem>)}
        </IonList> : <div className="no_records">{t("no_records")}</div>}
    </>);
};

export default RoostersList;
