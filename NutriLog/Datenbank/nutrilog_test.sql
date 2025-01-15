-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 08. Jan 2025 um 13:15
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
  MODIFY `k_nr` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `r_recipe`
--
ALTER TABLE `r_recipe`
  MODIFY `r_nr` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `t_trainingsplan`
--
ALTER TABLE `t_trainingsplan`
  MODIFY `t_id` int(11) NOT NULL AUTO_INCREMENT;

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
