import { useState } from 'react';

const useTime = () => {
    const [start, setStart] = useState(0);
    const [stop, setStop] = useState(0);
    const [time, setTime] = useState(0);

    const startTimer = () => {
        setStart(Date.now());
    }

    const stopTimer = () => {
        setStop(Date.now());
        setTime(stop - start);
    }


    return { startTimer, stopTimer, time }
}

export default useTime;