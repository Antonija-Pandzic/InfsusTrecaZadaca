DROP TABLE IF EXISTS SOBA CASCADE;
DROP TABLE IF EXISTS ODJEL CASCADE;
DROP TABLE IF EXISTS TIP_SOBE CASCADE;
DROP TABLE IF EXISTS TIP_ODJELA CASCADE;

CREATE TABLE TIP_ODJELA
(
    tip_odjela_id SERIAL PRIMARY KEY,
    naziv VARCHAR(50) NOT NULL UNIQUE,
    opis VARCHAR(255)
);

CREATE TABLE ODJEL
(
    odjel_id SERIAL PRIMARY KEY,
    naziv VARCHAR(100) NOT NULL UNIQUE,
    opis VARCHAR(255),
    tip_odjela_id INT NOT NULL,

    CONSTRAINT odjel_tip_odjela_id_fkey
        FOREIGN KEY (tip_odjela_id)
        REFERENCES TIP_ODJELA(tip_odjela_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE TIP_SOBE
(
    tip_sobe_id SERIAL PRIMARY KEY,
    naziv VARCHAR(50) NOT NULL UNIQUE,
    opis VARCHAR(255)
);

CREATE TABLE SOBA
(
    soba_id SERIAL PRIMARY KEY,
    broj_sobe VARCHAR(10) NOT NULL,
    kapacitet INT NOT NULL CHECK (kapacitet BETWEEN 1 AND 8),
    odjel_id INT NOT NULL,
    tip_sobe_id INT NOT NULL,

    CONSTRAINT soba_odjel_id_fkey
        FOREIGN KEY (odjel_id)
        REFERENCES ODJEL(odjel_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT soba_tip_sobe_id_fkey
        FOREIGN KEY (tip_sobe_id)
        REFERENCES TIP_SOBE(tip_sobe_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT soba_odjel_broj_sobe_unique
        UNIQUE (odjel_id, broj_sobe)
);

INSERT INTO TIP_ODJELA (naziv, opis) VALUES
('Internistički', 'Odjeli za unutarnje bolesti i konzervativno liječenje'),
('Kirurški', 'Odjeli za kirurške zahvate i operativno liječenje'),
('Dijagnostički', 'Odjeli za dijagnostičke preglede i postupke'),
('Rehabilitacijski', 'Odjeli za oporavak i rehabilitaciju pacijenata');

INSERT INTO ODJEL (naziv, opis, tip_odjela_id) VALUES
('Kardiologija', 'Dijagnostika i liječenje bolesti srca i krvožilnog sustava', 1),
('Neurologija', 'Liječenje bolesti mozga, živčanog sustava i neuroloških poremećaja', 1),
('Ortopedija', 'Liječenje ozljeda, deformacija i bolesti kostiju, zglobova i mišića', 4),
('Kirurgija', 'Kirurški zahvati, operativno liječenje i postoperativna skrb pacijenata', 2),
('Radiologija', 'Slikovna dijagnostika pomoću RTG-a, CT-a, MR-a i ultrazvuka', 3);

INSERT INTO TIP_SOBE (naziv, opis) VALUES
('Standardna', 'Obična bolnička soba za redovni smještaj pacijenata'),
('Intenzivna njega', 'Soba za pacijente kojima je potreban stalni nadzor'),
('Izolacija', 'Soba za pacijente koje je potrebno odvojiti od ostalih'),
('Postoperativna', 'Soba za oporavak pacijenata nakon operacije'),
('VIP soba', 'Posebno opremljena soba za pacijente s dodatnim potrebama');

INSERT INTO SOBA (broj_sobe, kapacitet, odjel_id, tip_sobe_id) VALUES
('101', 3, 1, 1),
('102', 2, 1, 2),
('201', 4, 2, 1),
('202', 1, 2, 3),
('301', 2, 3, 1),
('401', 3, 4, 4),
('501', 2, 5, 1);