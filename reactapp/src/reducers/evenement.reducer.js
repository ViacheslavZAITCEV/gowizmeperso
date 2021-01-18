export default function(evenement = null, action) {
    // console.log('evenement reduceur ')
    if(action.type === 'evenement') {
        console.log('change evenement to ', action.evenement)
        return action.evenement;
    } else if (action.type === 'delEvenement'){
        return null;
    } else {
        return evenement;
    }
}
