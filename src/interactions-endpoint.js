import dayjs from 'dayjs';
import { verifyKey, InteractionType, InteractionResponseType } from 'discord-interactions';
// import { APIGatewayProxyHandlerV2 } from '@types/aws-lambda';
import { discordBotPublicToken } from '../secrets/index.js';
import { calculateBestSeedersOfTheWeek } from './seeders/index.js';
import { flipCoin } from './utils.js';

const FORMATTED_RESPONSES = false;

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

/**
 * Formats an object into a JSON string.
 * @param {any} data JSON body to convert to a string
 * @param {boolean} formatted Whether to format the body or not
 */
const body = (data, formatted = FORMATTED_RESPONSES) => {
  const responseBody = formatted
    ? JSON.stringify(data, null, 2)
    : JSON.stringify(data);

  return responseBody;
};

const DEFAULT_RESULT = {
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

const makeResponse = (content, type = InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE) => ({
  ...DEFAULT_RESULT,
  body: body({
    type,
    data: { content },
  }),
});

/**
 * @type {APIGatewayProxyHandlerV2}
 */
export const handler = async event => {
  console.log(body(event));
  if (!event.headers['x-skip-sig-ver']) {
    const signature = event.headers['x-signature-ed25519'];
    const timestamp = event.headers['x-signature-timestamp'];

    const isValidRequest = verifyKey(
      event.body,
      signature,
      timestamp,
      discordBotPublicToken,
    );

    if (!isValidRequest) {
      console.warn('Request signature could not be verified.');
      return {
        ...DEFAULT_RESULT,
        body: body({ error: 'Request signature could not be verified.' }),
        statusCode: 400,
      };
    }
  }

  const discordMessage = JSON.parse(event.body);

  if (discordMessage.type === InteractionType.PING) {
    console.log('Responding to PING with PONG');
    const res = makeResponse('', InteractionResponseType.PONG);
    console.log(res);
    return res;
  }

  if (discordMessage.type !== InteractionType.APPLICATION_COMMAND) {
    console.warn('Message was not an application command.');

    return {
      ...DEFAULT_RESULT,
      body: body({ error: 'Message was not an application command.' }),
      statusCode: 400,
    };
  }

  const now = dayjs();

  const command = discordMessage?.data?.name;
  switch (command) {
    case ('tipbrick'):
      return makeResponse('Brick need money to live: https://ko-fi.com/ricool');

    case ('hellobrick'):
      return (flipCoin()
        ? makeResponse('grrrrr 😡')
        : makeResponse('uWu daddy 👅👅👅👅'));

    case ('shouldsquashstoptalking'):
      return makeResponse(
        BRICK_SQUASH_REPLIES[Math.floor(Math.random() * BRICK_SQUASH_REPLIES.length)],
      );

    case ('seedersoftheweek'):
      return calculateBestSeedersOfTheWeek(now)
        .then(msg => makeResponse(
          'Brick found that these '
          + 'Squad'
          + ` players are the top seeders of the week ending ${now.tz('Europe/London').format('YYYY-MM-DD HH:mm')}${msg}`,
        ))
        .catch(reason => {
          console.error(reason);
          return makeResponse('Brick did a dumb. Failed to get seeders.');
        });

    default:
      return DEFAULT_RESULT;
  }
};
