-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2025 a las 21:10:18
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

--
-- Volcado de datos para la tabla `band`
--

INSERT INTO `band` (`id`, `name`, `description`, `user_id`, `image`, `available`) VALUES
('unknown', 'unknown', 'unknown', 'admin', '', 1);

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
('0fb7ecc25373410db48378fd0af44288', 'Cumbia', 'Cumbia Music', 'admin', 4.71, '', 1),
('1add44721f274c62928ca4277485524d', 'Pop', 'Pop Music', 'admin', 0.00, '', 1),
('1cf82eddf6634b0fa28058d604c083ce', 'Flamenco', 'Flamenco Music', 'admin', 3.89, '', 1),
('237392a9554a4520b3be75297d2a9ce2', 'Ranchera', 'Ranchera Music', 'admin', 4.74, '', 1),
('29bfac873e1742e4bac3738ac381cd0d', 'Vallenato', 'Vallenato Music', 'admin', -1.00, '', 1),
('3059442e20d244a8a63973a393a673e8', 'Hard Rock', 'Hard Rock Music', 'admin', -1.00, '', 1),
('38dcb9ec0ad2481f89cd4b82ad54e9a7', 'Disco', 'Disco Music', 'admin', 4.16, '', 1),
('3a2eb1bed2d24f78be10cd25b1894ae2', 'House', 'House Music', 'admin', 4.03, '', 1),
('3a9b04543f434268a88b2db325385f91', 'Merengue', 'Merengue Music', 'admin', 4.55, '', 1),
('3c27e64a44564430a43bd24f294b9671', 'Tropipop', 'Tropipop Music', 'admin', -1.00, '', 1),
('42bcd9ac91554167bdc90410d1f97ec8', 'Country', 'Country Music', 'admin', 3.17, '', 1),
('484e102e87ec4fe99b39a7b323f62242', 'Popular Music', 'Colombian Popular Music', 'admin', -1.00, '', 1),
('53cf6e5b505f4a61adb08722547a8769', 'Rock', 'Rock Music', 'admin', 4.90, '', 1),
('5fac64e3775149019cd725270b55584b', 'Rock And Roll', 'Rock And Roll Music', 'admin', 4.33, '', 1),
('692f0eb79aff4a358bdea053538f589b', 'Champeta', 'Champeta Music', 'admin', -1.00, '', 1),
('6c6b01bca13e4b6ea21f6b8189108ec1', 'Trap', 'Trap Music', 'admin', 3.90, '', 1),
('6ffa5940ccbb4e21acb0d0e94a1a23d5', 'Blues', 'Blues Music', 'admin', 3.55, '', 1),
('75378f71988f44669815706b41ea9178', 'Bolero', 'Bolero Music', 'admin', 3.93, '', 1),
('7d4003f8199a437b9fd225e3ef19d870', 'Ballada', 'Balada Music', 'admin', 4.21, '', 1),
('82e95713ca954407a5fbe7e02e3ad9ed', 'Phonk', 'Phonk Music', 'admin', 3.52, '', 1),
('9957546f7d1f4892b4745c40f04ebd2e', 'Samba', 'Samba Music', 'admin', -1.00, '', 1),
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
('efc9982cde8847b88e71af25bd90c1be', 'Soul', 'Soul Music', 'admin', 3.55, '', 1),
('unknown', 'unknown', 'unknown', 'admin', -1.00, '', 1);

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
('227c1c4fc90c4290928f624da39d840c', 'Mute', 'Music without voice', 'admin', -1.00, '', 1),
('818e34ecaf234184929a4f25a31472c4', 'English', '', 'admin', -1.00, '', 1),
('d789aa5820fa42359e3d016877e9435d', 'Spanish', '', 'admin', -1.00, '', 1),
('47b7c5b10e32487fbed561fae666e44c', 'Mandarin Chinese', '', 'admin', -1.00, '', 1),
('efa51fa3459e4cf387008a9a0bae1dc5', 'Hindi', '', 'admin', -1.00, '', 1),
('1e1d9d8fec4a48cab978714dd97f1992', 'Arabic', '', 'admin', -1.00, '', 1),
('a048a521cc09457cb241d65fff083338', 'Bengali', '', 'admin', -1.00, '', 1),
('bdca08e6f30e415abcf5c28c505c82f8', 'Portuguese', '', 'admin', -1.00, '', 1),
('ec91dd439ea84edba0c69f84abcc3601', 'Russian', '', 'admin', -1.00, '', 1),
('b6c88a4ff70d4445a11914316cc0f898', 'Japanese', '', 'admin', -1.00, '', 1),
('b3a8edbac6634a20afeac504305eb375', 'French', '', 'admin', -1.00, '', 1),
('35ed23e032784a9cbbf8d80405f3e692', 'German', '', 'admin', -1.00, '', 1),
('c2cb1ca211fa48cd8b8ca0d2133cff81', 'Korean', '', 'admin', -1.00, '', 1),
('a92c011d1cd94bb4a79f8127f5bf9749', 'Turkish', '', 'admin', -1.00, '', 1),
('5f8f3f44393d447fb76d3204350f742c', 'Italian', '', 'admin', -1.00, '', 1),
('4a28c1a8083841418af0d84d8411379e', 'Vietnamese', '', 'admin', -1.00, '', 1),
('59a3eaafc1ec450382f1a279b818c7ac', 'Urdu', '', 'admin', -1.00, '', 1),
('1ff29424ef614631846fc3db93a63029', 'Farsi', '', 'admin', -1.00, '', 1),
('f960d61517bf482eaf339224b3622b2c', 'Indonesian', '', 'admin', -1.00, '', 1),
('74a1fb3d56834d2c84f82e71365dc7b8', 'Thai', '', 'admin', -1.00, '', 1),
('182923a20a154e12a23b62e157f90b6c', 'Polish', '', 'admin', -1.00, '', 1),
('ff9546415c9b4da9af7d8a2376c09fd0', 'Dutch', '', 'admin', -1.00, '', 1),
('762ef430c74f46a78f3b318a800608bd', 'Swedish', '', 'admin', -1.00, '', 1),
('3a09fc5e99cf4a60a05e6a859f257921', 'Danish', '', 'admin', -1.00, '', 1),
('3648c5525c3a470bb4556b8d90f36151', 'Norwegian', '', 'admin', -1.00, '', 1),
('673af92d0c9948f4a69b59c0adefa96c', 'Finnish', '', 'admin', -1.00, '', 1),
('b4b13ec0a1394835b8d729edeb0ce55b', 'Greek', '', 'admin', -1.00, '', 1),
('37846c532f6f4297b55f68bb98811406', 'Hebrew', '', 'admin', -1.00, '', 1),
('6cee516be56d477f9cfb8b0c539fb6db', 'Malay', '', 'admin', -1.00, '', 1),
('ca73a15a4b544351b7a6047b8c056cfa', 'Tamil', '', 'admin', -1.00, '', 1),
('dd1b8c667f284ebd94150d02157c0f20', 'Telugu', '', 'admin', -1.00, '', 1),
('1259a82c769c434e858cfc0400164cd5', 'Punjabi', '', 'admin', -1.00, '', 1),
('f5e0b9182189423ab421fe135983bd58', 'Romanian', '', 'admin', -1.00, '', 1),
('985e2e5b20364dd2a682ab8f314c035b', 'Czech', '', 'admin', -1.00, '', 1),
('19e15ecd9ccb48e783a4e9f247e743b9', 'Hungarian', '', 'admin', -1.00, '', 1),
('3344e61d0087457594968b82102fad5e', 'Ukrainian', '', 'admin', -1.00, '', 1),
('0805a114c2c14ff58094ac85fb1cf127', 'Swahili', '', 'admin', -1.00, '', 1),
('1ec3d2e9701b40e7be2f678510da8d9b', 'Tagalog', '', 'admin', -1.00, '', 1),
('f0ec3b32168e49ab9fcf6e52c9fad100', 'Croatian', '', 'admin', -1.00, '', 1),
('c4ec6a11f7dc44398379fa66835dcbf9', 'Serbian', '', 'admin', -1.00, '', 1),
('b4896d2c82174da0b40e5e2786ff562c', 'Slovak', '', 'admin', -1.00, '', 1),
('0197303b089b463db943c583c668b9b6', 'Bulgarian', '', 'admin', -1.00, '', 1),
('4e770db26b7a474494cd35e1e8a3a5c9', 'Afrikaans', '', 'admin', -1.00, '', 1),
('62891eaa19494f6091dc10c8dba5b37f', 'Catalan', '', 'admin', -1.00, '', 1),
('fc0a867165fc4286bfcc7d60fbfb496c', 'Basque', '', 'admin', -1.00, '', 1),
('6076b599234c44728ab3bb3dc133bf43', 'Armenian', '', 'admin', -1.00, '', 1),
('dc6a6cdd9de248e49fc2b09eacc44d31', 'Georgian', '', 'admin', -1.00, '', 1),
('66a5cba5171d400786a00937c277abe2', 'Bahasa Melayu', '', 'admin', -1.00, '', 1),
('6706953c8ffb4afd8d69dcaa67b25e51', 'Burmese', '', 'admin', -1.00, '', 1),
('4790a3d7ace540fb833089a7fb4f90f9', 'Lao', '', 'admin', -1.00, '', 1),
('1377ef5d995d45798f22ba53986f4933', 'Khmer', '', 'admin', -1.00, '', 1),
('unknown', 'unknown', 'unknown', 'admin', -1.00, '', 1);

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
('0e19bf4411d349878eb651475af5692f', 'Anxiety', '', 'admin', -1.00, '', 1),
('4310e7119c994f179f39998bc585a84d', 'Hope', '', 'admin', -1.00, '', 1),
('5599d75e873145808005d761ecb5a9d1', 'Pride', '', 'admin', -1.00, '', 1),
('5ad234b3e04846509646861f11f4bc75', 'Euphoria', '', 'admin', -1.00, '', 1),
('60016af5eb2e4bf89e825c2e2e221f84', 'Love', '', 'admin', -1.00, '', 1),
('80ea10d5b3394d99894e42413f2980d6', 'Sadness', '', 'admin', -1.00, '', 1),
('a27c76e136ea4255bf4b4eaa2a151c83', 'Nostalgia', '', 'admin', -1.00, '', 1),
('b539763942584cac83a35fff5bc1a926', 'Relaxation', '', 'admin', -1.00, '', 1),
('c6cb0f9a81cc412ca6bbee4e662beb16', 'Fear', '', 'admin', -1.00, '', 1),
('ca00275d92bf4462a4ca30d1bf1475ba', 'Aggressive', '', 'admin', -1.00, '', 1),
('d0f46b2463b24f5e81370d4a18aea0db', 'Joy', '', 'admin', -1.00, '', 1),
('fe897b184b0a4167bf9b403040ac53fe', 'Happiness', '', 'admin', -1.00, '', 1),

