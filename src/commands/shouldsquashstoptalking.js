import { makeResponse } from '../utils.js';

const BRICK_SQUASH_REPLIES = [
  'Brick dislikes Josh\'s voice',
  'Brick growls until Josh leaves the room',
  'Brick compels Josh to uninstall discord',
  'Brick wishes Josh would stfu',
  'Brick does not care for better discord users',
  'Brick believes Josh is probably pathologicaly a bellend',
  'Brick finds Josh\'s humour lacking and without energy',
  'Brick can only take so much more of Josh',
];

export default () => makeResponse(
  BRICK_SQUASH_REPLIES[Math.floor(Math.random() * BRICK_SQUASH_REPLIES.length)],
);
