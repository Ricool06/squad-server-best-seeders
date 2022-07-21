import dayjs from 'dayjs';

import { Client, Intents } from 'discord.js';
import { discordBotToken } from '../secrets/index.js';
import { calculateBestSeedersOfTheWeek } from './seeders/index.js';
import { flipCoin } from './utils.js';

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

const client = new Client({ intents: Intents.FLAGS.GUILDS });

client.once('ready', () => console.log('Ready!'));

client.on('interactionCreate', async interaction => {
  console.log('Received interaction!');

  if (!interaction.isCommand()) {
    console.warn('Brick no understand.');
    return;
  }

  const { commandName } = interaction;

  console.log(`${interaction.member.displayName} sent the ${commandName} command`);

  const now = dayjs();

  switch (commandName) {
    case ('hellobrick'):
      await (flipCoin()
        ? interaction.reply('grrrrr 😡')
        : interaction.reply('uWu daddy 👅👅👅👅'));
      break;

    case ('shouldsquashstoptalking'):
      interaction.reply(
        BRICK_SQUASH_REPLIES[Math.floor(Math.random() * BRICK_SQUASH_REPLIES.length)],
      );

      break;

    case ('seedersoftheweek'):

      await calculateBestSeedersOfTheWeek(now)
        .then(msg => {
          const squadRoleId = interaction.guild.roles.cache.find(role => role.name === 'Squad').id;
          return interaction.reply(
            'Brick found that these '
            + `<@&${squadRoleId}>`
            + ` players are the top seeders of the week ending ${now.tz('Europe/London').format('YYYY-MM-DD HH:mm')}${msg}`,
          );
        })
        .catch(reason => {
          console.error(reason);
          return interaction.reply('Brick did a dumb. failed to get seeders.');
        });
      break;

    default:
      break;
  }
});

client.login(discordBotToken);
