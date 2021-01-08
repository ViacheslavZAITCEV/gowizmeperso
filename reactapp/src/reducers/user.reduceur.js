export default function(user = {}, action) {
    // console.log('user reduceur ')
    if(action.type === 'user') {
        // console.log('setup user : ', action.user)
        return action.user;
    } else {
        return user;
    }
}
