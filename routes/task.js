const express=require('express');
const router=express.Router();
const taskController= require('../controllers/task');
const {check}=require('express-validator');
const createTaskValidationRules = [
    check('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be String'),

    check('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be String'),

    check('priority')
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),

    check('startDate')
    .notEmpty().withMessage('Start Date is required')
    .isDate().withMessage('Start Date must be of type Date'),


    check('endDate')
    .notEmpty().withMessage('End Date is required')
    .isDate().withMessage('End Date must be of type Date'),


    check('completed')
    .isBoolean().withMessage('Completed must be a boolean'),

    check('userId')
    .notEmpty().withMessage('User ID is required')
    .isMongoId().withMessage('User ID must be a valid Mongo ID')
];
router
.route('/')
.get(taskController.getTasks)
.post(createTaskValidationRules,taskController.createTask);

router
.route('/:id')
.get(taskController.getTaskById)
.patch(createTaskValidationRules,taskController.EditTask)
.delete(taskController.deleteTask);


module.exports = router;
