import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export const flipCoin = () => Math.random() > 0.5;

dayjs.extend(utc);
dayjs.extend(timezone);
