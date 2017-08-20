const Days = ['', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

export default (days = []) => {
  const len = days.length;
  if (len === 0) return '';
  if (!Array.isArray(days)) return '';
  const sortDays = days.sort();
  const firstDay = sortDays[0];
  const lastDay = sortDays[len - 1];
  if (len === 2 && firstDay === 6 && lastDay === 7) {
    return 'Weekend';
  }
  if (len === 5 && firstDay === 1 && lastDay === 5) {
    return 'Weekdays';
  }
  if (len === 7 && firstDay === 1 && lastDay === 7) {
    return 'Everyday';
  }
  return sortDays.map(day => Days[day]).join(', ');
};
