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
const imageDogElement = document.getElementById('image');


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

fillInOptions();

// FUNCION PARA RECIBIR LAS IMAGENES DE LA API
const getImagesDog = async (breed) => {
    try {
        const data = await fetchData('https://dog.ceo/api/breeds/image/random/50')
        const imageUrls = data.message;

        imageUrls.forEach(imageUrl => {
            if (imageUrl.includes(breed)) {
                console.log('contiene la raza', imageUrl);
                imageDogElement.src = imageUrl;
            }
        });

    } catch (error) {
        printError(error)
    }
};


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
            subBreedListElement.classList.remove('hide');
            subBreedListElement.classList.add('show');
        } else {
            subBreedListElement.classList.remove('show');
            subBreedListElement.classList.add('hide');
        }
    });

};

randomDogBtnElement.addEventListener('click', () => {
    const selectedBreed = breedListElement.value;
    getImagesDog(selectedBreed);
});
