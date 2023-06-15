/* criada função construtora para representar o estado do modulo */
import Address from '../model/address.js';
import * as addressService from '../service/address-service.js';
import * as listController from './list-controller.js';

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

/*instanciado o objeto State(), esse objeto guarda as referências para os elementos do formulário.*/
const state = new State();

/* criação e exportação da função init(valores do estado - seleção dos elementos) */
export function init() {
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;
    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;
    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');
    state.inputCep.addEventListener('change', handleInputCepChange);
    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.inputNumber.addEventListener('keyup', handleInputNumberkeyup);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);
    clearForm();
    startForm();
    console.log(state);
}

function handleInputNumberkeyup(event) {
    state.address.number = event.target.value;
}

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

function handleInputNumberChange(event) {
    if (event.target.value == "") {
        setFormError("number", "Campo requerido");
    } else {
        setFormError("number", "");
    }
}

function handleBtnClearClick(event) {
    event.preventDefault();
    clearForm();
}

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

function startForm() {
    state.inputCep.focus();
}

function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}