('2aafd6590b094fe8b0d0f90e44200fbc', 'fun', '', 'admin', -1.00, '', 1),
('e79f5485ac334fdca47a7cbcb385e792', 'Enthusiasm', '', 'admin', -1.00, '', 1),
('fde20de2d8f64203ba87058056a1c923', 'Excitement', '', 'admin', -1.00, '', 1),
('854ef7fde0704c919b620bf938243245', 'Energy', '', 'admin', -1.00, '', 1),

('b0b8001d5fd64e42991a33de68c0b39c', 'Tenderness', '', 'admin', -1.00, '', 1),
('a93ae2393a8140308321ea3dab9192e4', 'Affection', '', 'admin', -1.00, '', 1),
('a66e7c5c171f4725a2c6176dc3bc6f0f', 'Compassion', '', 'admin', -1.00, '', 1),
('2239ebc23a094f09af81dc6a4bc03a11', 'Caring', '', 'admin', -1.00, '', 1),
('ab2677eb88c9483b819f98fb8b7174a5', 'Empathy', '', 'admin', -1.00, '', 1),
('397d368022284927862277f6341a2027', 'Intimacy', '', 'admin', -1.00, '', 1),
('129db89c226241cc95802f9c68876fdd', 'Warmth', '', 'admin', -1.00, '', 1),

