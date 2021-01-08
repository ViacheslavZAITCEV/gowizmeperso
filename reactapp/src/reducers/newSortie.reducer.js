export default function(newSortie = {}, action) {
    if(action.type === 'newSortie') {
        // console.log("transfert des infos sur la sorties au screen PlanOrgaScreen", action.newSortie);
        return action.newSortie;
        
    } else {
        // console.log("echec du transfert des infos de la sortie")
        return newSortie;
    }
}