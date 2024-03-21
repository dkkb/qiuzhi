import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatTime = (date: Date) => {
    const now = dayjs();
    const targetTime = dayjs(date);
    const diff = now.diff(targetTime, 'day');
    if (diff < 1) {
        return targetTime.fromNow();
    } else {
        return targetTime.format('YYYY-MM-DD HH:mm');
    }
}