import styles from './Hero.module.css';

export default function Hero() {
  const bars = Array.from({ length: 10 });

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          INTERSTELLAR<br />ROCKDEVS
        </h1>
        
        <div className={styles.heroEqualizer}>
          {bars.map((_, index) => (
            <div key={index} className={styles.heroEqualizerBar}></div>
          ))}
        </div>

        <p className={styles.heroDescription}>
          Preparate para un viaje sónico a través del cosmos. Combinamos código fuente con frecuencias espaciales, convirtiendo cada proyecto en una supernova.
        </p>
        
        <button className={styles.btnPlayHero}>
          INICIAR VIAJE SÓNICO
        </button>
      </div>
    </section>
  );
}