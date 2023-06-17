/* É definida uma função construtora chamada State. Ela cria um objeto que representa o estado do módulo. */
function State() {
    this.listSection = null;
}

/* Cria-se uma instância do objeto State e a atribui a uma constante chamada state. 
Essa instância será usada para armazenar uma referência à seção da lista. */
const state = new State();

/* Criei uma função init que inicializa o módulo. 
Ela seleciona a seção da lista usando o seletor #list-section e atribui a referência a state.listSection. */
export function init() {
    state.listSection = document.querySelector("#list-section");
}

/* Essa função addCard é exportada e é responsável por adicionar um card do endereço à seção da lista. 
Ela recebe um objeto address como parâmetro. A função createCard é chamada para criar um novo elemento de cartão 
com base no objeto address. Em seguida, o cartão é anexado à seção da lista usando o método appendChild. */
export function addCard(address) {
    const card = createCard(address);
    state.listSection.appendChild(card);
}

/* Essa função createCard é responsável por criar um novo elemento de cartão com base no objeto address fornecido. 
Ela cria elementos HTML (div, h3, p) e atribui classes e conteúdo a eles com base nas propriedades do objeto address. 
Em seguida, os elementos são anexados uns aos outros (h3 e p são anexados à div) e, por fim, o elemento de div é retornado. */
function createCard(address) {
    const div = document.createElement("div");
    div.classList.add("list-card-itens");

    const h3 = document.createElement("h3");
    h3.innerHTML = address.city;

    const line = document.createElement("p");
    line.classList.add("address-line");
    line.innerHTML = `${address.street}, ${address.number}`;

    const cep = document.createElement("p");
    cep.classList.add("address-cep");
    cep.innerHTML = address.cep;

    div.appendChild(h3);
    div.appendChild(line);
    div.appendChild(cep);

    return div;
}