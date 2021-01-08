export default function(idSortie = '', action) {
    if(action.type === 'addIdSortie') {
        // console.log("ajout ID de la sortie", action.idSortie);
        return action.idSortie;
        
    } else {
        // console.log("echec ajout ID de la sortie")
        return idSortie;
    }
}