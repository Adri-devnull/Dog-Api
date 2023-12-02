// FUNCION PARA OBTENER DATOS DE LA API
import { fillInBreeds } from "./funcs-api";

export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

// FUNCION PARA RELLENAR LAS OPCIONES CON LAS RAZAS DE LA API
export const fillInOptions = async () => {
    try {
        const data = await fetchData('https://dog.ceo/api/breeds/list/all');
        fillInBreeds(data);
    } catch (error) {
        console.log(error);
    }
};