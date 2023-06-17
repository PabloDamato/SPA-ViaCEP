/* É definida uma função construtora chamada State. Ela cria um objeto que representa o estado do modal de contato. */
function State() {
    this.container = null;
    this.btnClose = null;
}

/* Cria-se uma instância do objeto State e a atribui a uma constante chamada state.Essa instância será usada para armazenar referências 
ao contêiner do modal e ao botão de fechamento. */
const state = new State();

/* Criei uma função init que inicializa o módulo. Essa função init é exportada e é usada para inicializar o módulo do modal de contato. 
Ela seleciona o contêiner do modal e o botão de fechamento usando seletores específicos. Em seguida, ela adiciona ouvintes de eventos 
aos botões: um ouvinte para o evento de clique no botão de fechamento, que chama a função handleBtnCloseClick, e outro ouvinte para o 
evento de clique no contêiner do modal, que chama a função handleContainerClick.*/
export function init() {
    state.container = document.querySelector("#modal-contact");
    state.btnClose = document.querySelector("#btn-modal-contact-close");
    state.btnClose.addEventListener('click', handleBtnCloseClick);
    state.container.addEventListener('click', handleContainerClick);
}

/* Essa função showModal é exportada e é responsável por exibir o modal de contato. Ela adiciona a classe "active" ao contêiner do modal, 
que é usado para aplicar os estilos específicos para mostrar o modal. */
export function showModal() {
    state.container.classList.add("active");
}

/* Essa função closeModal é exportada e é responsável por fechar o modal de contato. Ela remove a classe "active" do contêiner do modal, 
ocultando-o. */
export function closeModal() {
    state.container.classList.remove("active");
}

/* Essa função handleBtnCloseClick é chamada quando o botão de fechamento é clicado. Ela cancela o evento padrão (evitando o comportamento 
de redirecionamento do botão) e chama a função closeModal para fechar o modal. */
function handleBtnCloseClick(event) {
    event.preventDefault();
    closeModal();
}

/* Essa função handleContainerClick é chamada quando ocorre um clique no contêiner do modal. Ela cancela o evento padrão e verifica se o 
elemento clicado é exatamente o contêiner do modal (comparando event.target com this). Se for, a função closeModal é chamada para fechar 
o modal. */
function handleContainerClick(event) {
    event.preventDefault();
    if (event.target === this) {
        closeModal();
    }
}