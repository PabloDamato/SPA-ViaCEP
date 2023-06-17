/* Nesta seção, estão sendo importados os módulos, requestService e Address. */
import * as requestService from './request-service.js';
import Address from '../model/address.js';

/* A função findByCep é exportada e é responsável por pesquisar um endereço com base em um CEP. Ela recebe o parâmetro cep, que é o CEP 
a ser pesquisado. Dentro da função, uma URL é construída usando o valor do cep fornecido. A URL utiliza o serviço da ViaCEP para obter os 
detalhes do endereço em formato JSON. A função getJson é chamada para fazer uma solicitação HTTP para a URL construída e aguardar a resposta. 
O resultado é armazenado na variável result. Em seguida, um novo objeto Address é criado com base nos dados obtidos da resposta. A propriedade 
cep recebe o valor result.cep, a propriedade street recebe result.logradouro, a propriedade number recebe null, e a propriedade city recebe 
result.localidade. O objeto Address recém-criado é retornado pela função findByCep, fornecendo assim as informações do endereço encontrado com 
base no CEP.*/
export async function findByCep(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const result = await requestService.getJson(url);

    const address = new Address(result.cep, result.logradouro, null, result.localidade);

    return address;
}

/* A função getErrors é exportada e é responsável por verificar se há erros no objeto Address fornecido como parâmetro. Ela recebe o objeto 
address que contém as propriedades do endereço. Dentro da função, um objeto vazio errors é inicializado. Em seguida, são feitas verificações 
para as propriedades cep e number do objeto address. Se alguma dessas propriedades estiver vazia ou não estiver definida, uma mensagem de erro 
correspondente é atribuída à propriedade correspondente no objeto errors. No final, o objeto errors é retornado, que pode conter mensagens de 
erro para as propriedades cep e number, caso essas propriedades não estejam preenchidas adequadamente.*/
export function getErrors(address) {
    const errors = {};
    
    if (!address.cep || address.cep == "") {
        errors.cep = "Campo requerido";
    }

    if (!address.number || address.number == "") {
        errors.number = "Campo requerido";
    }

    return errors;
}
