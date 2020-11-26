import axios from "axios";

// const urlAPI = 'http://localhost:8080/api/v1/';
const urlAPI = 'http://18.224.109.19:8080/api/v1/';





let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
headers.append('Accept', 'application/json');
const options = { headers: headers, withCredintials: false };

export async function getRequest(path: string, data: any, isData: boolean) {
    if (isData) {
        return await axios.get(urlAPI + path, data);
    } else {
        return await axios.get(urlAPI + path, options);
    }

}

export async function postRequest(path: string, data: any, isData: boolean) {
    if (isData) {
        return await axios.post(urlAPI);
    } else {
        return await axios.post(urlAPI);
    }

}