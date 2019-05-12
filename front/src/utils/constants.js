//** MODAL MESSAGES **//

const ModalError = {
    message: 'Ocorreu um erro na comunicação com o servidor',
    icon: 'exclamation-circle',
    color: 'red'
}
const ModalSuccess = {
    message: 'Chamada de serviço realizada com sucesso!',
    icon: 'exclamation-circle',
    color: 'green'
}
export { ModalError, ModalSuccess }


//** BASE URLS **//
const BASE_URL = process.env.REACT_APP_BASE_URL;
export { BASE_URL }
