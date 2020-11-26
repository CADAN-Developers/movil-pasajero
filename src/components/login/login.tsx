import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';

import { personCircle } from 'ionicons/icons';
import React, { useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router';

// para peticiones
import { getRequest } from "../../providers/api_request/api-request";

// models
import { Pasajero } from '../../models/pasajero.models';

// imagenes
import Logo from "../../img/logo.png";

// style
import "./login.css"


function validateEmail(email: string) {
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
}

const Login: React.FC = () => {

    const history = useHistory();
    const [email, setEmail] = useState<string>("juan@mail.com");
    const [password, setPassword] = useState<string>("123");
    const [pasajero, setPasajero] = useState<string>("");
    const [iserror, setIserror] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('pasajero') ? true : false);
    const [message, setMessage] = useState<string>("");

    const logo = Logo;

    // const handleLogin = (async () => {
    //     const result = await fetch('https://uifaces.co/api?limit=25', {
    //         headers: {'x-API-KEY': '873771d7760b846d51d025ac5804ab'}
    //     })

    //     const data = await result.json();
    //     console.log(data);
        
    // })

    const handleLogin = () => {
        if (!email) {
            setMessage("Please enter a valid email");
            setIserror(true);
            return;
        }
        if (validateEmail(email) === false) {
            setMessage("Your email is invalid");
            setIserror(true);
            return;
        }

        if (!password || password.length < 2) {
            setMessage("Please enter your password");
            setIserror(true);
            return;
        }

        const loginData = {
            "email": email,
            "password": password
        }

        


        getRequest("usuarios/" + email, '', false)
            .then(res => {
                if (res.data !== "" && res.data !== undefined) {
                    let pasajero: Pasajero = res.data;

                    if (pasajero.tipoUsuario === "pasajero" && pasajero.clave === password) {

                        localStorage.setItem('pasajero', JSON.stringify(pasajero));
                        // localStorage.setItem('nombre', pasajero.nombre + pasajero.apellidos);
                        localStorage.setItem('email', pasajero.correo);
                        // localStorage.setItem('saldo', pasajero.carne);
                        setPasajero(JSON.stringify(pasajero));
                        setIsLoggedIn(true)
                        // history.push("/dashboard/" + email);
                    } else {
                        setMessage("Usuario o Contraseña incorrectas");
                        setIserror(true)
                    }

                } else {
                    setMessage("Usuario o Contraseña incorrectas");
                    setIserror(true)
                }

            })
            .catch(error => {
                console.log(error);

                setMessage("Error en el servidor, intente mas tarde.");
                setIserror(true)
            })
    };


    return (
        <IonContent  fullscreen className="ion-padding ion-text-center login">
          <div className="content">
            <IonGrid >
                <IonRow>
                    <IonCol>
                        <IonAlert
                            isOpen={iserror}
                            onDidDismiss={() => setIserror(false)}
                            cssClass="my-custom-class"
                            header={"Error!"}
                            message={message}
                            buttons={["Dismiss"]}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonIcon
                            style={{ fontSize: "70px", color: "#0040ff" }}
                            icon={personCircle}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Email</IonLabel>
                            <IonInput
                                type="email"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Password</IonLabel>
                            <IonInput
                                type="password"
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <p style={{ fontSize: "small", color: "white" }}>
                            By clicking LOGIN you agree to our <a href="#">Policy</a>
                        </p>
                        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
                        <p style={{ fontSize: "medium" , color: "white" }}>
                            Don't have an account? <a href="#">Sign up!</a>
                        </p>

                    </IonCol>
                </IonRow>

                <IonImg src={logo} />

            </IonGrid>
            </div>
            {isLoggedIn ?
                <Route>
                    <Redirect
                        to={{
                            pathname: "/page/cuenta",
                            state: { pasajero: pasajero }
                        }}
                    />

                </Route>
                :
                null
            }
        </IonContent>
    );
}

export default Login;