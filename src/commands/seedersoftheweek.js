import dayjs from 'dayjs';
import { calculateBestSeedersOfTheWeek } from './seeders/index.js';
import { makeResponse } from '../utils.js';

export default () => {
  const now = dayjs();

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
};
