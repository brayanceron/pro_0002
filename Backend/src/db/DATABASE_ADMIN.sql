-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-09-2025 a las 22:11:20
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pro_0002`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `band`
--

CREATE TABLE `band` (
  `id` varchar(36) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `image` varchar(100) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gender`
--

CREATE TABLE `gender` (
  `id` varchar(36) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `score` decimal(4,2) NOT NULL DEFAULT -1.00,
  `image` varchar(100) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gender`
--

INSERT INTO `gender` (`id`, `name`, `description`, `user_id`, `score`, `image`, `available`) VALUES
('0f8907fb5aef47769a8e1e617451a1ef', 'Tango', 'Tango Music', 'admin', 4.03, '', 1),
('0fb7ecc25373410db48378fd0af44288', 'Cumbia', 'Cumbia music', 'admin', 4.71, '', 1),
('1add44721f274c62928ca4277485524d', 'Pop', 'Pop Music', 'admin', 0.00, '', 1),
('1cf82eddf6634b0fa28058d604c083ce', 'Flamenco', 'Flamenco Music', 'admin', 3.89, '', 1),
('237392a9554a4520b3be75297d2a9ce2', 'Ranchera', 'Ranchera Music', 'admin', 4.74, '', 1),
('38dcb9ec0ad2481f89cd4b82ad54e9a7', 'Disco', 'Disco Music', 'admin', 4.16, '', 1),
('3a2eb1bed2d24f78be10cd25b1894ae2', 'House', 'House Music', 'admin', 4.03, '', 1),
('3a9b04543f434268a88b2db325385f91', 'Merengue', 'Merengue Music', 'admin', 4.55, '', 1),
('42bcd9ac91554167bdc90410d1f97ec8', 'Country', 'Country Music', 'admin', 3.17, '', 1),
('53cf6e5b505f4a61adb08722547a8769', 'Rock', 'Rock Music', 'admin', 4.90, '', 1),
('5fac64e3775149019cd725270b55584b', 'Rock And Roll', 'Rock And Roll Music', 'admin', 4.33, '', 1),
('6c6b01bca13e4b6ea21f6b8189108ec1', 'Trap', 'Trap Music', 'admin', 3.90, '', 1),
('6ffa5940ccbb4e21acb0d0e94a1a23d5', 'Blues', 'Blues Music', 'admin', 3.55, '', 1),
('75378f71988f44669815706b41ea9178', 'Bolero', 'Bolero Music', 'admin', 3.93, '', 1),
('7d4003f8199a437b9fd225e3ef19d870', 'Ballada', 'Balada Music', 'admin', 4.21, '', 1),
('82e95713ca954407a5fbe7e02e3ad9ed', 'Phonk', 'Phonk Music', 'admin', 3.52, '', 1),
('aa6a692c7f084242865f2ac6e0cb79ec', 'Reggaeton', 'Reggaeton Music', 'admin', 4.85, '', 1),
('b0170ac52977464f8f53e4d076572484', 'Rumba', 'Rumba Music', 'admin', 4.35, '', 1),
('b558d018c3ac4b879409f87d390a4738', 'Salsa', 'Salsa Music', 'admin', 4.88, '', 1),
('b647a543836f4f9a86fb0a030bbe01b0', 'Hip Hop', 'Hip Hop Music', 'admin', 4.65, '', 1),
('b69c32276df6464698556ebcbb5f92ac', 'Rap', 'Rap Music', 'admin', 4.03, '', 1),
('b94a56152eeb4948b10a9b5458fbcd0c', 'Jazz', 'Jazz Music', 'admin', 4.02, '', 1),
('beb95de331e84f429c856e2c47fa0adf', 'Classical', 'Classical Music', 'admin', 3.90, '', 1),
('c9f130a39243499785ef574ba3a4d3c0', 'Metal', 'Metal Music', 'admin', 4.08, '', 1),
('d7fa99db3bc4477b844b883b83b30917', 'Reggae', 'Reggae Music', 'admin', 4.11, '', 1),
('e00bdfe05e484bb6b0277b5dbdeb5b42', 'Salsa Choke', 'Salsa Choke Music', 'admin', 4.64, '', 1),
('ef3e46e8c0144900a1c393a8e4ef52e9', 'Electronic', 'Electronic Music', 'admin', 4.85, '', 1),
('efc9982cde8847b88e71af25bd90c1be', 'Soul', 'Soul Music', 'admin', 3.55, '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `language`
--

CREATE TABLE `language` (
  `id` varchar(36) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `score` decimal(4,2) NOT NULL DEFAULT -1.00,
  `image` varchar(100) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `language`
--

INSERT INTO `language` (`id`, `name`, `description`, `user_id`, `score`, `image`, `available`) VALUES
('227c1c4fc90c4290928f624da39d840c', 'Mute', 'Music without voice', 'admin', 4.90, '', 1),
('818e34ecaf234184929a4f25a31472c4', 'English', '', 'admin', 4.94, '', 1),
('d789aa5820fa42359e3d016877e9435d', 'Spanish', '', 'admin', 4.94, '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `playlist`
--

CREATE TABLE `playlist` (
  `id` varchar(36) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `score` decimal(4,2) NOT NULL DEFAULT -1.00,
  `image` varchar(100) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sense`
--

CREATE TABLE `sense` (
  `id` varchar(36) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `score` decimal(4,2) NOT NULL DEFAULT -1.00,
  `image` varchar(100) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sense`
--

INSERT INTO `sense` (`id`, `name`, `description`, `user_id`, `score`, `image`, `available`) VALUES
('0e19bf4411d349878eb651475af5692f', 'Anxiety', 'I\'m Anxiety', 'admin', 3.94, '', 1),
('4310e7119c994f179f39998bc585a84d', 'Hope', 'I\'m Hope', 'admin', 4.19, '', 1),
('5599d75e873145808005d761ecb5a9d1', 'Pride', 'I\'m Pride', 'admin', 4.64, '', 1),
('5ad234b3e04846509646861f11f4bc75', 'Euphoria', 'I\'m Euphoria', 'admin', 4.84, '', 1),
('60016af5eb2e4bf89e825c2e2e221f84', 'Love', 'I\'m Love', 'admin', 4.91, '', 1),
('80ea10d5b3394d99894e42413f2980d6', 'Sadness', 'I\'m Sadness', 'admin', 4.69, '', 1),
('a27c76e136ea4255bf4b4eaa2a151c83', 'Nostalgia', 'I\'m Nostalgia', 'admin', 4.03, '', 1),
('b539763942584cac83a35fff5bc1a926', 'Relaxation', 'I\'m Relaxation', 'admin', 4.64, '', 1),
('c6cb0f9a81cc412ca6bbee4e662beb16', 'Fear', 'I\'m Fear', 'admin', 3.73, '', 1),
('ca00275d92bf4462a4ca30d1bf1475ba', 'Aggressive', 'Aggressive music 😤😤', 'admin', 4.69, '', 1),
('d0f46b2463b24f5e81370d4a18aea0db', 'Joy', 'I\'m Joy', 'admin', 4.93, '', 1),
('fe897b184b0a4167bf9b403040ac53fe', 'Happiness', 'I\'m Happiness', 'admin', 4.83, '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `singer`
--

CREATE TABLE `singer` (
  `id` varchar(36) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `score` decimal(4,2) NOT NULL DEFAULT -1.00,
  `image` varchar(100) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `singer_band`
--

CREATE TABLE `singer_band` (
  `singer_id` varchar(36) NOT NULL,
  `band_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `song`
--

CREATE TABLE `song` (
  `id` varchar(36) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `url` varchar(200) NOT NULL,
  `goal` decimal(4,2) NOT NULL DEFAULT 0.00,
  `image` varchar(100) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `song_band`
--

CREATE TABLE `song_band` (
  `song_id` varchar(36) NOT NULL,
  `band_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `song_gender`
--

CREATE TABLE `song_gender` (
  `song_id` varchar(36) NOT NULL,
  `gender_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `song_language`
--

CREATE TABLE `song_language` (
  `song_id` varchar(36) NOT NULL,
  `language_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `song_playlist`
--

CREATE TABLE `song_playlist` (
  `song_id` varchar(36) NOT NULL,
  `playlist_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `song_sense`
--

CREATE TABLE `song_sense` (
  `song_id` varchar(36) NOT NULL,
  `sense_id` varchar(36) NOT NULL,
  `goal` decimal(10,0) NOT NULL DEFAULT 0,
  `user_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `song_singer`
--

CREATE TABLE `song_singer` (
  `song_id` varchar(36) NOT NULL,
  `singer_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(200) NOT NULL,
  `gender` enum('M','F') NOT NULL,
  `description` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `birthdate` date NOT NULL,
  `image` varchar(100) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `gender`, `description`, `email`, `birthdate`, `image`, `available`, `password`) VALUES
('admin', 'admin', '', 'admin user', 'admin@admin.com', '2025-08-30', '', 1, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `band`
--
ALTER TABLE `band`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bandToUser` (`user_id`);

--
-- Indices de la tabla `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genderToUser` (`user_id`);

--
-- Indices de la tabla `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`id`),
  ADD KEY `languageToUser` (`user_id`);

--
-- Indices de la tabla `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playlistToUser` (`user_id`);

--
-- Indices de la tabla `sense`
--
ALTER TABLE `sense`
  ADD PRIMARY KEY (`id`),
  ADD KEY `senseToUser` (`user_id`);

--
-- Indices de la tabla `singer`
--
ALTER TABLE `singer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `singerToUser` (`user_id`);

--
-- Indices de la tabla `singer_band`
--
ALTER TABLE `singer_band`
  ADD KEY `singer_band_singerforeignkey` (`singer_id`),
  ADD KEY `singer_band_bandrforeignkey` (`band_id`);

--
-- Indices de la tabla `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`id`),
  ADD KEY `songToUser` (`user_id`);

--
-- Indices de la tabla `song_band`
--
ALTER TABLE `song_band`
  ADD KEY `song_band_bandforeignkey` (`band_id`),
  ADD KEY `song_band_songforeignkey` (`song_id`);

--
-- Indices de la tabla `song_gender`
--
ALTER TABLE `song_gender`
  ADD KEY `song_gender_genderforeignkey` (`gender_id`),
  ADD KEY `song_gender_songforeignkey` (`song_id`);

--
-- Indices de la tabla `song_language`
--
ALTER TABLE `song_language`
  ADD KEY `song_language_languageforeignkey` (`language_id`),
  ADD KEY `song_language_songforeignkey` (`song_id`);

--
-- Indices de la tabla `song_playlist`
--
ALTER TABLE `song_playlist`
  ADD KEY `song_playlist_playlistforeignkey` (`playlist_id`),
  ADD KEY `song_playlist_songforeignkey` (`song_id`);

--
-- Indices de la tabla `song_sense`
--
ALTER TABLE `song_sense`
  ADD KEY `song_sense_senseforeignkey` (`sense_id`),
  ADD KEY `song_sense_songforeignkey` (`song_id`),
  ADD KEY `song_sense_userforeignkey` (`user_id`);

--
-- Indices de la tabla `song_singer`
--
ALTER TABLE `song_singer`
  ADD KEY `song_singer_singerforeignkey` (`singer_id`),
  ADD KEY `song_singer_songforeignkey` (`song_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `band`
--
ALTER TABLE `band`
  ADD CONSTRAINT `bandToUser` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `gender`
--
ALTER TABLE `gender`
  ADD CONSTRAINT `genderToUser` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `language`
--
ALTER TABLE `language`
  ADD CONSTRAINT `languageToUser` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `playlistToUser` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `sense`
--
ALTER TABLE `sense`
  ADD CONSTRAINT `senseToUser` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `singer`
--
ALTER TABLE `singer`
  ADD CONSTRAINT `singerToUser` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `singer_band`
--
ALTER TABLE `singer_band`
  ADD CONSTRAINT `singer_band_bandrforeignkey` FOREIGN KEY (`band_id`) REFERENCES `band` (`id`),
  ADD CONSTRAINT `singer_band_singerforeignkey` FOREIGN KEY (`singer_id`) REFERENCES `singer` (`id`);

--
-- Filtros para la tabla `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `songToUser` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `song_band`
--
ALTER TABLE `song_band`
  ADD CONSTRAINT `song_band_bandforeignkey` FOREIGN KEY (`band_id`) REFERENCES `band` (`id`),
  ADD CONSTRAINT `song_band_songforeignkey` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`);

--
-- Filtros para la tabla `song_gender`
--
ALTER TABLE `song_gender`
  ADD CONSTRAINT `song_gender_genderforeignkey` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`),
  ADD CONSTRAINT `song_gender_songforeignkey` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`);

--
-- Filtros para la tabla `song_language`
--
ALTER TABLE `song_language`
  ADD CONSTRAINT `song_language_languageforeignkey` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `song_language_songforeignkey` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`);

--
-- Filtros para la tabla `song_playlist`
--
ALTER TABLE `song_playlist`
  ADD CONSTRAINT `song_playlist_playlistforeignkey` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`),
  ADD CONSTRAINT `song_playlist_songforeignkey` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`);

--
-- Filtros para la tabla `song_sense`
--
ALTER TABLE `song_sense`
  ADD CONSTRAINT `song_sense_senseforeignkey` FOREIGN KEY (`sense_id`) REFERENCES `sense` (`id`),
  ADD CONSTRAINT `song_sense_songforeignkey` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`),
  ADD CONSTRAINT `song_sense_userforeignkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `song_singer`
--
ALTER TABLE `song_singer`
  ADD CONSTRAINT `song_singer_singerforeignkey` FOREIGN KEY (`singer_id`) REFERENCES `singer` (`id`),
  ADD CONSTRAINT `song_singer_songforeignkey` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
