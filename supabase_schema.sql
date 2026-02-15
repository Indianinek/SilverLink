-- Create residents table
create table residents (
  id bigint primary key,
  first_name text not null,
  last_name text not null,
  age int not null,
  room text not null,
  photo text not null,
  allergies text[] default '{}',
  diagnoses text[] default '{}',
  emergency_contact jsonb not null,
  meals jsonb not null,
  hygiene boolean default false,
  walk boolean default false
);

-- Create medications table
create table medications (
  id bigint primary key,
  resident_id bigint references residents(id),
  name text not null,
  dose text not null,
  schedule text not null,
  administered_at timestamptz
);

-- Create staff_reports table
create table staff_reports (
  id bigint primary key,
  created_at timestamptz default now(),
  author text not null,
  shift text not null,
  content text not null
);

-- Create family_feed table
create table family_feed (
  id bigint primary key,
  resident_id bigint references residents(id),
  content text not null,
  type text not null,
  created_at timestamptz default now(),
  author text not null,
  photo_url text
);

-- Create incidents table
create table incidents (
  id bigint primary key,
  resident_id bigint references residents(id),
  created_at timestamptz default now(),
  description text not null,
  severity text not null
);

-- Create chat_messages table
create table chat_messages (
  id bigint primary key,
  sender text not null,
  sender_name text not null,
  content text not null,
  created_at timestamptz default now()
);

-- Seed residents
insert into residents (id, first_name, last_name, age, room, photo, allergies, diagnoses, emergency_contact, meals, hygiene, walk) values
(1, 'Zofia', 'Kowalska', 82, '101', '👵', ARRAY['Penicylina', 'Orzechy'], ARRAY['Nadciśnienie', 'Cukrzyca typu 2'], '{"name": "Anna Kowalska", "phone": "+48 601 234 567", "relation": "Córka"}', '{"breakfast": false, "lunch": false, "dinner": false}', false, false),
(2, 'Jan', 'Nowak', 78, '102', '👴', ARRAY['Sulfonamidy'], ARRAY['Choroba Parkinsona', 'Osteoporoza'], '{"name": "Marek Nowak", "phone": "+48 602 345 678", "relation": "Syn"}', '{"breakfast": true, "lunch": false, "dinner": false}', false, false),
(3, 'Maria', 'Wiśniewska', 85, '103', '👵', ARRAY[]::text[], ARRAY['Demencja', 'Niewydolność serca'], '{"name": "Katarzyna Wiśniewska", "phone": "+48 603 456 789", "relation": "Wnuczka"}', '{"breakfast": false, "lunch": false, "dinner": false}', false, false),
(4, 'Stanisław', 'Zieliński', 91, '104', '👴', ARRAY['Jod', 'Aspiryna'], ARRAY['Astma', 'Zaćma'], '{"name": "Ewa Zielińska", "phone": "+48 604 567 890", "relation": "Córka"}', '{"breakfast": true, "lunch": true, "dinner": false}', true, false),
(5, 'Helena', 'Lewandowska', 76, '105', '👵', ARRAY['Laktoza'], ARRAY['Reumatoidalne zapalenie stawów'], '{"name": "Tomasz Lewandowski", "phone": "+48 605 678 901", "relation": "Syn"}', '{"breakfast": false, "lunch": false, "dinner": false}', false, false);

-- Seed medications
insert into medications (id, resident_id, name, dose, schedule, administered_at) values
(101, 1, 'Metformina', '500mg', '08:00, 20:00', null),
(102, 1, 'Amlodypina', '5mg', '08:00', null),
(103, 1, 'Insulina', '10j', '07:30', null),
(201, 2, 'Lewodopa', '250mg', '07:00, 13:00, 19:00', null),
(202, 2, 'Wapń + Wit. D3', '1000mg/800IU', '09:00', null),
(301, 3, 'Donepezil', '10mg', '21:00', null),
(302, 3, 'Furosemid', '40mg', '08:00', null),
(303, 3, 'Ramipril', '5mg', '08:00', null),
(401, 4, 'Salbutamol', '2 dawki', 'W razie potrzeby', null),
(402, 4, 'Omeprazol', '20mg', '07:00', null),
(501, 5, 'Metotreksat', '15mg', 'Poniedziałek', null),
(502, 5, 'Kwas foliowy', '5mg', 'Wtorek-Niedziela', null),
(503, 5, 'Prednizon', '5mg', '08:00', null);

