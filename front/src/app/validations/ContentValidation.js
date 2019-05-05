export const validateProject = values => {
    let errors = {};

    if (!values.title){
        errors.title = 'Insira um título!';
    } 
    if (!values.description){
        errors.description = 'Descreva o projeto!';
    } 

    return errors;
}

export const validateNews = values => {
    let errors = {};

    if (!values.title){
        errors.title = 'Insira um título!';
    } 
    if (!values.subtitle){
        errors.subtitle = 'Insira um subtítulo!';
    } 
    if (!values.body){
        errors.body = 'Insira um texto sobre a sua notícia!';
    }

    return errors;
}

export const validateMember = values => {
    let errors = {};

    if (!values.name){
        errors.name = 'Insira um nome!';
    } 
    if (!values.grade){
        errors.grade = 'Insira o cargo do indivíduo!';
    } 
    
    return errors;
}