/* Nesta seção, está sendo importado o módulo modalController */
import * as modalController from './modal-controller.js';

/* Essa função init é exportada e é responsável por inicializar o sistema ou página. Ela seleciona um elemento do documento com a classe 
"contact-link" usando o método querySelector. Em seguida, adiciona um ouvinte de evento para o evento de clique nesse elemento. Quando o 
evento ocorre, a função handleContactLinkClick é chamada. */
export function init() {
    const contactLink = document.querySelector(".contact-link");
    contactLink.addEventListener('click', handleContactLinkClick);
}

/* Essa função handleContactLinkClick é chamada quando ocorre um clique no elemento com a classe "contact-link". Ela cancela o evento padrão 
(evitando o comportamento de redirecionamento do link) usando o método preventDefault. Em seguida, chama a função showModal do módulo 
modalController para exibir o modal de contato. */
function handleContactLinkClick(event) {
    event.preventDefault();
    modalController.showModal();
}