/* A função construtora RequestException é exportada como o valor padrão do módulo. Ela recebe um parâmetro message que representa a mensagem 
de erro associada à exceção. */
export default function RequestException(message) {
    const error = new Error(message);
    return error;
}

/* Essa linha de código define o protótipo da função RequestException como um objeto que herda do protótipo Error. 
Ao atribuir Object.create(Error.prototype) ao protótipo da função, estamos estabelecendo uma cadeia de protótipos na qual RequestException 
herda as propriedades e comportamentos definidos no protótipo Error. */
RequestException.prototype = Object.create(Error.prototype);