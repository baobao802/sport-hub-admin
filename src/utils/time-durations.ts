import moment from 'moment';

export default function genTimeDurations() {
  const durations: string[] = [];
  new Array(24).fill(0).forEach((_v, index) => {
    const start = moment({ hour: index, minute: 30 });
    const end = start.clone().add(1, 'h');
    durations.push(start.format('HH:mm') + ' - ' + end.format('HH:mm'));
  });
  return durations;
}
