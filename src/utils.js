import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { InteractionResponseType } from 'discord-interactions';

dayjs.extend(utc);
dayjs.extend(timezone);

const FORMATTED_RESPONSES = false;

export const flipCoin = () => Math.random() > 0.5;

/**
 * Formats an object into a JSON string.
 * @param {any} data JSON body to convert to a string
 * @param {boolean} formatted Whether to format the body or not
 */
export const body = (data, formatted = FORMATTED_RESPONSES) => {
  const responseBody = formatted
    ? JSON.stringify(data, null, 2)
    : JSON.stringify(data);

  return responseBody;
};

export const DEFAULT_RESULT = {
  body: body({
    type: 4,
    data: { content: 'Brick did a dumb' },
  }),
  statusCode: 200,
  headers: {
    'content-type': 'application/json',
    'Content-Type': 'application/json',
  },
};

export const makeResponse = (
  content,
  messageReference,
  embeds,
  type = InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
) => ({
  ...DEFAULT_RESULT,
  body: body({
    type,
    data: {
      content,
      message_reference: messageReference,
      embeds,
    },
  }),
});
