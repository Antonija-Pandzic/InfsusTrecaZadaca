# Sustav za upravljanje hospitalizacijom pacijenata

Web aplikacija za upravljanje bolničkim odjelima, sobama i šifrarnicima izrađena korištenjem React, Express i PostgreSQL tehnologija.

# Pokretanje baze podataka

Potrebno je:

1. Kreirati PostgreSQL bazu podataka
2. Pokrenuti SQL skriptu:
   - database.sql

Skripta kreira:

- tablice
- relacije
- ograničenja
- početne podatke

---

# Konfiguracija baze

Potrebno je napraviti `.env` datoteku unutar backend direktorija.

Primjer:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=InfsusTrecaDz
DB_PASSWORD=lozinka
DB_PORT=5432

NAPOMENA: Projekt koristi dotenv konfiguraciju za povezivanje s PostgreSQL bazom podataka.

---

# Pokretanje backend dijela

Otvoriti terminal:

cd backend

Instalacija paketa:

npm install

Pokretanje backend servera:

npm run dev

Backend se pokreće na:
http://localhost:3000

---

# Pokretanje frontend dijela

Otvoriti novi terminal:

cd frontend

Instalacija paketa:

npm install

Pokretanje frontend aplikacije:

npm run dev

Frontend se pokreće na:
http://localhost:5173

---

# Pokretanje testova

## Backend testovi

cd backend

npm test

Testovi:

- jedinični testovi poslovnog sloja
- integracijski testovi backend API-ja

---

## Frontend testovi

cd frontend

npm run test

Testovi:

- test prezentacijskog sloja

---

# Korištene tehnologije

Frontend:

- React
- TypeScript
- Axios
- Vite

Backend:

- Node.js
- Express
- TypeScript
- Jest
- Supertest

Baza podataka:

- PostgreSQL

---

# Struktura projekta

backend/

- controllers
- services
- repositories
- routes
- database
- tests

frontend/

- components
- pages
- api
- tests
- types

---

# Napomena

Prije pokretanja projekta potrebno je:

- instalirati Node.js
- instalirati PostgreSQL
- konfigurirati `.env` datoteku
- pokrenuti SQL skriptu
