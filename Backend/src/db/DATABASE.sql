-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-08-2025 a las 22:43:42
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
('20514aca75bc4f22a29b9eb5f24917c7', 'Popular', 'Popular music', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_527b76f01c5d4a1d9e089fc627c5a7c5.png', 1),
('33028177a27d4df9bec25aaa2ca65f27', 'Pop', 'Pop Music', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_89d10b0d96e34437bbbc86b5fea8ef10.jpeg', 1),
('3b5ecd28d63b4ceba69a0ff2c8748ea0', 'cumb', 'desc', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, '', 1),
('45c50e4dccf8437e8c18a71a050e0128', 'test', 'test', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, '', 1),
('501cbbe6180347c497f31cf2258add4f', 'Salse', 'Salse music', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_34b4cd620ea6415eb9e13323170b9f7b.png', 1),
('8a981c58f9f84b958e17c5734f03e88f', 'Jazz', 'Jazz gender', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_20bf6d4bf89f4b548bf4a187d02caa2d.jpeg', 1),
('8ace1520fdb2447e9b6a9e194f16b261', 'Merengue', 'Merenge gender', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_ae1a426d9f2740e78e1f4380afb0cd38.jpeg', 1),
('8b7dd5fcaa9a4530b89fd02cbe131a70', 'Bachata', 'I like', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_b18ddf3f252844fd954712d699288143.png', 1),
('9f10b1c705fd425a9cc7c3efa764b2aa', 'Vallenato', 'Colobian\'s music', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_0e5f4fe7f9c2459682673ee51ba36037.jpeg', 1),
('d210c7e3d15b4419936d85eb84a392c0', 'Rock', 'Rock Music', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_b6bde56d95584fe7b306098729e556bf.jpeg', 1);

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
('4e94f143c3394a8288ebd1483dc255b6', 'Spanish', 'Spanish Language', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_b970fed68a34447eb81785a72908c5e0.png', 1),
('613bc2fb8d064a5f9ed5870b4fd4e796', 'English', 'Nordich languages', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_0b412d6f22404738a930d2101a6860e2.jpeg', 1);

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

--
-- Volcado de datos para la tabla `playlist`
--

INSERT INTO `playlist` (`id`, `name`, `description`, `user_id`, `score`, `image`, `available`) VALUES
('4991dc6b40ca4e468781667bde881d8b', 'Test_pl', 'testpllll', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, '', 1),
('9e90665c17a947c1a07c4911e749db2a', 'Cumbiones', 'I love this playlist', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_ac35ca0f8f6e47fbab51e87da522cadb.jpeg', 1),
('da9b35df1c364e58a03af882e16ed863', 'Romantic playlist', 'only romantic music', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_6bbeec56018049d7bd70163dac747179.jpeg', 1);

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
('077ac547f97d4f7f877ddd08385088ea', 'Sad', 'I\'m sad 😥😓😭', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_451e45bbca114b63bbe220ba76715aa9.jpeg', 1),
('39abe66fdd4e4eb9a41d805093024167', 'Happy', 'I\'m very happy 😀😀😀', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_c585d87022244c808b5d4c749c4925ac.png', 1),
('7a219482f9b6469eaabeb6340528c7bf', 'Excited', 'I am very exited🤪🤪', '8622e06b-65dd-11f0-94d0-089798b6be9f', 4.93, 'gender_image_93afea8c3cb546d4a2ee021e31740c28.png', 1),
('d6edfdbf3d184e3f9afbdf77acac89de', 'Quiet', 'This Son when i wanna be quiet', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_0763c092dc5f4cc0b4ae9ac18882f70d.png', 1),
('e8195b8db56745df9a8509bcd901819b', 'Euphoria', 'I\'m euphoria', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, '', 1);

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

--
-- Volcado de datos para la tabla `singer`
--

INSERT INTO `singer` (`id`, `name`, `description`, `user_id`, `score`, `image`, `available`) VALUES
('208ed0e092224ff2a43f31e59072d091', 'Carlo Sambrano', 'El consentido del despecho', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_cf47f7f816024dd992731f1eeacbc0e0.jpeg', 1),
('66458c60b1a046f8ba32c002b145b346', 'Michael Jacson', 'Pop\'s king', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_8d79aabec3f54558953353f249ee81e6.jpeg', 1),
('bce6fb4557f04736a24a1ff91e9f0bd1', 'David Ceron', 'David singer', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_e114ca46a71d4fb19f616b849e8c7905.webp', 1),
('ce46b05ca3be4510a1a721f61c319971', 'test singer', 'singer of  test', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, '', 1),
('d43f2d0b44884cdab1b57fd1a7943d6a', 'Electric Dimond', 'this songs/band are my favorite artist(s)', '8622e06b-65dd-11f0-94d0-089798b6be9f', -1.00, 'gender_image_90a6ee7432fc44c9b565880be6aab362.jpeg', 1);

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

--
-- Volcado de datos para la tabla `song`
--

INSERT INTO `song` (`id`, `name`, `description`, `url`, `goal`, `image`, `user_id`, `available`) VALUES
('0e832cf9973148a18674a85f273e509f', 'Daniel Deluxe', 'Regular-normal song', 'https://www.youtube.com/watch?v=QHNakk1oM7g', 4.93, '', '8622e06b-65dd-11f0-94d0-089798b6be9f', 1),
('0fe0318bdd2147778491f16554eeb466', 'Xavi - La Diabla', '', 'https://www.youtube.com/watch?v=HfzbN5ky5Co', 4.98, '', '8622e06b-65dd-11f0-94d0-089798b6be9f', 1),
('1bbb48bd1ba94c67b8e8c5439ba9caca', 'Seemee & Soda Luv ', 'moto moto', 'https://www.youtube.com/watch?v=24EABWFG79A', 4.90, '', '8622e06b-65dd-11f0-94d0-089798b6be9f', 1),
('237fb66e8c5f4d188d48b5e762c6a276', 'WOS - ARRANCARMELO ', 'sad song', 'https://www.youtube.com/watch?v=RNLsc_DWDUw', 4.89, '', '8622e06b-65dd-11f0-94d0-089798b6be9f', 1),
('4c716558c52547ad81cc2a2f643c8d9b', 'Jósean Log - Beso', '', 'https://www.youtube.com/watch?v=ntdwWKaGaPQ', 5.00, '', '8622e06b-65dd-11f0-94d0-089798b6be9f', 1),
('7050fec3093841249291f079d1200c4e', 'El Guerrero', 'Yuri Buenaventura', 'https://www.youtube.com/watch?v=NlemaAlPeZs', 4.85, '', '8622e06b-65dd-11f0-94d0-089798b6be9f', 1),
('803888625bb0478f8f72efaca4e5be5e', 'Diamante Electrico - Casino', '', 'https://www.youtube.com/watch?v=HZb85wigeQc', 5.00, '', '8622e06b-65dd-11f0-94d0-089798b6be9f', 1),
('8647c89b3ae24214aedf7a64db0f725d', 'KORDHELL - KILLERS FROM THE NORTHSIDE', '', 'https://www.youtube.com/watch?v=-11cK6-IOUc', 4.00, '', '8622e06b-65dd-11f0-94d0-089798b6be9f', 1),
('91cb4bdbfa2b4f6dba129148ac7d579d', 'Atom Boom', '', 'file_2c91e642712a4bc783414d2d6dcef919.mpeg', 5.00, 'song_image_d70aaaece0f8414c9008ce8862166250.jpeg', '8622e06b-65dd-11f0-94d0-089798b6be9f', 1),
('a0951f67a4104d06ad8d670e0afa89b5', 'Chismofilia', '', 'https://www.youtube.com/watch?v=PKEl-re_7tQ', 4.98, '', '8622e06b-65dd-11f0-94d0-089798b6be9f', 1),
('a478e2873741474d94bb6edb7fe4dfea', 'Por mil noches - Airbag', '', 'https://www.youtube.com/watch?v=ANs8-1iYkww', 5.00, '', '8622e06b-65dd-11f0-94d0-089798b6be9f', 1),
('f9211b1f8e4d4bd58b598a893e23bdf8', 'Diego Ruzarin', '', 'file_59c5a61a4dc64a49809bf6ea7d58bd75.mpeg', 5.00, '', '8622e06b-65dd-11f0-94d0-089798b6be9f', 1);

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

--
-- Volcado de datos para la tabla `song_gender`
--

INSERT INTO `song_gender` (`song_id`, `gender_id`) VALUES
('a478e2873741474d94bb6edb7fe4dfea', '33028177a27d4df9bec25aaa2ca65f27'),
('a478e2873741474d94bb6edb7fe4dfea', 'd210c7e3d15b4419936d85eb84a392c0'),
('4c716558c52547ad81cc2a2f643c8d9b', '33028177a27d4df9bec25aaa2ca65f27'),
('803888625bb0478f8f72efaca4e5be5e', '33028177a27d4df9bec25aaa2ca65f27'),
('803888625bb0478f8f72efaca4e5be5e', 'd210c7e3d15b4419936d85eb84a392c0'),
('91cb4bdbfa2b4f6dba129148ac7d579d', '33028177a27d4df9bec25aaa2ca65f27'),
('f9211b1f8e4d4bd58b598a893e23bdf8', '45c50e4dccf8437e8c18a71a050e0128'),
('8647c89b3ae24214aedf7a64db0f725d', '45c50e4dccf8437e8c18a71a050e0128'),
('0fe0318bdd2147778491f16554eeb466', '20514aca75bc4f22a29b9eb5f24917c7'),
('a0951f67a4104d06ad8d670e0afa89b5', '20514aca75bc4f22a29b9eb5f24917c7'),
('1bbb48bd1ba94c67b8e8c5439ba9caca', '45c50e4dccf8437e8c18a71a050e0128'),
('0e832cf9973148a18674a85f273e509f', '8a981c58f9f84b958e17c5734f03e88f'),
('7050fec3093841249291f079d1200c4e', '501cbbe6180347c497f31cf2258add4f'),
('237fb66e8c5f4d188d48b5e762c6a276', '33028177a27d4df9bec25aaa2ca65f27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `song_language`
--

CREATE TABLE `song_language` (
  `song_id` varchar(36) NOT NULL,
  `language_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `song_language`
--

INSERT INTO `song_language` (`song_id`, `language_id`) VALUES
('a478e2873741474d94bb6edb7fe4dfea', '4e94f143c3394a8288ebd1483dc255b6'),
('4c716558c52547ad81cc2a2f643c8d9b', '4e94f143c3394a8288ebd1483dc255b6'),
('803888625bb0478f8f72efaca4e5be5e', '4e94f143c3394a8288ebd1483dc255b6'),
('91cb4bdbfa2b4f6dba129148ac7d579d', '613bc2fb8d064a5f9ed5870b4fd4e796'),
('f9211b1f8e4d4bd58b598a893e23bdf8', '4e94f143c3394a8288ebd1483dc255b6'),
('8647c89b3ae24214aedf7a64db0f725d', '613bc2fb8d064a5f9ed5870b4fd4e796'),
('0fe0318bdd2147778491f16554eeb466', '4e94f143c3394a8288ebd1483dc255b6'),
('a0951f67a4104d06ad8d670e0afa89b5', '4e94f143c3394a8288ebd1483dc255b6'),
('1bbb48bd1ba94c67b8e8c5439ba9caca', '613bc2fb8d064a5f9ed5870b4fd4e796'),
('0e832cf9973148a18674a85f273e509f', '613bc2fb8d064a5f9ed5870b4fd4e796'),
('7050fec3093841249291f079d1200c4e', '4e94f143c3394a8288ebd1483dc255b6'),
('237fb66e8c5f4d188d48b5e762c6a276', '4e94f143c3394a8288ebd1483dc255b6');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `song_playlist`
--

CREATE TABLE `song_playlist` (
  `song_id` varchar(36) NOT NULL,
  `playlist_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `song_playlist`
--

INSERT INTO `song_playlist` (`song_id`, `playlist_id`) VALUES
('1bbb48bd1ba94c67b8e8c5439ba9caca', '4991dc6b40ca4e468781667bde881d8b'),
('0e832cf9973148a18674a85f273e509f', '4991dc6b40ca4e468781667bde881d8b'),
('7050fec3093841249291f079d1200c4e', 'da9b35df1c364e58a03af882e16ed863');

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

--
-- Volcado de datos para la tabla `song_sense`
--

INSERT INTO `song_sense` (`song_id`, `sense_id`, `goal`, `user_id`) VALUES
('a478e2873741474d94bb6edb7fe4dfea', '077ac547f97d4f7f877ddd08385088ea', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('4c716558c52547ad81cc2a2f643c8d9b', '39abe66fdd4e4eb9a41d805093024167', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('803888625bb0478f8f72efaca4e5be5e', '077ac547f97d4f7f877ddd08385088ea', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('91cb4bdbfa2b4f6dba129148ac7d579d', '077ac547f97d4f7f877ddd08385088ea', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('f9211b1f8e4d4bd58b598a893e23bdf8', '077ac547f97d4f7f877ddd08385088ea', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('8647c89b3ae24214aedf7a64db0f725d', '7a219482f9b6469eaabeb6340528c7bf', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('8647c89b3ae24214aedf7a64db0f725d', 'd6edfdbf3d184e3f9afbdf77acac89de', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('8647c89b3ae24214aedf7a64db0f725d', 'e8195b8db56745df9a8509bcd901819b', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('0fe0318bdd2147778491f16554eeb466', '7a219482f9b6469eaabeb6340528c7bf', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('a0951f67a4104d06ad8d670e0afa89b5', '7a219482f9b6469eaabeb6340528c7bf', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('a0951f67a4104d06ad8d670e0afa89b5', 'e8195b8db56745df9a8509bcd901819b', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('1bbb48bd1ba94c67b8e8c5439ba9caca', '7a219482f9b6469eaabeb6340528c7bf', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('0e832cf9973148a18674a85f273e509f', '7a219482f9b6469eaabeb6340528c7bf', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('0e832cf9973148a18674a85f273e509f', 'e8195b8db56745df9a8509bcd901819b', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('7050fec3093841249291f079d1200c4e', '077ac547f97d4f7f877ddd08385088ea', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f'),
('237fb66e8c5f4d188d48b5e762c6a276', '077ac547f97d4f7f877ddd08385088ea', 5, '8622e06b-65dd-11f0-94d0-089798b6be9f');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `song_singer`
--

CREATE TABLE `song_singer` (
  `song_id` varchar(36) NOT NULL,
  `singer_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `song_singer`
--

INSERT INTO `song_singer` (`song_id`, `singer_id`) VALUES
('a478e2873741474d94bb6edb7fe4dfea', 'ce46b05ca3be4510a1a721f61c319971'),
('4c716558c52547ad81cc2a2f643c8d9b', '208ed0e092224ff2a43f31e59072d091'),
('803888625bb0478f8f72efaca4e5be5e', 'd43f2d0b44884cdab1b57fd1a7943d6a'),
('91cb4bdbfa2b4f6dba129148ac7d579d', 'ce46b05ca3be4510a1a721f61c319971'),
('f9211b1f8e4d4bd58b598a893e23bdf8', 'ce46b05ca3be4510a1a721f61c319971'),
('8647c89b3ae24214aedf7a64db0f725d', 'ce46b05ca3be4510a1a721f61c319971'),
('0fe0318bdd2147778491f16554eeb466', 'bce6fb4557f04736a24a1ff91e9f0bd1'),
('a0951f67a4104d06ad8d670e0afa89b5', '208ed0e092224ff2a43f31e59072d091'),
('1bbb48bd1ba94c67b8e8c5439ba9caca', 'ce46b05ca3be4510a1a721f61c319971'),
('0e832cf9973148a18674a85f273e509f', 'ce46b05ca3be4510a1a721f61c319971'),
('7050fec3093841249291f079d1200c4e', 'bce6fb4557f04736a24a1ff91e9f0bd1'),
('237fb66e8c5f4d188d48b5e762c6a276', '66458c60b1a046f8ba32c002b145b346');

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
('8622e06b-65dd-11f0-94d0-089798b6be9f', 'admin', 'M', 'admin', 'admin@admin.com', '2025-07-20', '', 1, '123');

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
