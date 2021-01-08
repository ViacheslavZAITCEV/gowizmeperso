export default function(currentCity = '', action) {
    if(action.type === 'addCurrentCity') {
        // console.log("currentCity reducer OK", action.idEvent);
        return action.currentCity;
    } else {
        // console.log("currentCity reducer not ok", action.idEvent);
        return currentCity;
    }
}