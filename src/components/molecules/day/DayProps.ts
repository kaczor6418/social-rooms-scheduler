import { WeekDay } from '../../../store/features/week/weekState';

export interface DayProps {
  timeRange: [number, number];
  timeStep: 0.5 | 1 | 2 | 4;
  day: WeekDay;
}
