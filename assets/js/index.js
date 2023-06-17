/*import dos controladores*/
import * as formController from './controller/form-controller.js';
import * as listController from './controller/list-controller.js';
import * as modalController from './controller/modal-controller.js';
import * as pageController from './controller/page-controller.js';

/*Chamada para as funções do sistema.*/
formController.init();
listController.init();
modalController.init();
pageController.init();