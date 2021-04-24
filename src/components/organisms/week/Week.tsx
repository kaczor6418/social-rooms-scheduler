import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectWeek } from '../../../store/features/week/weekSelectors';
import { initializeWeekReservations } from '../../../store/features/week/weekActions';
import { Day } from '../../molecules/day/Day';
import { isEmpty } from '../../../common/ARRAY_UTILS';

export function Week() {
  const { days, currentOperationState } = useAppSelector(selectWeek);
  const dispatch = useAppDispatch();
  console.log(currentOperationState);
  useEffect(() => {
    void dispatch(initializeWeekReservations());
  }, []);

  const hasAnyDays = () => isEmpty(days);

  return (
    <div>
      {/*<pre>{JSON.stringify(days, null, 2)}</pre>*/}
      {hasAnyDays() &&
        days.map((day) => <Day key={day.dateUTC} timeRange={[0, 24]} timeStep={1} day={day} />)}
    </div>
  );
}
