import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { discordBotToken, discordBotApplicationId } from '../secrets/index.js';

const buildCommand = (...args) => new SlashCommandBuilder(...args);

const commands = [
  buildCommand().setName('tipbrick').setDescription('Find out how to support Brick\'s crack habit.'),
  buildCommand().setName('hellobrick').setDescription('Growl or lick. Depends if Brick likes you.'),
  buildCommand().setName('shouldsquashstoptalking').setDescription('Brick decides.'),
  buildCommand().setName('seedersoftheweek').setDescription('Brick dumps a list of the top 10 no-lifers who have seeded the Squad server this week.'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(discordBotToken);

await rest.put(
  Routes.applicationCommands(discordBotApplicationId),
  { body: commands },
)
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
