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
const API_BASE_URL = process.env.REACT_APP_BASE_URL + 'api';
const OPEN_BASE_URL = process.env.REACT_APP_BASE_URL + 'oapi';

export { BASE_URL, OPEN_BASE_URL, API_BASE_URL }
