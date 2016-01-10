var express = require("express"),
    bodyParser = require("body-parser"),
    app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

function Todo(id, title, completed) {
    this.id = id;
    this.title = title;
    this.completed = completed;
}

var counterTodos = 4;
var todos = {
    1: {
        id: 1,
        title: "Training",
        completed: true
    },
    2: {
        id: 2,
        title: "Learning",
        completed: false
    },
    3: {
        id: 3,
        title: "Walking dog",
        completed: true
    }
};

app.get('/api/todo', function (req, res) {
    console.log(req.query.espv);
    res.json(todos);
});

app.get('/api/todo/:todo_id', function (req, res) {
    var todoId = req.params.todo_id;

    res.json(todos[todoId]);
});

app.post('/api/todo', function (req, res) {
    var todoTitle = req.body.title,
        todoCompleted = JSON.parse(req.body.completed),
        newTodo = new Todo(counterTodos, todoTitle, todoCompleted);

    todos[counterTodos] = newTodo;

    counterTodos++;
   res.json(newTodo);
});

app.put('/api/todo/:todo_id', function (req, res) {
    var reqTodoId = req.params.todo_id,
        todoId = req.body.id,
        todoTitle = req.body.title,
        todoCompleted = req.body.completed,
        objTodo = new Todo(todoId, todoTitle, todoCompleted);

    todos[reqTodoId] = objTodo;
    res.json(todos[reqTodoId]);
});

app.delete('/api/todo/:todo_id', function (req, res) {
    var reqTodoId = req.params.todo_id;
    delete todos[reqTodoId];
    res.send(200);
});

//how to get data from request
// req.query.completed

app.use(express.static('./'));

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
