import { format, parse, addMinutes, differenceInMinutes, startOfDay } from 'date-fns';

export const generateTimeSlots = (start, end, interval) => {
  const slots = [];
  let current = parse(start, 'HH:mm', new Date());
  const endTime = parse(end, 'HH:mm', new Date());

  while (current <= endTime) {
    slots.push(format(current, 'HH:mm'));
    current = addMinutes(current, interval);
  }

  return slots;
};

export const getPositionFromTime = (timeStr, startTimeStr, slotInterval, slotWidth) => {
  const time = new Date(timeStr);
  const baseTime = startOfDay(time);
  const shopStart = parse(startTimeStr, 'HH:mm', baseTime);
  
  const minutesFromStart = differenceInMinutes(time, shopStart);
  return (minutesFromStart / slotInterval) * slotWidth;
};

export const getDurationWidth = (start, end, slotInterval, slotWidth) => {
  const duration = differenceInMinutes(new Date(end), new Date(start));
  return (duration / slotInterval) * slotWidth;
};

export const getTimeFromPosition = (x, startTimeStr, slotInterval, slotWidth) => {
  const totalMinutes = (x / slotWidth) * slotInterval;
  const baseTime = startOfDay(new Date('2023-10-27T00:00:00')); // Use a fixed date for calculation
  const shopStart = parse(startTimeStr, 'HH:mm', baseTime);
  const targetTime = addMinutes(shopStart, totalMinutes);
  
  return format(targetTime, "yyyy-MM-dd'T'HH:mm:ss");
};
