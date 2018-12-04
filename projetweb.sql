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
(1, 'mafieu', 43.288970947265625, 5.416989803314209, 0, NULL, NULL, 1, 17),
(2, 'argent', 43.29347229003906, 5.369792938232422, 1, NULL, NULL, 0, 17),
(3, 'argent', 43.27903747558594, 5.304369926452637, 1, 2, NULL, 0, 17),
(4, 'argent', 43.32823944091797, 5.403932571411133, 1, 3, NULL, 0, 17),
(5, 'drogue', 43.30355, 5.379126, 0, 4, NULL, 0, 17),
(7, 'complices', 43.23337936401367, 5.4133501052856445, 1, 8, NULL, 0, 17),
(6, 'armes', 43.260686, 5.468929, 1, 4, NULL, 0, 15),
(8, 'helico', 43.28152084350586, 5.417769908905029, 1, NULL, 'T1312A161_@', 0, 17),
(9, 'T1312A161_@', 43.29478073120117, 5.358389854431152, 0, NULL, NULL, 0, 17),
(10, 'bagarre', 43.284141540527344, 5.370940208435059, 0, 7, NULL, 0, 17);

-- --------------------------------------------------------

--
-- Structure de la table `scores`
--

CREATE TABLE `scores` (
  `pseudo` text NOT NULL,
  `temps` time NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `scores`
--

INSERT INTO `scores` (`pseudo`, `temps`) VALUES
('Etienne', '06:59:59'),
('Etienne', '01:52:00'),
('Etienne', '00:01:48');
