// src/components/profile/ProfileHero.jsx
import CountdownWidget from './CountdownWidget';

export default function ProfileHero({ member }) {
    return (
        <section className="profile-hero">
            <div className="profile-hero__media">
                <img
                    src={member.image}
                    alt={`Retrato de ${member.name}`}
                    className="profile-hero__image"
                />
                <div className="profile-hero__status-mobile">
                    <span className="status-dot status-dot--tertiary"></span>
                    <span>{member.status}</span>
                </div>
            </div>

            <div className="profile-hero__content">
                <div className="profile-hero__meta-top">
                    <span className="profile-hero__role">
                        <i className={member.iconClass}></i> {member.role}
                    </span>
                    <span className="profile-hero__location">
                        <i className="fa-solid fa-location-dot"></i> {member.locationFull}
                    </span>
                </div>

                <h1 className="profile-hero__name">{member.name}</h1>

                <div className="profile-hero__location-mobile">
                    <i className="fa-solid fa-location-dot"></i> {member.locationFull}
                </div>

                <p className="profile-hero__quote">{member.quote}</p>

                <div className="profile-hero__stats">
                    <div className="profile-hero__stat profile-hero__stat--pill">
                        <span className="profile-hero__stat-value">
                            <i className="fa-solid fa-location-dot" style={{ color: 'var(--tertiary)' }}></i> {member.locationShort}
                        </span>
                    </div>

                    <div className="profile-hero__stat">
                        <span className="profile-hero__stat-label">Ciclos</span>
                        <span className="profile-hero__stat-value">
                            <i className="fa-solid fa-hourglass-half" style={{ color: 'var(--tertiary)', marginRight: '5px' }}></i>
                            {member.age}
                            <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--on-surface-variant)' }}>.y</span>
                        </span>
                    </div>

                    <div className="profile-hero__stat profile-hero__stat--mobile-extra">
                        <span className="profile-hero__stat-label">Primary Instrument</span>
                        <span className="profile-hero__stat-value">{member.instrument}</span>
                    </div>

                    <div className="profile-hero__stat profile-hero__stat--mobile-extra">
                        <span className="profile-hero__stat-label">Stage Role</span>
                        <span className="profile-hero__stat-value">{member.role}</span>
                    </div>

                    <div className="profile-hero__stat profile-hero__stat--desktop-status">
                        <span className="profile-hero__stat-label">Estado</span>
                        <span className="profile-hero__stat-value" style={{ color: 'var(--tertiary)', fontSize: '1.2rem' }}>
                            <span className="status-dot status-dot--tertiary"></span> {member.status}
                        </span>
                    </div>

                    {member.feature === 'countdown' && member.nextShow && (
                        <CountdownWidget nextShow={member.nextShow} />
                    )}
                </div>

                <div className="profile-hero__comms">
                    <i className="fa-solid fa-satellite-dish"></i> COMUNICACIONES ABIERTAS ...
                </div>
            </div>
        </section>
    );
}