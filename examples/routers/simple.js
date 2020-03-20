const app = require("express");
var router = app.Router();

router.get('/get', function(req, res) {
    res.json({
        msg: "hello world!"
    })
});

router.get('/test', (req, res) => {
    res.json({
        msg: "test response!"
    })
})

module.exports = router;

