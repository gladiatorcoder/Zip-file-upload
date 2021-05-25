const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fs = require('fs');
const AdmZip = require('adm-zip');
// (process.argv[2] || '.');
const app = express();

app.use(express.json());

//UPLOAD DIRECTORY PATH
var uploadDir = fs.readdirSync(__dirname+'/files/');

app.get('/api/getfile', async(req, res) => {    
    const zip = new AdmZip();
    const filename = req.body.file;

    if(req.body.file){
        const filename = req.body.file
        const validName = uploadDir.includes(filename);
        console.log(validName);
        if(validName){
            zip.addLocalFile(__dirname+'/files/'+filename);
        }else{
            return res.status(404).send('Requested file not found');
        }
    }else{
        for(var i = 0; i < uploadDir.length; i++){
            zip.addLocalFile(__dirname+'/files/'+uploadDir[i]);
        }
    }
    const downloadName = `${Date.now()}.zip`;
    const data = zip.toBuffer();

    //SAVE FILE IN ROOT DIRECTORY
    //zip.writeZip(__dirname+'/'+downloadName);

    //CODE TO DOWNLOAD ZIP FILE
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename = ${downloadName}`);
    res.set('Content-Length', data.length);
    res.send(data);         
});

app.listen(3000, () => {
    console.log('Running on 3000');
})