const app = require('express');
const router = app.Router();

router.get('/get', function(req, res) {
    res.json(req.query)
});

router.post('/post', function(req, res) {
    res.json(req.body)
});

router.post('/buffer', function(req, res) {
    let msg = [];
    req.on('data', (chunk) => {
        if (chunk) {
            msg.push(chunk)
        }
    });
    req.on('end', () => {
        let buf = Buffer.concat(msg);
        res.json(buf.toJSON())
    })
});

module.exports = router;