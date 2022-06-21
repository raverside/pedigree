import { IonPopover, IonButton } from '@ionic/react';
import './AddRoosterModeSelector.css';
import {useTranslation} from "react-multi-lang";

interface ContainerProps {
    mode: number;
    setMode: (newValue: number) => void;
}

const AddRoosterModeSelector: React.FC<ContainerProps> = ({mode, setMode}) => {
    const t = useTranslation();

    return (<>
        <IonPopover className="mode_selector_popover" isOpen={mode === 1} onDidDismiss={() => mode === 1 && setMode(0)}>
            <div className="popover_title">{t('add_records')}</div>
            <IonButton color="dark" className="add_records_button" onClick={() => setMode(2)}>{t("add_records_single")}</IonButton>
            <div className="add_records_or">{t("add_records_or")}</div>
            <IonButton disabled color="dark" className="add_records_button" onClick={() => setMode(3)}>{t("add_records_multiple")}</IonButton>
        </IonPopover>
    </>);
};

export default AddRoosterModeSelector;
