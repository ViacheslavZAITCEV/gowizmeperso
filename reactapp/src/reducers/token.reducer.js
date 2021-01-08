export default function(token = null, action) {
    // console.log('token reduceur ')
    if(action.type === 'saveToken') {
        // console.log('change token to ', action.token)
        return action.token;
    } else if (action.type === 'deconnecter'){
        return null;
    } else {
        return token;
    }
}
