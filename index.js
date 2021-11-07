var express = require('express');
const path = require('path');
var app     = express();

// app.get('/', function(req, res){
//    res.send('Root Route');
// });

var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MyNewPass',
  database: 'contacts'
});


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(3000, function(){
   console.log('Running on port 3000!')
});

// used to serve static files from public directory
app.use(express.static('public'));

// test with curl 'http://localhost:3000/add?firstName=peter'

// app.get('/add', function(req, res){
//    console.log('firstName: ', req.query.firstName);
//    res.send(`echoing: ${req.query.firstName}`);
// });

 app.get('/add', function(req, res){
    console.log('firstName: ', req.query.firstName);
    //res.send(`echoing: ${req.query.firstName}`);
   
    console.log('lastname: ', req.query.lastname);
    //res.send(`echoing: ${req.query.lastname}`);

    console.log('phone number: ', req.query.phoneNumber);
    //res.send(`echoing: ${req.query.phone}`);

    console.log('email: ', req.query.email);
   // res.send(`echoing: ${req.query.email}`);
   
    console.log('university: ', req.query.university);
    //res.send(`echoing: ${req.query.university}`);
    
    console.log('major: ', req.query.major);
    //res.send(`echoing: ${req.query.major}`);
   
    connection.query(
      'INSERT INTO `contacts` (`firstName`,`lastname`,`phoneNumber`, `email`,`university`,`major`) VALUES(?,?,?,?,?,?)', [req.query.firstName,req.query.lastname,req.query.phoneNumber,req.query.email,req.query.university,req.query.major],
      function(err, results, fields) {
        console.log(results);
        res.send(results);
      }
    );
 });

 app.get('/read', function(req, res){

   connection.query(
     'SELECT * FROM `contacts`',
     function(err, results, fields) {
       console.log(results);
       res.send(results);
     }
   );

});

