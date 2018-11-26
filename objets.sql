-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  lun. 26 nov. 2018 à 17:27
-- Version du serveur :  5.7.17
-- Version de PHP :  5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `projetweb`
--

-- --------------------------------------------------------

--
-- Structure de la table `objets`
--

CREATE TABLE `objets` (
  `id` int(11) NOT NULL,
  `nom` text,
  `lat` double NOT NULL,
  `longi` double NOT NULL,
  `recuperable` tinyint(1) DEFAULT NULL,
  `blocked_by` double DEFAULT NULL,
  `blocked_bycode` text,
  `cgmt_debut` tinyint(1) DEFAULT NULL,
  `zoom` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `objets`
--

INSERT INTO `objets` (`id`, `nom`, `lat`, `longi`, `recuperable`, `blocked_by`, `blocked_bycode`, `cgmt_debut`, `zoom`) VALUES
(1, 'mafieu', 43.288970947265625, 5.416989803314209, 0, NULL, NULL, 1, NULL),
(2, 'argent', 43.29347229003906, 5.369792938232422, 1, NULL, NULL, 0, NULL),
(3, 'argent', 43.27903747558594, 5.304369926452637, 1, 2, NULL, 0, NULL),
(4, 'argent', 43.32823944091797, 5.403932571411133, 1, 3, NULL, 0, NULL),
(5, 'drogue', 43.30355, 5.379126, 1, 4, NULL, 0, NULL),
(7, 'complices', 43.23337936401367, 5.4133501052856445, 1, 8, NULL, 0, NULL),
(6, 'armes', 43.30355, 43.25962448120117, 1, 4, NULL, 0, NULL),
(8, 'helico', 43.28152084350586, 5.417769908905029, 1, NULL, 'T1312A161_@', 0, NULL),
(9, 'T1312A161_@', 43.29478073120117, 5.358389854431152, 0, NULL, NULL, 0, NULL),
(10, 'bagarre', 43.284141540527344, 5.370940208435059, 0, 7, NULL, 0, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
