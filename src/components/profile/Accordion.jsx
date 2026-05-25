// src/components/profile/Accordion.jsx
import { useState } from 'react';

export default function Accordion({ id, icon, iconColor, title, contentClass = '', children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="accordion">
            <input
                type="checkbox"
                id={`toggle-${id}`}
                className="accordion__toggle"
                checked={open}
                onChange={() => setOpen(!open)}
            />
            <label htmlFor={`toggle-${id}`} className="accordion__header">
                <div className="accordion__title">
                    <i className={icon} style={{ color: iconColor }}></i> {title}
                </div>
                <i className="fa-solid fa-chevron-down accordion__arrow"></i>
            </label>
            <div className={`accordion__content ${contentClass}`}>
                {children}
            </div>
        </div>
    );
}