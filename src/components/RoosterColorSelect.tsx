import { IonSelect, IonSelectOption } from '@ionic/react';
import {useTranslation} from "react-multi-lang";

interface ContainerProps {
    value: string;
    setValue: (newValue: string) => void;
}

const RoosterColorSelect: React.FC<ContainerProps> = ({value, setValue}) => {
    const t = useTranslation();

    return (<IonSelect value={value} onIonChange={(e) => setValue(e.detail.value!)} placeholder={(t("id_color"))}>
        <IonSelectOption value="red">{t("color_red")}</IonSelectOption>
        <IonSelectOption value="green">{t("color_green")}</IonSelectOption>
        <IonSelectOption value="yellow">{t("color_yellow")}</IonSelectOption>
        <IonSelectOption value="orange">{t("color_orange")}</IonSelectOption>
        <IonSelectOption value="black">{t("color_black")}</IonSelectOption>
        <IonSelectOption value="silver">{t("color_silver")}</IonSelectOption>
        <IonSelectOption value="gold">{t("color_gold")}</IonSelectOption>
        <IonSelectOption value="purple">{t("color_purple")}</IonSelectOption>
        <IonSelectOption value="white">{t("color_white")}</IonSelectOption>
        <IonSelectOption value="blue">{t("color_blue")}</IonSelectOption>
    </IonSelect>);
};

export default RoosterColorSelect;
