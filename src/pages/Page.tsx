import { IonApp, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import Cuenta from "../pages/cuenta/cuenta";
import './Page.css';

import { Pasajero } from "../models/pasajero.models";

// para peticiones
import { getRequest } from "../providers/api_request/api-request";

const Page: React.FC = () => {

  const [message, setMessage] = useState<string>("");
  const [iserror, setIserror] = useState<boolean>(false);

  const { name } = useParams<{ name: string; }>();

  const [persona, setPersona] = useState<Pasajero>({
    nombre: '',
    apellidos: '',
    carne: '',
    clave: '',
    correo: '',
    documento: '',
    foto: '',
    saldo: 0,
    telefono: '',
    tipoDocumento: '',
    tipoUsuario: '',
    universidad: '',
  });

  const [email, setEmail] = useState<String>(localStorage.getItem('email') ? localStorage.getItem('email') || '' : '');

  useIonViewDidEnter(async () => {
    await getRequest("usuarios/" + email, '', false)
      .then(res => {
        if (res.data !== "" && res.data !== undefined) {
          let pasajero =  res.data;
          console.log("usuario exisyenet");
           setPersona(pasajero);

        } else {
          setMessage("Sin usuario autenticado");
          setIserror(true)
        }

      })
      .catch(error => {
        console.log(error);

        setMessage("Error en el servidor, intente mas tarde.");
        setIserror(true)
      })



  })



  var contenido;
  if (name === 'cuenta') {
    contenido = <Cuenta pasajero={persona} />;
  } else {
    contenido = <ExploreContainer name={name} />;
  }

  return (
    <IonApp>
      
      <IonPage>

        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar >
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          {contenido}
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Page;
