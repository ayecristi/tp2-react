// src/components/profile/SkillBar.jsx
import { useEffect, useRef, useState } from 'react';

export default function SkillBar({ name, percentage, animated = false }) {
    const [width, setWidth] = useState(animated ? 0 : percentage);
    const ref = useRef(null);

    useEffect(() => {
        if (!animated) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setWidth(percentage);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [animated, percentage]);

    return (
        <li ref={ref}>
            <div className="progress-bar__header">
                <span>{name}</span>
                <span className="progress-bar__percentage">{percentage}%</span>
            </div>
            <div className="progress-bar">
                <div
                    className="progress-bar__fill"
                    style={{
                        width: `${width}%`,
                        transition: animated ? 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                    }}
                />
            </div>
        </li>
    );
}