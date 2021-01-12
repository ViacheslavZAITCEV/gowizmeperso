export default function(evenement = null, action) {
    // console.log('token reduceur ')
    if(action.type === 'evenement') {
        // console.log('change token to ', action.token)
        return action.evenement;
    } else if (action.type === 'delEvenement'){
        return null;
    } else {
        return evenement;
    }
}
