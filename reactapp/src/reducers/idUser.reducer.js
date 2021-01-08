// export default function(idUser = '', action) {
export default function(idUser = ' ', action) {
    if(action.type === 'addIdUser') {
        // console.log("ajout ID user dans le store", action.idUser);
        return action.idUser;
    } else {
        // console.log("echec ajout ID user dans le store")
        return idUser;
    }
}