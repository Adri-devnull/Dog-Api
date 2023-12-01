// Crea un select vacío en tu HTML 
// Rellena las opciones con una petición de razas a la API
// Si la raza tiene subrazas, deberá aparecer un segundo select con la lista de subrazas.
// En el caso de que sólo tenga una subraza, aparecerá directamente seleccionada en el segundo select, si tuviera más de una subraza en el select aparecerá como primera opción "seleccione una subraza" y al desplegar veremos el resto de subrazas.


// Añade un botón en el HTML que te permita generar una foto random de un perro de la raza que hayas seleccionado.
// Añade un botón a cada imagen que te permita guardarla como favorita en el LocalStorage
// Las
// imágenes favoritas siempre se mostrarán en la web y tendrán un botón de
// "quitar favorito" lo cual la eliminará del LocalStorage

// ELEMENTOS DEL DOM
const breedListElement = document.getElementById('breedList');
const subBreedListElement = document.getElementById('subBreedList');
const randomDogBtnElement = document.getElementById('button');
const labelSubBreedElement = document.getElementById('label-subbreed');
const buttonSaveElement = document.getElementById('button-save');
const containerLsImagesElement = document.getElementById('container-local-storage');

// FUNCION PARA PINTAR EL ERROR
const printError = (err) => console.log(err);

// FUNCION PARA OBTENER DATOS DE LA API
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        printError(error);
    }
};

// FUNCION PARA RELLENAR LAS OPCIONES CON LAS RAZAS DE LA API
const fillInOptions = async () => {
    try {
        const data = await fetchData('https://dog.ceo/api/breeds/list/all');
        fillInBreeds(data);
    } catch (error) {
        printError(error);
    }
};

// LLAMADA A LA FUNCION PARA MOSTRAR SELECT CON LAS RAZAS DISPONIBLES
fillInOptions();

// FUNCION PARA GUARDAR LA IMAGEN EN EL LS
const saveImageLs = (number, imageUrls) => {
    let savedImages = JSON.parse(localStorage.getItem('savedImages'));
    if (!savedImages) {
        savedImages = [];
    }
    savedImages.push(imageUrls[number]);
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
};


// FUNCION PARA RECIBIR IMAGENES DE LA API Y PINTAR DEPENDIENDO DE LA RAZA O SUBRAZA SELECCIONADA
const getImagesDog = async (breed, subbreed) => {
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
        printError(error);
    }
    buttonSaveElement.classList.remove('hide');
    buttonSaveElement.classList.add('show');
};

// FUNCION PARA CUANDO CARGUE LA PAGINA PINTAR LAS IMAGENES QUE ESTEN GUARDADAS EN EL LS 
const getImagesLs = () => {
    const lsImages = JSON.parse(localStorage.getItem('savedImages'));
    if (!lsImages || lsImages.length === 0) {
        return;
    }

    lsImages.forEach((image, index) => {
        const imageContainerElement = document.createElement('div');
        const img = document.createElement('img');
        const button = document.createElement('button');
        button.textContent = 'X';
        img.src = image;
        button.addEventListener('click', () => {
            lsImages.splice(index, 1);
            localStorage.setItem('savedImages', JSON.stringify(lsImages));
            imageContainerElement.remove();
        });

        imageContainerElement.append(img);
        imageContainerElement.append(button);
        containerLsImagesElement.append(imageContainerElement);
    });
}


// LLAMADA A LA FUNCION PARA MOSTRAR IMAGENES FAVORITAS GUARDADAS EN EL LS
getImagesLs()


// FUNCION PARA PINTAR LAS OPCIONES CON LAS RAZAS DE LA API
const fillInBreeds = (data) => {
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

// LLAMAMOS AL EVENTO DE ESCUCHA PARA PINTAR LA IMAGEN
randomDogBtnElement.addEventListener('click', () => {
    const selectedBreed = breedListElement.value;
    const selectedSubBreed = subBreedListElement.value;
    getImagesDog(selectedBreed, selectedSubBreed);
});