('afd1531759764d129475e5cccd955ec9', 'Longing', '', 'admin', -1.00, '', 1),
('ebfb5ff22a6e48edbbf976f7f95b3795', 'Sentimentality', '', 'admin', -1.00, '', 1),
('7bd52163579b4f49afe73097c72a02ba', 'Bittersweetness', '', 'admin', -1.00, '', 1),
('bbf3f2a7cdfe4272916258941f2a9c60', 'Tender sadness', '', 'admin', -1.00, '', 1),
('520f0f2eb45948b0b431d256c0c97758', 'Emotional reflection', '', 'admin', -1.00, '', 1),

('b07479bb21b949dabbba2e8118b611b8', 'Grief', '', 'admin', -1.00, '', 1),
('c31b2725b88c421aa4f4d270496e01ce', 'Despair', '', 'admin', -1.00, '', 1),
('ee6bb8dba74d4303ba6b5d14e668627f', 'Loneliness', '', 'admin', -1.00, '', 1),
('62de1d8c4d434a6f97feeabc863fb68c', 'Regret', '', 'admin', -1.00, '', 1),
('0526259a9e38463c8a0a8bae806127e1', 'Loss', '', 'admin', -1.00, '', 1),
('be75387026b242899042f3a9d803ebb2', 'Emotional pain', '', 'admin', -1.00, '', 1),

