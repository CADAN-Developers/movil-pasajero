import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg, IonInput } from '@ionic/react';
import { documentLockSharp, call, ellipsisHorizontalOutline, personOutline, personSharp } from 'ionicons/icons';
import { Pasajero } from "../../models/pasajero.models";


const Cuenta: React.FC<{ pasajero: Pasajero }> = ({ pasajero }) => {

    const [datos, setDatos] = useState<Pasajero>(pasajero);

    const handleChange = (prop: any) => (event: any) => {
        setDatos({ ...datos, [prop]: event.target.value });
        console.log(datos);

    };

    return (


        <IonContent>
            <IonCard no-lines id="card-center">
                <IonImg src={pasajero.foto} />
                <IonCardHeader>
                    <IonCardSubtitle>{pasajero.universidad}</IonCardSubtitle>
                    <IonCardTitle>¡Hola <strong>{pasajero.nombre}  {pasajero.apellidos} </strong>!</IonCardTitle>
                </IonCardHeader>

            </IonCard>

            <IonCard>
                <IonItem>

                    <IonButton fill="outline" >Carné: <strong>{pasajero.carne}</strong></IonButton>
                </IonItem>

            </IonCard>

            <IonCard>
                <IonItem >
                    <IonLabel position="stacked">Nombre</IonLabel>
                    <IonIcon icon={personOutline} slot="start" />
                    <IonInput disabled>{pasajero.nombre}</IonInput>
                </IonItem>

                <IonItem >
                    <IonLabel position="stacked">Apellido</IonLabel>
                    <IonIcon icon={personSharp} slot="start" />
                    <IonInput disabled>{pasajero.apellidos}</IonInput>
                </IonItem>

                <IonItem >
                    <IonLabel position="stacked">{pasajero.tipoDocumento}</IonLabel>
                    <IonIcon icon={documentLockSharp} slot="start" />
                    <IonInput disabled>{pasajero.documento}</IonInput>
                </IonItem>

                <IonItem color="light" className="ion-activated">
                    <IonLabel position="stacked">Telefono</IonLabel>
                    <IonIcon icon={call} slot="start" />
                    <IonInput id="telefono" value={pasajero.telefono} placeholder="Escriba..." onChange={handleChange('telefono')}></IonInput>
                </IonItem>

                <IonItem color="light" className="ion-activated">
                    <IonLabel position="stacked">Contraseña</IonLabel>
                    <IonIcon icon={ellipsisHorizontalOutline} slot="start" />
                    <IonInput type="password" id="clave" placeholder="Confirme contraseña..." onChange={handleChange('clave')}></IonInput>
                </IonItem>
                <IonButton expand="full">Actualizar Datos</IonButton>

            </IonCard>
        </IonContent>
    );
}

export default Cuenta;