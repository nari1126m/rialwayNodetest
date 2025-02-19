
const path = require('path');
const express = require('express');
const schedule = require('node-schedule');
const app = express();
let lastdata = null;
let collect = [];
schedule.scheduleJob('*/10 * * * *',async () => {
    let i = 1;

    collect = [];
try{
    while(true){
        if(i > 200){
            break;
        }
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${i}`);
    lastdata = await response.json(); // Update the latest quote
    console.log('data :', lastdata);
    collect.push(lastdata);
    i = i + 1;
    }
}catch(error){
    console.error('fetch error : ',error)
}
});

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/api/data',(req,res) => {
    if(!(collect.length === 0)){
        res.json(collect);
    }else{
        res.status(503).json('no data');
    }
});
app.listen(8080, () => {
    console.log('server is running');
});