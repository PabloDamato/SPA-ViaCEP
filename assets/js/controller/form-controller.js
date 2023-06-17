/* O código fornecido representa um módulo que lida com a manipulação de endereços em um formulário. */

/* Nesta seção, estão sendo importados os módulos, Address, addressService e ListController */
import Address from '../model/address.js';
import * as addressService from '../service/address-service.js';
import * as listController from './list-controller.js';

/* É definida uma função construtora chamada State. Essa função cria um objeto que representa o estado do módulo. */
function State() {
    this.Address = new Address();
    this.inputCep = null;
    this.errorCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.errorNumber = null;
    this.inputCity = null;
    this.btnSave = null;
    this.btnClear = null;
}

/* Cria-se uma instância do objeto State e a atribui a uma constante chamada state. 
Essa instância será usada para armazenar referências a elementos do formulário. */
const state = new State();

/* Criei uma função init que inicializa o módulo. Ela atribui valores às propriedades do objeto state, 
usando elementos do formulário e seletores para encontrar elementos específicos. Além disso, 
ela adiciona event listeners para lidar com as mudanças nos campos do formulário. 
Por fim, a função chama clearForm() e startForm() para limpar e iniciar o formulário, respectivamente. */
export function init() {
    /* Atribuição de valores às propriedades do objeto `state` com base nos elementos do formulário */
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;
    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;
    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');
    /* Adição de event listeners para os elementos do formulário */
    state.inputCep.addEventListener('change', handleInputCepChange);
    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.inputNumber.addEventListener('keyup', handleInputNumberkeyup);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);
    /* Chamada de funções para limpar e iniciar o formulário */
    clearForm();
    startForm();
    /* Mostra o objeto instanciado no console */
    console.log(state);
}

/* Essa função é chamada quando uma tecla é pressionada no campo inputNumber. 
Ela atualiza a propriedade number do objeto address no estado com o valor do campo inputNumber. */
function handleInputNumberkeyup(event) {
    state.address.number = event.target.value;
}

/* Essa função é chamada quando o valor do campo inputCep é alterado. 
Ela faz uma chamada assíncrona para o serviço addressService para obter um endereço com base no CEP fornecido. 
Se a chamada for bem-sucedida, o endereço retornado é atribuído aos campos inputStreet e inputCity, e o objeto address no estado é atualizado. 
Além disso, a função setFormError é chamada para remover qualquer mensagem de erro relacionada ao CEP e o foco é definido no campo inputNumber. 
Se a chamada falhar, os campos inputStreet e inputCity são limpos, uma mensagem de erro é exibida e o foco permanece no campo inputCep. */
async function handleInputCepChange(event) {
    const cep = event.target.value;
    try {
        const address = await addressService.findByCep(cep);
        state.inputStreet.value = address.street
        state.inputCity.value = address.city;
        state.address = address;
        setFormError("cep", "");
        state.inputNumber.focus();
    } catch (e) {
        state.inputStreet.value = "";
        state.inputCity.value = "";
        setFormError("cep", "Informe um CEP válido");
    }
}

/* Essa função é chamada quando o valor do campo inputNumber é alterado. 
Ela verifica se o campo está vazio e, se estiver, define uma mensagem de erro usando a função setFormError. 
Caso contrário, a mensagem de erro é removida. */
function handleInputNumberChange(event) {
    if (event.target.value == "") {
        setFormError("number", "Campo requerido");
    } else {
        setFormError("number", "");
    }
}

/* Essa função é chamada quando o botão "Limpar" é clicado. 
Ela cancela o evento padrão (evitando o envio do formulário) e chama a função clearForm() 
para limpar todos os campos e mensagens de erro do formulário. */
function handleBtnClearClick(event) {
    event.preventDefault();
    clearForm();
}

/* Essa função é chamada quando o botão "Salvar" é clicado. 
Ela cancela o evento padrão (evitando o envio do formulário) e verifica se existem erros no endereço atual no estado. 
A função addressService.getErrors é usada para obter os erros. Se houver erros, a função setFormError é chamada para exibir 
as mensagens de erro correspondentes. Caso contrário, a função listController.addCard é chamada para adicionar um novo 
cartão com o endereço ao controlador de lista e, em seguida, a função clearForm() é chamada para limpar os campos e mensagens 
de erro do formulário. */
function handleBtnSaveClick(event) {
    event.preventDefault();
    const errors = addressService.getErrors(state.address);
    const keys = Object.keys(errors);

    if (keys.length > 0 ) {
        keys.forEach(key => {
            setFormError(key, errors[key]);
        });
    } else {
        listController.addCard(state.address);
        clearForm();
    }
}

/* Essa função limpa todos os campos e mensagens de erro do formulário. 
Ela define os valores dos campos como vazio, remove as mensagens de erro usando a função setFormError, 
cria um novo objeto Address e define-o como o objeto address no estado. Por fim, define o foco no campo inputCep. */
function clearForm() {
    state.inputCep.value = "";
    state.inputCity.value = "";
    state.inputNumber.value = "";
    state.inputStreet.value = "";
    setFormError("cep", "");
    setFormError("number", "");
    state.address = new Address();
    state.inputCep.focus();
}

/* Essa função é chamada para iniciar o formulário. Ela define o foco no campo inputCep */
function startForm() {
    state.inputCep.focus();
}

/* Essa função recebe uma chave e um valor e atualiza o conteúdo do elemento HTML com o atributo 
data-error correspondente à chave fornecida. O valor fornecido é inserido como o conteúdo do elemento, 
exibindo uma mensagem de erro. */
function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}