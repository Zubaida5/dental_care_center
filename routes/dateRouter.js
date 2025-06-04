const dateController = require('../controllers/dateController');
const { protect, restrictTo,isactive } = require('./../middlewares/authMiddlewers');
const { addVarBody, addQuery } = require('./../middlewares/dynamicMiddleware');
const { checkOwner } = require('./../middlewares/checkMiddleware');
const express = require('express');
const Dates = require('../models/dateModel');
const router = express.Router();
router.use(protect);
router.route('/doctor/:id/available').get(isactive,dateController.available);
router
  .route('/mineForUser')
  .get(
    restrictTo('User'),
    addQuery('pataint', 'UserId'),isactive,
    dateController.getAlldate
  );
router
  .route('/mineForDoctor')
  .get(restrictTo('doctor'), isactive,dateController.getDateDoctor);
router
  .route('/')
  .get(restrictTo('admin'), dateController.getAlldate)
  .post(
    restrictTo('User'),
    isactive,
    dateController.createdate
  );
router
  .route('/canceled/:id')
  .patch(
    restrictTo('User'),isactive,
    checkOwner(Dates, 'pataint', 'id'),
    addVarBody('canceled', true),
    dateController.updatedate
  );

router
  .route('/:id')
  .get(dateController.getdate)
  .delete(restrictTo('admin'), dateController.deletedate);
module.exports = router;
