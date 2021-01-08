export default function(idEvent = '', action) {
    if(action.type === 'addIdEvent') {
        // console.log(">>>>>>>>>>REDUCER OK", action.idEvent);
        return action.idEvent;
        
    } else {
        // console.log(">>>>>>>>>>REDUCER ELSE")
        return idEvent;
    }
}
