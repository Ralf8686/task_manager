const Days = ['', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

export default (days = []) => {
  const sortDays = days.sort();
  const len = sortDays.length;
  const firstDay = sortDays[0];
  const lastDay = sortDays[len - 1];
  if (len === 2 && firstDay === 6 && lastDay === 7) {
    return 'Weekend';
  }
  if (len === 5 && firstDay === 1 && lastDay === 5) {
    return 'Weekdays';
  }
  return sortDays.map(day => Days[day]).join(', ');
};