-- Seed staff_reports
insert into staff_reports (id, created_at, author, shift, content) values
(1, '2026-02-14T06:00:00', 'Agnieszka Maj', 'Nocna (22:00-06:00)', 'Spokojny dyżur nocny. Pan Nowak (p. 102) budził się dwukrotnie ok. 2:00 i 4:30 — podano wodę, zasnął ponownie. Pani Wiśniewska (p. 103) niespokojny sen, monitorowano. Reszta podopiecznych przespała noc bez zakłóceń. Wszystkie parametry stabilne.'),
(2, '2026-02-14T14:00:00', 'Robert Kaczmarek', 'Dzienna (06:00-14:00)', 'Śniadanie wydane o 8:00, wszyscy jedli z apetytem oprócz Pani Kowalskiej (p. 101) — odmówiła śniadania, podano herbatę z ciastkiem o 9:30. Gimnastyka poranna z fizjoterapeutą — uczestniczyło 4/5 podopiecznych. Pan Zieliński miał wizytę córki 10:00-12:00. Leki poranne podane wg harmonogramu.'),
(3, '2026-02-13T22:00:00', 'Dorota Sikora', 'Popołudniowa (14:00-22:00)', 'Zajęcia plastyczne 15:00-16:30 — duże zainteresowanie, Pani Lewandowska namalowała piękny obraz. Kolacja o 18:00. Pan Nowak miał krótki epizod dezorientacji ok. 17:00 — opanowany rozmową, bez interwencji farmakologicznej. Wieczorne leki podane. Pani Wiśniewska FaceTime z wnuczką 19:00.');

-- Seed family_feed
insert into family_feed (id, resident_id, content, type, created_at, author, photo_url) values
(1, 1, 'Pani Zofia dzisiaj świetnie się bawiła na zajęciach muzycznych! Śpiewała swoje ulubione przedwojenne piosenki. 🎵', 'status', '2026-02-14T11:00:00', 'Opiekunka Anna', null),
(2, 1, 'Poranny spacer po ogrodzie — Pani Zofia cieszyła się słońcem ☀️', 'photo', '2026-02-14T09:30:00', 'Opiekunka Anna', '🌸'),
(3, 2, 'Pan Jan uczestniczył w zajęciach z fizjoterapeutą. Ćwiczenia koordynacyjne przebiegły bardzo dobrze!', 'status', '2026-02-14T10:00:00', 'Fizjoterapeuta Michał', null),
(4, 3, 'Pani Maria miała dzisiaj dobry dzień — rozpoznała wnuczkę na FaceTime i rozmawiała ok. 15 minut 💕', 'status', '2026-02-13T19:30:00', 'Opiekunka Dorota', null),
(5, 5, 'Pani Helena skończyła piękny obraz podczas zajęć plastycznych! Prawdziwa artystka 🎨', 'photo', '2026-02-13T16:30:00', 'Terapeuta zajęciowy Kasia', '🎨'),
(6, 4, 'Pan Stanisław miał wizytę córki — wspólnie przeglądali stare albumy ze zdjęciami. Piękne wspomnienia! 📸', 'status', '2026-02-14T12:00:00', 'Opiekun Robert', null);

-- Seed chat_messages
insert into chat_messages (id, sender, sender_name, content, created_at) values
(1, 'family', 'Anna Kowalska', 'Dzień dobry, chciałam zapytać o samopoczucie mamy po wczorajszym dniu.', '2026-02-14T08:00:00'),
(2, 'director', 'Dyrektor Małgorzata', 'Dzień dobry Pani Anno! Pani Zofia czuje się dzisiaj bardzo dobrze, śniadanie zjadła z apetytem. Zapraszamy na wizytę w godzinach 10-18.', '2026-02-14T08:15:00');

-- Enable Row Level Security (RLS)
alter table residents enable row level security;
alter table medications enable row level security;
alter table staff_reports enable row level security;
alter table family_feed enable row level security;
alter table incidents enable row level security;
alter table chat_messages enable row level security;

-- Create basic policies to allow public access (for MVP simplicity, we allow all operations for now)
create policy "Public access to residents" on residents for all using (true);
create policy "Public access to medications" on medications for all using (true);
create policy "Public access to staff_reports" on staff_reports for all using (true);
create policy "Public access to family_feed" on family_feed for all using (true);
create policy "Public access to incidents" on incidents for all using (true);
create policy "Public access to chat_messages" on chat_messages for all using (true);

-- Enable Realtime
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table residents, medications, staff_reports, family_feed, incidents, chat_messages;
