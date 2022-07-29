import { verifyKey, InteractionType, InteractionResponseType } from 'discord-interactions';
// import { APIGatewayProxyHandlerV2 } from '@types/aws-lambda';
import runCommand from './commands/index.js';
import { discordBotPublicToken } from '../secrets/index.js';
import {
  DEFAULT_RESULT, body, makeResponse,
} from './utils.js';

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

  const command = discordMessage?.data?.name;

  // eslint-disable-next-line no-return-await
  return await runCommand(command);
};
