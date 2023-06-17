/* Nesta seção, está sendo importado o módulo RequestExcepction. */
import RequestException from "./exception/request-exception.js";

/* A função getJson é exportada e é responsável por fazer uma solicitação HTTP para uma URL especificada e retornar o corpo da resposta no 
formato JSON. */
export async function getJson(url) {
    try {
        const response = await fetch(url);
        const jsonBody = await response.json();
        return jsonBody;
    } catch (e) {
        throw new RequestException("Erro ao realizar requisição");
    }
}