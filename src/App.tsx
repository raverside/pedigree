import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { setDefaultLanguage, setDefaultTranslations } from 'react-multi-lang';
import staticESP from './translations/esp.json';
import RoostersPage from './pages/RoostersPage';
import RoosterPage from './pages/RoosterPage';
import SideMenu from './components/SideMenu';

import DBConfig from './IndexedDBConfig';
import { initDB } from 'react-indexed-db';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* General Styling */
import './theme/AppStyle.css';

setupIonicReact({mode: 'md'});

setDefaultTranslations({esp: staticESP});
const defaultLang = 'esp';
const currentLang = defaultLang;
setDefaultLanguage(currentLang);

initDB(DBConfig);

const App: React.FC = () => (
    <IonApp>
        <SideMenu />
        <IonReactRouter>
            <IonRouterOutlet id="main_content">
                <Route exact path="/">
                    <RoostersPage />
                </Route>
                <Route path="/rooster/:id">
                    <RoosterPage />
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
