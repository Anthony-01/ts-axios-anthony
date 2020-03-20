const app = require("express");
const fs = require('fs');
const path = require('path');
var router = app.Router();

router.get('/', function(req, res) {
    // res.render('../docs/index.html');
    var fileName="./docs/index.html";
    fs.readFile(fileName,function(err,data){
        if(err)
            console.log(fileName + ":", err );
            // console.log("对不起，您所访问的路径出错");
        else{
            res.write(data);
        }
    })
});



module.exports = router;