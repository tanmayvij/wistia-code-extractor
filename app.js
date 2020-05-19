const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.urlencoded())

app.get('/', function(req, res) {
    res.send(`
        <form method="post" action="/">
            <textarea name="text"></textarea><br>
            <input type="text" name="dir" />
            <input type="submit" />
        </form>
    `);
});

app.post('/', function(req, res) {
    console.log(req.body);
    var dump = req.body.text;
    var urls = [];

    dump.split('$').forEach(text => {
        var index1 = text.indexOf('wvideo=');
        var wvideo = text.substr(index1+7,10);
        var url = `https://fast.wistia.net/embed/iframe/${wvideo}`;

        var index2 = text.indexOf('">1');
        if(index2 == -1) index2 = text.indexOf('">0');
        if(index2 == -1) index2 = text.indexOf('">2');
        if(index2 == -1) index2 = text.indexOf('">3');
        if(index2 == -1) index2 = text.indexOf('">4');
        if(index2 == -1) index2 = text.indexOf('">5');
        if(index2 == -1) index2 = text.indexOf('">6');
        var index3 = text.indexOf('.mp4');
        var name = text.substring(index2+2, index3) + '.mp4';
        name.replace('_', ' ');
        
        var temp = {
            url,
            name
        };
        urls.push(temp);
    });
    var obj = {
        dir: req.body.dir,
        urls
    };
    var data = JSON.stringify(obj);

    fs.writeFile(Math.random().toString() + '.json', data, function(err) {
        if(err)
        {
            res.send(err);
        }
    });
    res.redirect('/');
})

app.listen(3000);