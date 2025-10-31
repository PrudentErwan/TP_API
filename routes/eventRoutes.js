const express = require('express');
const router = express.Router();

const { createEvent, getEventDetails } = require('../controllers/eventController');
const { createPoll, getPoll, submitPollResponse } = require('../controllers/pollController');
const { createAlbum, uploadPhoto, addCommentToPhoto } = require('../controllers/photoController');

const { createTicketType, listTicketTypesForEvent, purchaseTicket } = require('../controllers/ticketController');


const { createEventSchema, purchaseTicketSchema } = require('../validators/eventValidator');

const validate = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, validate(createEventSchema), createEvent);
router.get('/:eventId', protect, getEventDetails);

router.post('/:eventId/polls', protect, createPoll);
router.get('/:eventId/polls/:pollId', protect, getPoll);
router.post('/:eventId/polls/:pollId/responses', protect, submitPollResponse);

router.post('/:eventId/albums', protect, createAlbum);
router.post('/:eventId/albums/:albumId/photos', protect, uploadPhoto);
router.post('/photos/:photoId/comments', protect, addCommentToPhoto);

router.post('/:eventId/ticket-types', protect, createTicketType);
router.get('/:eventId/ticket-types', protect, listTicketTypesForEvent);

router.post('/tickets/purchase', validate(purchaseTicketSchema), purchaseTicket);


module.exports = router;