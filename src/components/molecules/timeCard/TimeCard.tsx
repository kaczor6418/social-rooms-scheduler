import React, { useState } from 'react';
import { isEmpty } from '../../../common/ARRAY_UTILS';
import { TimeCardProps } from './TimeCardProps';
import { useAppDispatch } from '../../../app/hooks';
import { makeReservation } from '../../../store/features/week/weekActions';
import ReactDOM from 'react-dom';

import styles from './TimeCard.module.scss';

export function TimeCard({ reservations, timeRange }: TimeCardProps) {
  const dispatch = useAppDispatch();
  const [showReservations, setShowReservations] = useState(false);
  const hasReservations = () => isEmpty(reservations);
  const displayReservations = () => setShowReservations(true);
  const hideReservations = (e: React.MouseEvent) => {
    setShowReservations(false);
    e.stopPropagation();
  };
  const uniqueKey = (start: string, end: string) => `${start};${end}`;
  return (
    <div className={'card-wrapper'} onClick={displayReservations}>
      <p>----------------------------------------------------TIME CARD START: {timeRange[0]}</p>
      {hasReservations() &&
        showReservations &&
        ReactDOM.createPortal(
          <div className={styles.reservations}>
            <button onClick={hideReservations}>Close</button>
            {reservations.map(({ people, endUTC, startUTC }) => (
              <details key={uniqueKey(startUTC, endUTC)}>
                <summary>{`${startUTC} - ${endUTC} (People: ${people.length})`}</summary>
                <ul>
                  {people.map(({ roomNumber, lastName, firstName }) => (
                    <li
                      key={`${lastName}-${roomNumber}`}
                    >{`${firstName} ${lastName} (room: ${roomNumber})`}</li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    void dispatch(
                      makeReservation({
                        startUTC,
                        endUTC,
                        booking: { roomNumber: 12, lastName: 'ascac', firstName: 'acsac' },
                        dateUTC: '06-01-2021'
                      })
                    )
                  }
                >
                  Join reservation
                </button>
              </details>
            ))}
          </div>,
          document.body
        )}
      <p>----------------------------------------------------TIME CARD END: {timeRange[1]}</p>
    </div>
  );
}
