/* Classes que vão representar os dados. Módulo para especificar o tipo do endereço */

/* É definida uma função construtora chamada Address que é exportada como o valor padrão do módulo.A função construtora Address recebe 
quatro parâmetros: cep, street, number e city. Esses parâmetros são usados ​​para definir as propriedades do objeto criado por essa função 
construtora. Essa função construtora permite criar objetos Address que armazenam informações sobre um endereço específico.*/
export default function Address(cep, street, number, city) {
    this.cep = cep;
    this.street = street;
    this.number = number;
    this.city = city;
}

