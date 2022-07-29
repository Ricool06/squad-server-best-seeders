import { flipCoin, makeResponse } from '../utils.js';

export default () => (flipCoin() ? makeResponse('grrrrr 😡') : makeResponse('uWu daddy 👅👅👅👅'));
