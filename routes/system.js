var express = require('express');
var router = express.Router();



/* -----------------  */
/* GET users/delete   */
router.get('/copyBD', async function(req, res, next) {

    console.log('Route delete');
    var token = req.body.token;
    console.log('token = ', token);
    
    var response = {response : false};
    
    var appDelUser = deleteUserFromApp (await getUser({token}));
    
    if( ! appDelUser) {
      console.log("can't delete the user. Email= ", req.body.email);
      response.error = "Backend can't delete the user"
    } else{ 
    
      var resBD = await deleteOne(token);
      
      if ( ! resBD.status ){
        response.error = resBD;
      }else{
        response.response = true;
        response.token = token;
      }
    }
    res.json(response);
  });




module.exports = router;