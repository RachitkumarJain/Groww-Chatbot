const express = require('express');
const faqHelper = require('../helpers/faq_helper');
const faqValidator = require('../validators/faq_validators');
const requireLogin = require('../utils/requirelogin');
const requireAdminLogin = require('../utils/requireAdminLogin');

let router = express.Router();

router.get('/tags', faqHelper.getFaqTags);
router.get('', faqHelper.getAllFAQ);
router.post('', requireLogin, faqHelper.raiseFAQTicket);
router.get('/:id', faqHelper.getFAQ);
router.put('/:id', requireAdminLogin, faqHelper.updateFAQ);

module.exports = router;