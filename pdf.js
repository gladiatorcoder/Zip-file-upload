const finder = require('findit')('./files');

var pdf = [];
    finder.on('file', function (file, stat) {
        pdf.push(file);
    });

module.exports = pdf;
