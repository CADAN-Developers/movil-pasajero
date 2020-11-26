import Menu from './components/menu/Menu';
import Page from './pages/Page';
import Login from "./components/login/login";
import React, { useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

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
import { Pasajero } from './models/pasajero.models';

// para peticiones
import axios from 'axios';
const URL = `http://localhost:8080/api/v1`;

const App: React.FC = () => {

  // const [persona, setPersona] = useState<Pasajero>({
  //   nombre:'',
  //   apellidos:'',
  //   carne:'',
  //   clave:'',
  //   correo:'',
  //   documento:'',
  //   foto:'',
  //   saldo:0,
  //   telefono:'',
  //   tipoDocumento:'',
  //   tipoUsuario:'',
  //   universidad:'',
  // });

  // useIonViewDidEnter(async () => {
  //   const result = await axios(URL+'/usuarios/'+localStorage.email);
  //   await setPersona(result.data);
  //   console.log(persona);

  // });


  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">

            <Route path="/" component={Login} exact />

            <Route path="/page/:name" component={Page} exact />

            {/* <Redirect from="/" to="/page/cuenta" exact /> */}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
