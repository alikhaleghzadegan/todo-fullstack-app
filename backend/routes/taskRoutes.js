const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/search', taskController.search_get);
router.get('/tasks', taskController.tasks_get);
router.post('/tasks', taskController.tasks_post);
router.put('/tasks/:taskId', taskController.tasks_put);
router.delete('/tasks/:taskId', taskController.tasks_delete);

module.exports = router;