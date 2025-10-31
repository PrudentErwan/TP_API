const express = require('express');
const router = express.Router();
const { createGroup, getGroupDetails, addGroupMember } = require('../controllers/groupController');
const { createEventInGroup } = require('../controllers/eventController');
const { postMessageToGroupThread, getGroupThreadMessages } = require('../controllers/threadController');

const { createGroupSchema } = require('../validators/groupValidator');
const { createEventSchema } = require('../validators/eventValidator');
const validate = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', validate(createGroupSchema), createGroup);

router.get('/:groupId', getGroupDetails);

router.post('/:groupId/members', addGroupMember);

router.post('/:groupId/events', validate(createEventSchema), createEventInGroup);

router.get('/:groupId/thread', getGroupThreadMessages);

router.post('/:groupId/thread', postMessageToGroupThread);


module.exports = router;