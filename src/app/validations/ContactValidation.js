export const validate = values => {
    let errors = {};
    
    if (!values.name) {
        errors.name = 'Insira seu nome!';
    } 
    if (!values.subject) {
        errors.subject = 'Insira seu nome!';
    } 
    if (!values.message) {
        errors.message = 'Insira seu nome!';
    } 

    if (!values.email) {
        errors.email = 'Insira seu e-mail para contato!';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
            values.email
        )
    ) {
        errors.email = 'E-mail inválido';
    }


    return errors;
}