import { fillInOptions } from "./funcs";
import { displaySavedImagesLs} from "./funcs-ls";
import { randomDogBtnElement, breedListElement, subBreedListElement } from "./elements-dom";
import { getImagesDog } from "./funcs-api";

// LLAMADA A LA FUNCION PARA MOSTRAR LOS SELECT CON LAS RAZAS DISPONIBLES
fillInOptions();

// LLAMADA A LA FUNCION PARA PINTAR LAS IMAGENES QUE ESTEN GUARDADAS EN EL LS NADA MAS INICIA O RECARGA LA PAGINA
displaySavedImagesLs();

// LLAMAMOS AL EVENTO DE ESCUCHA PARA PINTAR LA IMAGEN DEPENDIENDO DE LA RAZA SELECCIONADA
randomDogBtnElement.addEventListener('click', () => {
    const selectedBreed = breedListElement.value;
    const selectedSubBreed = subBreedListElement.value;
    getImagesDog(selectedBreed, selectedSubBreed);
});
