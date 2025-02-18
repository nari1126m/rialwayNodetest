
const path = require('path');
const express = require('express');
const schedule = require('node-schedule');

const app = express();
let lastdata = null;
schedule.scheduleJob('*/10 * * * * *',async () => {
try{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    lastdata = await response.json(); // Update the latest quote
    console.log('data :', lastdata);
}catch(error){
    console.error('fetch error : ',error)
}
});

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/api/data',(req,res) => {
    if(!(lastdata === null)){
        res.json(lastdata);
    }else{
        res.status(503).json('no data');
    }
});
app.listen(8080, () => {
    console.log('server is running');
});