import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentDate((new Date()));
    }, 1000);


    return () => clearInterval(intervalId);
  }, []); 

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentDate.toLocaleDateString(undefined,options)
  return (
    <div>
      <p>{timezone} {formattedDate} {formattedTime}</p>
    </div>
  );
};

export default Clock;