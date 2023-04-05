const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');



router.post('/create',bookController.create);
router.get('/get',bookController.findAll);
router.get('/get/:bookid',bookController.findOne);
router.put('/update/:bookid',bookController.update);
router.delete('/delete/:bookid',bookController.remove);



module.exports ={
    routes:router
}