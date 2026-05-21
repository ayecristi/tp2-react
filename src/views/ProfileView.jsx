// src/views/ProfileView.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { crewDatabase } from '../data/crew';
import ProfileHero from '../components/profile/ProfileHero';
import SkillBar from '../components/profile/SkillBar';
import Accordion from '../components/profile/Accordion';

export default function ProfileView() {
    const { id } = useParams();
    const member = crewDatabase[id] || crewDatabase['ayelen'];
    const quoteRef = useRef(null);

    useEffect(() => {
        if (member.feature !== 'type-writer' || !quoteRef.current) return;

        const fullText = member.quote;
        let charIndex = 0;
        let isDeleting = false;
        const el = quoteRef.current;
        el.style.borderRight = '2px solid var(--primary)';

        function type() {
            if (isDeleting) {
                el.textContent = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                el.textContent = fullText.substring(0, charIndex + 1);
                charIndex++;
            }

            let timeout = isDeleting ? 30 : 50;
            if (!isDeleting && charIndex === fullText.length) {
                timeout = 3000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                timeout = 3000;
            }
            setTimeout(type, timeout);
        }
        type();
    }, [member]);

    useEffect(() => {
        if (!member.parallax) return;

        let container = document.getElementById('stars-parallax');
        if (!container) {
            container = document.createElement('div');
            container.id = 'stars-parallax';
            container.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;overflow:hidden;`;
            document.body.insertBefore(container, document.body.firstChild);

            const colors = ['#ffffff', '#ffb1c4', '#00d5e5', '#ff4a8d'];
            for (let i = 0; i < 150; i++) {
                const star = document.createElement('div');
                const size = Math.random() * 3 + 1;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const depth = Math.random() * 0.8 + 0.1;
                star.className = 'star';
                star.dataset.depth = depth;
                star.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:${color};border-radius:50%;left:${Math.random() * 100}%;top:${Math.random() * 100}%;opacity:${Math.random() * 0.7 + 0.3};box-shadow:0 0 ${size * 2}px ${color};`;
                if (Math.random() > 0.7) star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
                container.appendChild(star);
            }
        }

        let ticking = false;
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    container.querySelectorAll('.star').forEach(star => {
                        const depth = parseFloat(star.dataset.depth) || 0.5;
                        star.style.transform = `translateY(${scrollY * 0.3 * depth}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            const el = document.getElementById('stars-parallax');
            if (el) el.remove();
        };
    }, [member]);

    return (
        <div className="container">
            <ProfileHero member={member} />

            <section className="grid-3">
                <Accordion
                    id="skills"
                    icon="fa-solid fa-brain"
                    iconColor="var(--tertiary)"
                    title="Habilidades"
                >
                    <ul className="accordion__list">
                        {member.skills.map((skill, i) => (
                            <SkillBar
                                key={i}
                                name={skill.name}
                                percentage={skill.percentage}
                                animated={member.feature === 'skill-bars-animated'}
                            />
                        ))}
                    </ul>
                </Accordion>

                <Accordion
                    id="movies"
                    icon="fa-solid fa-film"
                    iconColor="var(--primary-container)"
                    title="Películas"
                    contentClass="accordion__content--primary"
                >
                    <ul className="accordion__list">
                        {member.movies.map((movie, i) => (
                            <li key={i} className="accordion__list-item">
                                <div>
                                    <strong>{movie.title}</strong><br />
                                    <span className="accordion__text-small">{movie.description}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Accordion>

                <Accordion
                    id="albums"
                    icon="fa-solid fa-compact-disc"
                    iconColor="var(--tertiary)"
                    title="Discos"
                    contentClass="accordion__content--tertiary"
                >
                    <ul className="accordion__list">
                        {member.albums.map((album, i) => (
                            <li key={i} className="accordion__list-item">
                                <div className="accordion__icon-box">
                                    <i className="fa-solid fa-music accordion__icon"></i>
                                </div>
                                <div>
                                    <strong>{album.title}</strong><br />
                                    <span className="accordion__text-small">{album.band}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Accordion>
            </section>
        </div>
    );
}