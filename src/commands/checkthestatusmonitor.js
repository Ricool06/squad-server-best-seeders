/* eslint-disable camelcase */
import { makeResponse } from '../utils.js';

const BRICK_STATUSMONITOR_REPLIES = [
  '"Has anyone got a welding tool?"',
  '"Where did I leave the morphine?"',
  '"How do I get out of the submarine?"',
  '"Where\'s the hull breach?"',
  '"How do I fix the ballast pump if I don\'t know where it is?"',
  '"I need a gun, where are they?"',
  '"Where are the diving suits?"',
  '"How do I get to the reactor?"',
];

export default () => {
  const content = BRICK_STATUSMONITOR_REPLIES[
    Math.floor(Math.random() * BRICK_STATUSMONITOR_REPLIES.length)];

  const embeds = [{
    url: 'https://cdn.discordapp.com/attachments/997883693651722313/1010543844577792050/Barotrauma.mp4',
  }];

  return makeResponse(
    `${content}\n\n${embeds[0].url}`,
    // null,
    // embeds,
  );
};
