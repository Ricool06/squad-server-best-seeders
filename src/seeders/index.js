import dayjs from 'dayjs';
import { got } from 'got';
import { battleMetricsToken } from '../../secrets/index.js';

const hntpOrg = '53164';
const hntpServer = '15099463';

const baseUrl = 'https://api.battlemetrics.com';
const playerCountHistoryUrl = `${baseUrl}/servers/${hntpServer}/player-count-history`;
const playerUrl = `${baseUrl}/players`;
const sessionUrl = `${baseUrl}/servers/${hntpServer}/relationships/sessions`

const headers = {
  Authorization: `Bearer ${battleMetricsToken}`,
};

// Function for calculating minutes between two timestamps
const differenceBetweenDateTimeStrings = (startTimestamp, endTimestamp) => {
  return dayjs(endTimestamp).diff(dayjs(startTimestamp), 'minutes');
}

export const calculateBestSeedersOfTheWeek = async (now) => {
  // get player count history
  const playerCountHistory = await got.get(playerCountHistoryUrl, {
    headers,
    searchParams: new URLSearchParams({
      start: now.subtract(7, 'days').toISOString(),
      stop: now.toISOString(),
      resolution: '60',
    }),
  }).json();

  // Calculate when the server was seeding (had at least one player, but fewer than 40)
  const seedingPeriods = playerCountHistory.data
    .filter(({ attributes }) => attributes.min > 0 && attributes.min < 40)
    .map(period => period.attributes.timestamp)
    .map(timestamp => {
      const onTheHourSeedingTime = dayjs(timestamp);

      return {
        start: onTheHourSeedingTime.toISOString(),
        stop: onTheHourSeedingTime.add(60, 'minutes').toISOString(),
      }
    });

  // Fetch a list of all individual active player sessions during each seeding period 
  const sessionsMatrix = await Promise.all(
    seedingPeriods.map(async seedingPeriod => await got.get(sessionUrl, {
      headers,
      searchParams: new URLSearchParams({
        // "include": "player",
        ...seedingPeriod,
      }),
    }).json()));

  // Merge each page of sessions from the paginated response
  // then calculate the length of each session and attribute it to a username in a map
  const sessions = sessionsMatrix
    .reduce((seshes, thisDataBlock) => [...seshes, ...thisDataBlock.data], [])
    .reduce((playersToPlaytime, thisSesh) => {

      const sessionTimeDifference = differenceBetweenDateTimeStrings(
        thisSesh.attributes.start,
        thisSesh.attributes.stop,
      );

      return thisSesh.attributes.name in playersToPlaytime
        ? { ...playersToPlaytime, [thisSesh.attributes.name]: playersToPlaytime[thisSesh.attributes.name] + sessionTimeDifference }
        : { ...playersToPlaytime, [thisSesh.attributes.name]: sessionTimeDifference }
    }, {});

  // generate a formatted list, ready for the discord bot message
  const discordCodeBlock = Object
    .entries(sessions).sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(row => row.join(': ') + ' minutes')
    .join('\n');

  return "```" + discordCodeBlock + "```";
}