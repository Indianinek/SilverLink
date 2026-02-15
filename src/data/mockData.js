export const initialData = {
    residents: [
        {
            id: 1,
            firstName: "Zofia",
            lastName: "Kowalska",
            age: 82,
            room: "101",
            photo: "👵",
            allergies: ["Penicylina", "Orzechy"],
            diagnoses: ["Nadciśnienie", "Cukrzyca typu 2"],
            emergencyContact: { name: "Anna Kowalska", phone: "+48 601 234 567", relation: "Córka" },
            meals: { breakfast: false, lunch: false, dinner: false },
            hygiene: false,
            walk: false,
            medications: [
                { id: 101, name: "Metformina", dose: "500mg", schedule: "08:00, 20:00", administeredAt: null },
                { id: 102, name: "Amlodypina", dose: "5mg", schedule: "08:00", administeredAt: null },
                { id: 103, name: "Insulina", dose: "10j", schedule: "07:30", administeredAt: null }
            ]
        },
        {
            id: 2,
            firstName: "Jan",
            lastName: "Nowak",
            age: 78,
            room: "102",
            photo: "👴",
            allergies: ["Sulfonamidy"],
            diagnoses: ["Choroba Parkinsona", "Osteoporoza"],
            emergencyContact: { name: "Marek Nowak", phone: "+48 602 345 678", relation: "Syn" },
            meals: { breakfast: true, lunch: false, dinner: false },
            hygiene: false,
            walk: false,
            medications: [
                { id: 201, name: "Lewodopa", dose: "250mg", schedule: "07:00, 13:00, 19:00", administeredAt: null },
                { id: 202, name: "Wapń + Wit. D3", dose: "1000mg/800IU", schedule: "09:00", administeredAt: null }
            ]
        },
        {
            id: 3,
            firstName: "Maria",
            lastName: "Wiśniewska",
            age: 85,
            room: "103",
            photo: "👵",
            allergies: [],
            diagnoses: ["Demencja", "Niewydolność serca"],
            emergencyContact: { name: "Katarzyna Wiśniewska", phone: "+48 603 456 789", relation: "Wnuczka" },
            meals: { breakfast: false, lunch: false, dinner: false },
            hygiene: false,
            walk: false,
            medications: [
                { id: 301, name: "Donepezil", dose: "10mg", schedule: "21:00", administeredAt: null },
                { id: 302, name: "Furosemid", dose: "40mg", schedule: "08:00", administeredAt: null },
                { id: 303, name: "Ramipril", dose: "5mg", schedule: "08:00", administeredAt: null }
            ]
        },
        {
            id: 4,
            firstName: "Stanisław",
            lastName: "Zieliński",
            age: 91,
            room: "104",
            photo: "👴",
            allergies: ["Jod", "Aspiryna"],
            diagnoses: ["Astma", "Zaćma"],
            emergencyContact: { name: "Ewa Zielińska", phone: "+48 604 567 890", relation: "Córka" },
            meals: { breakfast: true, lunch: true, dinner: false },
            hygiene: true,
            walk: false,
            medications: [
                { id: 401, name: "Salbutamol", dose: "2 dawki", schedule: "W razie potrzeby", administeredAt: null },
                { id: 402, name: "Omeprazol", dose: "20mg", schedule: "07:00", administeredAt: null }
            ]
        },
        {
            id: 5,
            firstName: "Helena",
            lastName: "Lewandowska",
            age: 76,
            room: "105",
            photo: "👵",
            allergies: ["Laktoza"],
            diagnoses: ["Reumatoidalne zapalenie stawów"],
            emergencyContact: { name: "Tomasz Lewandowski", phone: "+48 605 678 901", relation: "Syn" },
            meals: { breakfast: false, lunch: false, dinner: false },
            hygiene: false,
            walk: false,
            medications: [
                { id: 501, name: "Metotreksat", dose: "15mg", schedule: "Poniedziałek", administeredAt: null },
                { id: 502, name: "Kwas foliowy", dose: "5mg", schedule: "Wtorek-Niedziela", administeredAt: null },
                { id: 503, name: "Prednizon", dose: "5mg", schedule: "08:00", administeredAt: null }
            ]
        }
    ],

    staffReports: [
        {
            id: 1,
            timestamp: "2026-02-14T06:00:00",
            author: "Agnieszka Maj",
            shift: "Nocna (22:00-06:00)",
            content: "Spokojny dyżur nocny. Pan Nowak (p. 102) budził się dwukrotnie ok. 2:00 i 4:30 — podano wodę, zasnął ponownie. Pani Wiśniewska (p. 103) niespokojny sen, monitorowano. Reszta podopiecznych przespała noc bez zakłóceń. Wszystkie parametry stabilne."
        },
        {
            id: 2,
            timestamp: "2026-02-14T14:00:00",
            author: "Robert Kaczmarek",
            shift: "Dzienna (06:00-14:00)",
            content: "Śniadanie wydane o 8:00, wszyscy jedli z apetytem oprócz Pani Kowalskiej (p. 101) — odmówiła śniadania, podano herbatę z ciastkiem o 9:30. Gimnastyka poranna z fizjoterapeutą — uczestniczyło 4/5 podopiecznych. Pan Zieliński miał wizytę córki 10:00-12:00. Leki poranne podane wg harmonogramu."
        },
        {
            id: 3,
            timestamp: "2026-02-13T22:00:00",
            author: "Dorota Sikora",
            shift: "Popołudniowa (14:00-22:00)",
            content: "Zajęcia plastyczne 15:00-16:30 — duże zainteresowanie, Pani Lewandowska namalowała piękny obraz. Kolacja o 18:00. Pan Nowak miał krótki epizod dezorientacji ok. 17:00 — opanowany rozmową, bez interwencji farmakologicznej. Wieczorne leki podane. Pani Wiśniewska FaceTime z wnuczką 19:00."
        }
    ],

    familyFeed: [
        {
            id: 1,
            seniorId: 1,
            content: "Pani Zofia dzisiaj świetnie się bawiła na zajęciach muzycznych! Śpiewała swoje ulubione przedwojenne piosenki. 🎵",
            type: "status",
            date: "2026-02-14T11:00:00",
            author: "Opiekunka Anna"
        },
        {
            id: 2,
            seniorId: 1,
            content: "Poranny spacer po ogrodzie — Pani Zofia cieszyła się słońcem ☀️",
            type: "photo",
            date: "2026-02-14T09:30:00",
            author: "Opiekunka Anna",
            photoUrl: "🌸"
        },
        {
            id: 3,
            seniorId: 2,
            content: "Pan Jan uczestniczył w zajęciach z fizjoterapeutą. Ćwiczenia koordynacyjne przebiegły bardzo dobrze!",
            type: "status",
            date: "2026-02-14T10:00:00",
            author: "Fizjoterapeuta Michał"
        },
        {
            id: 4,
            seniorId: 3,
            content: "Pani Maria miała dzisiaj dobry dzień — rozpoznała wnuczkę na FaceTime i rozmawiała ok. 15 minut 💕",
            type: "status",
            date: "2026-02-13T19:30:00",
            author: "Opiekunka Dorota"
        },
        {
            id: 5,
            seniorId: 5,
            content: "Pani Helena skończyła piękny obraz podczas zajęć plastycznych! Prawdziwa artystka 🎨",
            type: "photo",
            date: "2026-02-13T16:30:00",
            author: "Terapeuta zajęciowy Kasia",
            photoUrl: "🎨"
        },
        {
            id: 6,
            seniorId: 4,
            content: "Pan Stanisław miał wizytę córki — wspólnie przeglądali stare albumy ze zdjęciami. Piękne wspomnienia! 📸",
            type: "status",
            date: "2026-02-14T12:00:00",
            author: "Opiekun Robert"
        }
    ],

    incidents: [],

    chatMessages: [
        {
            id: 1,
            sender: "family",
            senderName: "Anna Kowalska",
            content: "Dzień dobry, chciałam zapytać o samopoczucie mamy po wczorajszym dniu.",
            timestamp: "2026-02-14T08:00:00"
        },
        {
            id: 2,
            sender: "director",
            senderName: "Dyrektor Małgorzata",
            content: "Dzień dobry Pani Anno! Pani Zofia czuje się dzisiaj bardzo dobrze, śniadanie zjadła z apetytem. Zapraszamy na wizytę w godzinach 10-18.",
            timestamp: "2026-02-14T08:15:00"
        }
    ]
};