('98fa66f599ea41eab828cfadf7a3aea9', 'Calmness', '', 'admin', -1.00, '', 1),
('5fb3199d7697434f8cfb17f9a8c52509', 'Serenity', '', 'admin', -1.00, '', 1),
('742549efadb24d469d6cc7bd79114312', 'Tranquility', '', 'admin', -1.00, '', 1),
('37cedade06fb45f2bd18965c383c7d3f', 'Relief', '', 'admin', -1.00, '', 1),
('4f124e0c375049e78c7517b16d19dc79', 'Inner peace', '', 'admin', -1.00, '', 1),
('bfa99ef4e9ec44e28eef933240944e11', 'Meditation', '', 'admin', -1.00, '', 1),

('4cca306c79db468c956af5a3a017f85b', 'Power', '', 'admin', -1.00, '', 1),
('c6b1df9eff844f51ba32d19c58e65797', 'Confidence', '', 'admin', -1.00, '', 1),
('2b7dcc0fd7af4a7cb644d83da8a7e46f', 'Determination', '', 'admin', -1.00, '', 1),
('ba2841e7e0c34eb2aaf42a05c857ae27', 'Triumph', '', 'admin', -1.00, '', 1),
('1b3a398409df4bc49f3edcd49f0a5b12', 'Dominance', '', 'admin', -1.00, '', 1),
('604fbc2d422e415fbcafd5b5d38bd2d6', 'Heroism', '', 'admin', -1.00, '', 1),
('ea1b1553b2264cc088a0997413dc43a0', 'Motivation', '', 'admin', -1.00, '', 1),

('8124f2c7badd45ed83a489cb8c504ce1', 'Tension', '', 'admin', -1.00, '', 1),
('a203cfe34594443ba175da83cb5fbd70', 'Anticipation', '', 'admin', -1.00, '', 1),
('82c873682bfa4af1a97c1ab5b368f4cc', 'Suspense', '', 'admin', -1.00, '', 1),
('0799403d7f2140f792826560481e2cf7', 'Unease', '', 'admin', -1.00, '', 1),
('f3734f92d691418fa9b488f0ee3589cb', 'Apprehension', '', 'admin', -1.00, '', 1),
('f2d6eb020a4c44edae7431f37e6d21f4', 'Horror', '', 'admin', -1.00, '', 1),

('d3b49b276e964ad98bcd01bc36ceb9ed', 'Anger', '', 'admin', -1.00, '', 1),
('d24f7b606c354df09c8078a8b154e70c', 'Rage', '', 'admin', -1.00, '', 1),
('186552e860ce41bdb335510bb1813afa', 'Frustration', '', 'admin', -1.00, '', 1),
('0986f90d0a1a432893d5f509e252435e', 'Defiance', '', 'admin', -1.00, '', 1),
('688b709adb6540fd8ead043b29994ab2', 'Rebellion', '', 'admin', -1.00, '', 1),
('7eff41c662794d6b888636e9d7c3e8aa', 'Contempt', '', 'admin', -1.00, '', 1),
('2a1088f9de53470f88a9dca9c42509d9', 'Resentment', '', 'admin', -1.00, '', 1),

('be63e02648ec4cd29bdf5b473e6d72c6', 'Wonder', '', 'admin', -1.00, '', 1),
('416cab05c5e640d7b08bb46cb3e7d559', 'Inspiration', '', 'admin', -1.00, '', 1),
('e24170bbf99c439c82819f00a5672b5b', 'Reverence', '', 'admin', -1.00, '', 1),
('72254ddd35f74ff7a1187298f25a79b9', 'Spirituality', '', 'admin', -1.00, '', 1),
('5a1f925bb8894ec186f088b21a535bd0', 'Amazement', '', 'admin', -1.00, '', 1),
('77a6b60797de48b1b635e789f98132de', 'Elevation', '', 'admin', -1.00, '', 1),

('b64b93d15d6f4f6ba25ff6195982ac32', 'Amusement', '', 'admin', -1.00, '', 1),
('fc746675261a49dbbe4a9026d90f6d5b', 'Humor', '', 'admin', -1.00, '', 1),
('4dbc4be9b2e6463696992aef39ba18a2', 'Irony', '', 'admin', -1.00, '', 1),
('2a7b6c43c4b84a1e9ca777d5b65126ac', 'Whimsy', '', 'admin', -1.00, '', 1),
('c532129f8703426daf86da7cedbd872a', 'Absurdity', '', 'admin', -1.00, '', 1);


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
('unknown', 'unknown', 'unknown', 'admin', -1.00, '', 1);

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
-- Estructura de tabla para la tabla `temp_playlist`
--

CREATE TABLE `temp_playlist` (
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `json_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`json_data`)),
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
-- Indices de la tabla `temp_playlist`
--
ALTER TABLE `temp_playlist`
  ADD KEY `usuarioToTemp` (`user_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

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

--
-- Filtros para la tabla `temp_playlist`
--
ALTER TABLE `temp_playlist`
  ADD CONSTRAINT `usuarioToTemp` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
