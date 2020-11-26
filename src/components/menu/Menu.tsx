import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  useIonViewDidEnter,
  useIonViewWillEnter
} from '@ionic/react';

import React, { useState } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { personSharp, personOutline, carSportOutline,carSportSharp, cardOutline, cardSharp , peopleCircleOutline, peopleCircleSharp , giftOutline, giftSharp, helpCircleOutline, helpCircleSharp, logOutOutline, logOutSharp } from 'ionicons/icons';
import './Menu.css';
import { Pasajero } from '../../models/pasajero.models';

import { getRequest } from "../../providers/api_request/api-request";

import Logo  from "../../img/logo.png";




interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  rol: string;
}

const appPages: AppPage[] = [
  {
    title: 'Mi cuenta',
    url: '/page/cuenta',
    iosIcon: personOutline,
    mdIcon: personSharp,
    rol: 'ambos'
  },
  {
    title: 'Viajar',
    url: '/page/viajar',
    iosIcon: carSportOutline,
    mdIcon: carSportSharp,
    rol: 'pasajero'
  },
  {
    title: 'Pagos',
    url: '/page/pagos',
    iosIcon: cardOutline,
    mdIcon: cardSharp,
    rol: 'ambos'
  },
  {
    title: 'Mis viajes',
    url: '/page/viajes',
    iosIcon: peopleCircleOutline,
    mdIcon: peopleCircleSharp,
    rol: 'ambos'
  },
  {
    title: 'Pormociones',
    url: '/page/promociones',
    iosIcon: giftOutline,
    mdIcon: giftSharp,
    rol: 'pasajero'
  },
  {
    title: 'Ayuda',
    url: '/page/ayuda',
    iosIcon: helpCircleOutline,
    mdIcon: helpCircleSharp,
    rol: 'ambos'
  }
];


const Menu: React.FC = () => {


  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.replace("/")
  }

  const location = useLocation();

  const logo = Logo;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('pasajero') ? true : false);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
      <IonImg src={logo} />
        <IonList id="inbox-list">
        

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonMenuToggle autoHide={false}>
          <IonItem onClick={handleLogout} routerDirection="none" lines="none" detail={false}>
            <IonIcon slot="start" ios={logOutSharp} md={logOutOutline} />
            <IonLabel>Cerrar sesión</IonLabel>
          </IonItem>
        </IonMenuToggle>


      </IonContent>
      {!isLoggedIn ?
        <Route>
          <Redirect
            to={{
              pathname: "/",

            }}
          />

        </Route>
        :
        null
      }
    </IonMenu>
  );
};

export default Menu;
