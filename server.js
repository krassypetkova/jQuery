var express = require("express"),
    app = express();

var todos = {
    1: {
        id: 1,
        title: "Cooking",
        completed: true
    },
    2: {
        id: 2,
        title: "Cleaning",
        completed: false
    },
    3: {
        id: 3,
        title: "Eating",
        completed: true
    }
};

app.get('/api/todo', function (req, res) {
    res.json(todos);
});

app.use(express.static('./'));

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
