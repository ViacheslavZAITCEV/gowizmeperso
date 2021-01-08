const mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

// --------------------- BDD -----------------------------------------------------
mongoose.connect('mongodb+srv://GoWizMeSous:sousrire@gowizmeleo.eybcz.mongodb.net/GoWizMeLeo?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database GoWizMeSlava connection : Success ***');
    }
   }
);

module.exports = mongoose