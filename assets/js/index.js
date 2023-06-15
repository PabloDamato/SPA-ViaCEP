/*import dos controladores*/
import * as formController from './controller/form-controller.js';
import * as listController from './controller/list-controller.js';
import * as modalController from './controller/modal-controller.js';
import * as pageController from './controller/page-controller.js';

/*chama a função init para selecionar os elementos do formulário*/
formController.init();
listController.init();
modalController.init();
pageController.init();





/* const inputCep = document.forms.newAddress.cep;
console.log(inputCep); */