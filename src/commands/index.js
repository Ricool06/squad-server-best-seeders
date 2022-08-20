import tipbrick from './tipbrick.js';
import hellobrick from './hellobrick.js';
import shouldsquashstoptalking from './shouldsquashstoptalking.js';
import seedersoftheweek from './seedersoftheweek.js';
import thankyouace from './thankyouace.js';
import { DEFAULT_RESULT } from '../utils.js';
import checkthestatusmonitor from './checkthestatusmonitor.js';

export default async commandName => {
  switch (commandName) {
    case ('tipbrick'):
      return tipbrick();

    case ('hellobrick'):
      return hellobrick();

    case ('shouldsquashstoptalking'):
      return shouldsquashstoptalking();

    case ('seedersoftheweek'):
      return seedersoftheweek();

    case ('thankyouace'):
      return thankyouace();

    case ('checkthestatusmonitor'):
      return checkthestatusmonitor();

    default:
      return DEFAULT_RESULT;
  }
};

// export default {
//   'tipbrick': tipbrick,
//   'hellobrick': hellobrick,
//   'shouldsquashstoptalking': shouldsquashstoptalking,
//   'seedersoftheweek': seedersoftheweek,
//   'thankyouace': thankyouace,
// };
