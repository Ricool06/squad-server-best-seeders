import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { discordBotToken, discordBotApplicationId } from '../secrets/index.js';

const buildCommand = (...args) => new SlashCommandBuilder(...args);

const commandNameDescriptionMaps = {
  tipbrick: 'Find out how to support Brick\'s crack habit.',
  hellobrick: 'Growl or lick. Depends if Brick likes you.',
  shouldsquashstoptalking: 'Brick decides.',
  seedersoftheweek: 'Brick dumps a list of the top 10 no-lifers who have seeded the Squad server this week.',
  thankyouace: 'Brick shows appreciation for discord\'s most valued user.',
};

const commands = Object.keys(commandNameDescriptionMaps)
  .map(key => buildCommand().setName(key).setDescription(commandNameDescriptionMaps[key]))
  .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(discordBotToken);

const existingCommands = await rest.get(Routes.applicationCommands(discordBotApplicationId));
await Promise.all(existingCommands
  .map(command => rest.delete(`${Routes.applicationCommands(discordBotApplicationId)}/${command.id}`)));

await rest.put(
  Routes.applicationCommands(discordBotApplicationId),
  { body: commands },
)
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
