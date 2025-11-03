const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/listing');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const Review = require('../models/review.js');
const { reviewSchema } = require('../schema.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');
const reviewController = require('../controllers/review.js');



//Review Route
//Post Review Route
router.post('/', isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


//Delete Review Route
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, reviewController.deleteReview);


module.exports = router;