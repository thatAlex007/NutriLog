-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 08. Jan 2025 um 13:06
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `nutrilog`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `k_kalorientracker`
--

CREATE TABLE `k_kalorientracker` (
  `k_nr` int(11) NOT NULL,
  `k_produkt` varchar(225) NOT NULL,
  `k_kalorien` decimal(11,2) NOT NULL,
  `k_u_email` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `k_kalorientracker`
--

INSERT INTO `k_kalorientracker` (`k_nr`, `k_produkt`, `k_kalorien`, `k_u_email`) VALUES
(1, 'wdas', 123.00, 'user@example.com'),
(2, 'Toast', 258.00, 'domi@gmx.at'),
(3, 'easd', 123.00, 'alex@gmx.at'),
(5, 'eistee', 131.00, 'hermes@gmx.at');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `r_recipe`
--

CREATE TABLE `r_recipe` (
  `r_nr` int(11) NOT NULL,
  `r_title` text NOT NULL,
  `r_desc` text NOT NULL,
  `r_u_email` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `r_recipe`
--

INSERT INTO `r_recipe` (`r_nr`, `r_title`, `r_desc`, `r_u_email`) VALUES
(56, 'Tribus Taler', 'Schoko; Zimt', 'domi@gmx.at'),
(57, 'Mamas Toast', 'Machen machen machen', 'domi@gmx.at');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `t_trainingsplan`
--

CREATE TABLE `t_trainingsplan` (
  `t_id` int(11) NOT NULL,
  `t_u_email` varchar(45) NOT NULL,
  `t_day` varchar(20) NOT NULL,
  `t_exercise` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `t_trainingsplan`
--

INSERT INTO `t_trainingsplan` (`t_id`, `t_u_email`, `t_day`, `t_exercise`) VALUES
(135, 'domi@gmx.at', 'Montag', 'Rücken pull'),
(136, 'domi@gmx.at', 'Dienstag', 'Rest'),
(137, 'domi@gmx.at', 'Mittwoch', 'Beine ,Bauch'),
(138, 'domi@gmx.at', 'Donnerstag', 'Rest'),
(139, 'domi@gmx.at', 'Freitag', 'Arme'),
(140, 'domi@gmx.at', 'Samstag', 'Cardio'),
(141, 'domi@gmx.at', 'Sonntag', 'Rest');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `u_user`
--

CREATE TABLE `u_user` (
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `gur` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `u_user`
--

INSERT INTO `u_user` (`email`, `password`, `gur`) VALUES
('alex@gmx.at', '$2b$10$0AMu4B8abkoDSSuCPfQX5OtYarwar9hWAHDHdKiUoiDiIYMHE.jr2', 5248.10),
('domi@gmx.at', '$2b$10$OOh0b/mFecARGJWz.ignt.zlmUlycifCwej.A0loKB4tAkTqrtFMS', 3733.50),
('hermes@gmx.at', '$2b$10$vRiasdly3rJC8vXiipR9D.K5OmFJdVexELNLldhZoGPlHEZ1ROh86', 3423.90),
('omar@gmx.at', '$2b$10$/fR2nbdQcsoh9ON5bgUQxeYKcyW0w0WamSSkvp76SkL4Ph/3AQqrq', 4726.40),
('test1@gmail.com', '$2b$10$GH2oLA4Pm7r8R3/le54vBOLr9QLKJ12msONRXYyGkOvTPfakBIUci', 3423.90),
('user@example.com', '$2b$10$KUtjgVOdy1Uz9lbx6qZwX.5wKA9MiPBkUMuR.cldXC6BgyXJUmgxC', 3423.90);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `k_kalorientracker`
--
ALTER TABLE `k_kalorientracker`
  ADD PRIMARY KEY (`k_nr`),
  ADD KEY `k_u_email` (`k_u_email`);

--
-- Indizes für die Tabelle `r_recipe`
--
ALTER TABLE `r_recipe`
  ADD PRIMARY KEY (`r_nr`),
  ADD KEY `u_email` (`r_u_email`);

--
-- Indizes für die Tabelle `t_trainingsplan`
--
ALTER TABLE `t_trainingsplan`
  ADD PRIMARY KEY (`t_id`),
  ADD KEY `useremail` (`t_u_email`);

--
-- Indizes für die Tabelle `u_user`
--
ALTER TABLE `u_user`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `k_kalorientracker`
--
ALTER TABLE `k_kalorientracker`
  MODIFY `k_nr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT für Tabelle `r_recipe`
--
ALTER TABLE `r_recipe`
  MODIFY `r_nr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT für Tabelle `t_trainingsplan`
--
ALTER TABLE `t_trainingsplan`
  MODIFY `t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `k_kalorientracker`
--
ALTER TABLE `k_kalorientracker`
  ADD CONSTRAINT `k_kalorientracker_ibfk_1` FOREIGN KEY (`k_u_email`) REFERENCES `u_user` (`email`);

--
-- Constraints der Tabelle `r_recipe`
--
ALTER TABLE `r_recipe`
  ADD CONSTRAINT `u_email` FOREIGN KEY (`r_u_email`) REFERENCES `u_user` (`email`);

--
-- Constraints der Tabelle `t_trainingsplan`
--
ALTER TABLE `t_trainingsplan`
  ADD CONSTRAINT `useremail` FOREIGN KEY (`t_u_email`) REFERENCES `u_user` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
