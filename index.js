const express=require('express');
const app=express();
const cors=require('cors');
const port=process.env.PORT||3000;
const con = require('./database');
const bodyParser = require('body-parser');
const routes = require('./routes');


app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({extended: false})
);
app.get('/',(req,res)=>{
    res.send('hello world');
}
);

app.use('/', routes);


app.listen(port,()=>{
console.log('listening on port');
});