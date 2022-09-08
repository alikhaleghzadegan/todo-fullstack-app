const User = require('../models/User');

const taskExistByText = function (tasksList, text) {
    return tasksList.filter(task => task.text == text).length === 0 ? false : true;
}

const taskExistById = function (tasksList, id) {
    return tasksList.filter(task => task._id == id).length === 0 ? false : true;
}

module.exports.search_get = async (req, res) => {
    try {
        if (res.locals.user) {
            const { searchTerm } = req.query;
            const user = await User.findById(res.locals.user);
            const tasks = user.tasksList.filter(task => task.text.includes(searchTerm));
            res.status(200).json(tasks);
        } else {
            res.status(401).json("401 Unauthorized");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

module.exports.tasks_get = async (req, res) => {
    try {
        if (res.locals.user) {
            const user = await User.findById(res.locals.user);
            res.status(200).json(user.tasksList);
        } else {
            res.status(401).json("401 Unauthorized");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

module.exports.tasks_post = async (req, res) => {
    try {
        if (!req.body || !req.body.text) {
            res.status(400).send('Invalid task format');
            return;
        }
        const { text } = req.body;
        if (res.locals.user) {
            const user = await User.findById(res.locals.user);
            if (taskExistByText(user.tasksList, text)) {
                res.status(409).send('Conflict. Task already defined');
                return;
            }
            user.tasksList.push({ "text": text });
            const updatedUser = await user.save();
            res.status(200).json(updatedUser.tasksList);
        } else {
            res.status(401).json("401 Unauthorized");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

module.exports.tasks_put = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { text, status } = req.body;
        if (res.locals.user) {
            const user = await User.findById(res.locals.user);
            if (!taskExistById(user.tasksList, taskId)) {
                res.status(404).send("Not Found");
                return;
            }
            const taskIndex = user.tasksList.findIndex(task => task._id == taskId);

            if (text && text.length !== 0) {
                user.tasksList[taskIndex].text = text;
            }

            if (status && status.length !== 0) {
                user.tasksList[taskIndex].status = status;
            }

            const updatedUser = await user.save();
            res.status(200).json(updatedUser.tasksList);
        } else {
            res.status(401).json("401 Unauthorized");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

module.exports.tasks_delete = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        if (res.locals.user) {
            const user = await User.findById(res.locals.user);
            if (!taskExistById(user.tasksList, taskId)) {
                res.status(404).send("Not Found");
                return;
            }
            user.tasksList = user.tasksList.filter(task => task._id != taskId);
            const updatedUser = await user.save();
            res.status(200).json(updatedUser.tasksList);
        } else {
            res.status(401).json("401 Unauthorized");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}