import { containerLsImagesElement } from "./elements-dom";
// FUNCION PARA OBTENER LA IMAGEN DEL LS Y PINTARLA EN EL CONTAINER DE FAVORITAS
export const displaySavedImagesLs = () => {
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    savedImages.forEach(imageUrl => {
        createImageElement(imageUrl);
    });
};


// FUNCION PARA CREAR CONTENEDOR CON LA IMAGEN FAVORITA Y PODER ELIMINARLA
const createImageElement = (imageUrl) => {
    const imageContainerElement = document.createElement('div');
    imageContainerElement.classList.add('fav-images');
    const img = document.createElement('img');
    const button = document.createElement('button');
    button.classList.add('fav-btn');
    button.textContent = 'Quitar de favoritos';
    img.src = imageUrl;
    button.addEventListener('click', () => {
        const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
        const updatedImages = savedImages.filter(savedImage => savedImage !== imageUrl);
        localStorage.setItem('savedImages', JSON.stringify(updatedImages));
        imageContainerElement.remove();
    });

    imageContainerElement.append(img);
    imageContainerElement.append(button);
    containerLsImagesElement.append(imageContainerElement);
};

// FUNCION PARA GUARDAR LA IMAGEN EN EL LOCAL STORAGE Y QUE NO SE REPITAN
export const saveImageLs = (number, imageUrls) => {
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    const imageUrlToAdd = imageUrls[number];
    const imageExists = savedImages.some(image => image === imageUrlToAdd);

    if (!imageExists) {
        savedImages.push(imageUrlToAdd);
        localStorage.setItem('savedImages', JSON.stringify(savedImages));
        createImageElement(imageUrlToAdd);
    }
};