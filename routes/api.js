const express = require('express');
const router = express.Router();

router.get('/fetch', require('../controllers/fetch'));
router.get('/logout', require('../controllers/logout'));

router.post('/login', require('../controllers/login'));
router.post('/signup', require('../controllers/signup'));

router.post('/inquiry_submit', require('../controllers/inquirySubmit'));
router.post('/inquiry_fetch', require('../controllers/inquiryFetch'));
router.post('/company_validate', require('../controllers/companyValidate'));

router.post('/inquiry_message_inquirer', require('../controllers/inquiryMessageInquirer'));
router.post('/inquiry_message_company', require('../controllers/inquiryMessageCompany'));

module.exports = router;