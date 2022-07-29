/* eslint-disable camelcase */
import { makeResponse } from '../utils.js';

const convertDiscordMessageLinkToMessageReference = messageLink => {
  const [guild_id, channel_id, message_id] = messageLink.split('/').slice(-3);
  return {
    guild_id,
    channel_id,
    message_id,
  };
};

const BRICK_ACE_REPLIES = [
  {
    content: 'Brick marvels at Ace\'s inability to understand that we are in a gaming discord.',
    messageLink: 'https://discord.com/channels/989645718555881532/989645719675760725/1002635582033375353',
    embeds: [{
      image: {
        url: 'https://cdn.discordapp.com/attachments/997883693651722313/1002662673827233792/Screenshot_2022-07-29_203712.png',
      },
    }],
  },
  {
    content: 'Brick is impressed with Ace\'s use of eBay.',
    messageLink: 'https://discord.com/channels/989645718555881532/989645719675760725/1002630611158183976',
    embeds: [{
      image: {
        url: 'https://cdn.discordapp.com/attachments/997883693651722313/1002667689694740500/unknown.png',
      },
    }],
  },
  {
    content: 'Brick is acting up just thing about Ace\'s man work.',
    messageLink: 'https://discord.com/channels/989645718555881532/989645719675760725/1002629956758671430',
    embeds: [{
      image: {
        url: 'https://cdn.discordapp.com/attachments/997883693651722313/1002668265291644938/unknown.png',
      },
    }],
  },
  {
    content: 'Brick is proud that Ace would stand up for fake soldiers everywhere.',
    messageLink: 'https://discord.com/channels/989645718555881532/989645719675760725/1002626847361736825',
    embeds: [{
      image: {
        url: 'https://cdn.discordapp.com/attachments/997883693651722313/1002668563221463100/unknown.png',
      },
    }],
  },
  {
    content: 'Brick is wowed by Ace\'s skills in projection.',
    messageLink: 'https://discord.com/channels/989645718555881532/989645719675760725/1002625318558912572',
    embeds: [{
      image: {
        url: 'https://cdn.discordapp.com/attachments/997883693651722313/1002668858215252098/unknown.png',
      },
    }],
  },
  {
    content: 'Brick is humbled by Ace\'s ability to use the race card despite being a cousin-fucking hillbilly.',
    messageLink: 'https://discord.com/channels/989645718555881532/989645719675760725/1002624862189273148',
    embeds: [{
      image: {
        url: 'https://cdn.discordapp.com/attachments/997883693651722313/1002669133239955588/unknown.png',
      },
    }],
  },
  {
    content: 'Brick is astonished by Ace\'s complete lack of ability to self-reflect.',
    messageLink: 'https://discord.com/channels/989645718555881532/989645719675760725/1002624668487917628',
    embeds: [{
      image: {
        url: 'https://cdn.discordapp.com/attachments/997883693651722313/1002669479706230874/unknown.png',
      },
    }],
  },
  {
    content: 'Brick is stunned that Ace believes being an idiot in private is sacred.',
    messageLink: 'https://discord.com/channels/989645718555881532/989645719675760725/1002621609426833508',
    embeds: [{
      image: {
        url: 'https://cdn.discordapp.com/attachments/997883693651722313/1002669754420572222/unknown.png',
      },
    }],
  },
  {
    content: 'Brick loves Ace\'s candor.',
    messageLink: 'https://discord.com/channels/989645718555881532/989645719675760725/1002640486835699732',
    embeds: [{
      image: {
        url: 'https://cdn.discordapp.com/attachments/997883693651722313/1002669973006716968/unknown.png',
      },
    }],
  },
  {
    content: 'Brick appreciates Ace\'s desire to pay for healthcare but not charity',
    messageLink: 'https://discord.com/channels/989645718555881532/989645719675760723/990068911955382302',
    embeds: [{
      image: {
        url: 'https://cdn.discordapp.com/attachments/997883693651722313/1002670274585563206/unknown.png',
      },
    }],
  },
];

export default () => {
  const { content, messageLink, embeds } = BRICK_ACE_REPLIES[
    Math.floor(Math.random() * BRICK_ACE_REPLIES.length)];

  return makeResponse(
    content,
    convertDiscordMessageLinkToMessageReference(messageLink),
    embeds,
  );
};
