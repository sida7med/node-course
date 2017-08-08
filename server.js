const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;
var app = express();

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

// middleware
app.use((req,res,next)=>{
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log+'\n',(err)=> {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});


// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs');
// });

app.get('/',(req,res)=>{
	res.send({
		name:'Ahmed',
		likes:[
			'movies',
			'music'
		]
	});
});
app.get('/about',(req,res)=>{
	res.render('about.hbs');
});

app.get('/about',(req,res)=>{
	res.render('projects.hbs');
});

app.get('/bad',(req,res)=>{
	res.send({
		err:'Unable to fulfill request'
	});
});

app.listen(port,()=>{
	console.log(`server is up on port ${port}`);
});