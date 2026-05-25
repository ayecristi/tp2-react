import imgAyelen from '../assets/img/profile_vocalist_02.png';
import imgLucio from '../assets/img/profile_guitarist_02.png';
import imgMatias from '../assets/img/profile_drummer_02.png';

export const crewDatabase = {
    ayelen: {
        id: 'ayelen',
        name: "AYELEN",
        role: "Vocals",
        iconClass: "fa-solid fa-microphone",
        locationFull: "Base Alpha, Kepler-452b",
        locationShort: "Sector 7G Alpha",
        age: "28",
        status: "ONLINE",
        instrument: "Vocal Synthesis",
        quote: '"El vacio del universo se llena con mi voz"',
        image: imgAyelen,
        skills: [
            { name: "JAVA (SpringBoot)", percentage: 100 },
            { name: "Angular", percentage: 60 },
            { name: "Oracle/SQL", percentage: 100 },
            { name: "C#", percentage: 50 },
            { name: "Kotlin", percentage: 50 },
        ],
        movies: [
            { title: "12 Monkeys", description: "Rompecabezas temporal brillante" },
            { title: "Fight Club", description: "Crítica ácida al consumismo" },
            { title: "Fear and Loathing in Las Vegas", description: "Viaje psicodélico rompereglas" }
        ],
        albums: [
            { title: "Prender un fuego", band: "Marilina Bertoldi" },
            { title: "Bach", band: "Bandalos Chinos" },
            { title: "Chances", band: "Illya Kuryaki & The Valderramas" }
        ],
        feature: 'skill-bars-animated'
    },
    lucio: {
        id: 'lucio',
        name: "LUCIO",
        role: "Guitar",
        iconClass: "fa-solid fa-guitar",
        locationFull: "Orbital Station Sirius",
        locationShort: "Sirius Station",
        age: "30",
        status: "ONLINE",
        instrument: "Plasma Guitar",
        quote: '"Distorsionando la galaxia con cada nota"',
        image: imgLucio,
        skills: [
            { name: "JAVA (SpringBoot)", percentage: 100 },
            { name: "Python", percentage: 50 },
            { name: "Angular", percentage: 70 },
            { name: "BPM Oracle", percentage: 80 }
        ],
        movies: [
            { title: "GoodFellas", description: "Crónica del crimen organizado" },
            { title: "12 Monkeys", description: "Rompecabezas temporal brillante" },
            { title: "Amacord", description: "Recuerdos de la infancia y la juventud" }
        ],
        albums: [
            { title: "Romance", band: "Fontaines D.C." },
            { title: "Toro y Pampa", band: "Almafuerte" },
            { title: "Gal Costa", band: "Gal Costa" }
        ],
        feature: 'type-writer',
        parallax: true
    },
    matias: {
        id: 'matias',
        name: "MATIAS",
        role: "Drums",
        iconClass: "fa-solid fa-drum",
        locationFull: "Orion Nebula Outpost",
        locationShort: "Orion Outpost",
        age: "37",
        status: "ONLINE",
        instrument: "Quantum Percussion",
        quote: '"Manteniendo el pulso del universo vivo"',
        image: imgMatias,
        skills: [
            { name: "PHP (Laravel)", percentage: 75 },
            { name: "JAVA (SpringBoot)", percentage: 60 },
            { name: "VUE.js", percentage: 40 },
        ],
        movies: [
            { title: "Ender's Game", description: "Estrategia y liderazgo en un futuro distópico" },
            { title: "Star Wars", description: "La lucha del bien y el mal en la galaxia" },
            { title: "Lord of The Rings", description: "Fantasía épica y aventuras en la Tierra Media" },
        ],
        albums: [
            { title: "Hybrid Theory", band: "Linkin Park" },
            { title: "Lifelines", band: "I Prevail" },
            { title: "Getting Away With Murder", band: "Papa Roach" },
        ],
        feature: 'countdown',
        nextShow: '2026-12-31T20:00:00'
    }
};

export const teamMembers = Object.values(crewDatabase);