// src/components/profile/CountdownWidget.jsx
import { useEffect, useState } from 'react';

export default function CountdownWidget({ nextShow }) {
    const [timeLeft, setTimeLeft] = useState({ days: '--', hours: '--', mins: '--', secs: '--' });

    useEffect(() => {
        if (!nextShow) return;

        const targetDate = new Date(nextShow);

        function tick() {
            const diff = targetDate - new Date();
            if (diff <= 0) return;
            setTimeLeft({
                days: String(Math.floor(diff / 86400000)).padStart(2, '0'),
                hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
                mins: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
                secs: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
            });
        }

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [nextShow]);

    return (
        <div className="countdown-widget">
            <p className="countdown__label">▶ Próximo Show</p>
            <div className="countdown__grid">
                <div className="countdown__unit">
                    <span>{timeLeft.days}</span>
                    <small>DÍAS</small>
                </div>
                <div className="countdown__unit">
                    <span>{timeLeft.hours}</span>
                    <small>HRS</small>
                </div>
                <div className="countdown__unit">
                    <span>{timeLeft.mins}</span>
                    <small>MIN</small>
                </div>
                <div className="countdown__unit">
                    <span>{timeLeft.secs}</span>
                    <small>SEG</small>
                </div>
            </div>
        </div>
    );
}