/* Classes que vão representar os dados. Módulo para especificar o tipo do endereço */

export default function Address(cep, street, number, city) {
    this.cep = cep;
    this.street = street;
    this.number = number;
    this.city = city;
}

