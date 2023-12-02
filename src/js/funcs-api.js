import { fetchData } from "./funcs";
import { saveImageLs } from "./funcs-ls";
import { buttonSaveElement, breedListElement, subBreedListElement, labelSubBreedElement } from "./elements-dom";

// FUNCION PARA RECIBIR IMAGENES DE LA API Y PINTAR DEPENDIENDO DE LA RAZA O SUBRAZA SELECCIONADA
export const getImagesDog = async (breed, subbreed) => {
    try {
        if (subbreed === '') {
            const data = await fetchData(`https://dog.ceo/api/breed/${breed}/images`);
            const imageUrls = data.message;

            const randomNumber = Math.floor(Math.random() * imageUrls.length);
            const imageDogElement = document.getElementById('image');
            imageDogElement.src = imageUrls[randomNumber];

            const saveButton = document.getElementById('button-save');
            saveButton.addEventListener('click', () => {
                saveImageLs(randomNumber, imageUrls);
            });
        } else {
            const data = await fetchData(`https://dog.ceo/api/breed/${breed}/${subbreed}/images`);
            const imageUrls = data.message;
            const randomNumber = Math.floor(Math.random() * imageUrls.length);
            const imageDogElement = document.getElementById('image');
            imageDogElement.src = imageUrls[randomNumber];
            const saveButton = document.getElementById('button-save');
            saveButton.addEventListener('click', () => {
                saveImageLs(randomNumber, imageUrls);
            });
        }
    } catch (error) {
        console.log(error);
    }
    buttonSaveElement.classList.remove('hide');
    buttonSaveElement.classList.add('show');
};

// FUNCION PARA PINTAR LAS OPCIONES CON LAS RAZAS DE LA API
export const fillInBreeds = (data) => {
    const breeds = Object.keys(data.message);
    for (let i = 0; i < breeds.length; i++) {
        const breed = breeds[i];
        const subBreeds = data.message[breed];

        const nameOfBreed = document.createElement('option');
        nameOfBreed.textContent = breed;

        if (subBreeds.length > 0) {
            nameOfBreed.dataset.hasSubBreeds = true;
        }
        breedListElement.append(nameOfBreed);
    }

    // EVENTO DE CAMBIO PARA EL SELECT DE SUBRAZAS
    breedListElement.addEventListener('change', (e) => {
        const selectedBreed = e.target.value;
        const hasSubBreeds = e.target.options[e.target.selectedIndex].dataset.hasSubBreeds;
        const subBreeds = data.message[selectedBreed];

        subBreedListElement.textContent = '';

        if (hasSubBreeds && subBreeds.length > 0) {
            if (subBreeds.length > 1) {
                const defaultOption = document.createElement('option');
                defaultOption.textContent = 'Selecciona una subraza';
                subBreedListElement.append(defaultOption);
            }

            for (let j = 0; j < subBreeds.length; j++) {
                const nameOfSubBreed = document.createElement('option');
                nameOfSubBreed.textContent = subBreeds[j];
                subBreedListElement.append(nameOfSubBreed);
            }
            labelSubBreedElement.classList.remove('hide');
            labelSubBreedElement.classList.add('show');
            subBreedListElement.classList.remove('hide');
            subBreedListElement.classList.add('show');
        } else {
            labelSubBreedElement.classList.remove('show');
            labelSubBreedElement.classList.add('hide');
            subBreedListElement.classList.remove('show');
            subBreedListElement.classList.add('hide');
        }
    });

};