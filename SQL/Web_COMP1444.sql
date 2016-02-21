-- Adminer 2.3.0 dump
SET NAMES utf8;
SET foreign_key_checks = 0;
SET time_zone = 'SYSTEM';
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `tbl_post_category`;
CREATE TABLE `tbl_post_category` (
  `post_category_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `post_category_name` varchar(20) NOT NULL,
  `post_category_detail` varchar(500) NOT NULL,
  PRIMARY KEY (`post_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

INSERT INTO `tbl_post_category` (`post_category_id`, `post_category_name`, `post_category_detail`) VALUES
(1,	'No Category',	'No Category'),
(2,	'History',	'Anything related to History comes here'),
(3,	'Sports',	'Related to the world of sport'),
(4,	'Computer',	'Related to IT and computer'),
(5,	'Art',	'Related to Arts'),
(6,	'Cinema & theater',	'Related to movies'),
(7,	'Others',	'other categories');

DROP TABLE IF EXISTS `tbl_posts`;
CREATE TABLE `tbl_posts` (
  `posts_id` int(11) NOT NULL AUTO_INCREMENT,
  `posts_user_id` int(11) NOT NULL,
  `posts_description` varchar(300) NOT NULL,
  `posts_category_id` tinyint(4) NOT NULL DEFAULT '1',
  `posts_body` varchar(400) NOT NULL,
  `posts_deleted` char(1) NOT NULL DEFAULT '0',
  `posts_create_datetime` datetime NOT NULL,
  PRIMARY KEY (`posts_id`),
  KEY `posts_user_id` (`posts_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

INSERT INTO `tbl_posts` (`posts_id`, `posts_user_id`, `posts_description`, `posts_category_id`, `posts_body`, `posts_deleted`, `posts_create_datetime`) VALUES
(1,	2,	'fdsf',	4,	'r3fefdscd',	'0',	'2012-12-02 00:00:00'),
(2,	8,	'test',	1,	'This is the first test',	'1',	'2012-12-02 00:00:00'),
(6,	8,	'second post for testing',	1,	'hi this is my second postthis is line #1this is line #2',	'0',	'2012-12-02 00:00:00'),
(7,	8,	'third post for testing',	4,	'hi this is my second postthis is line #1this is line #2this is line #3',	'0',	'2012-12-02 08:42:58'),
(8,	8,	'a post about history',	2,	'This post is related to the history of Malaysia.\n\nAround 100 years ago we ...\n\nThanks for reading',	'0',	'2012-12-02 12:40:35'),
(9,	8,	'test posting in sports category',	3,	'this is to say that i like sports, however, i hardly have time to excercise.\n\nhope i can do someday soon.',	'0',	'2012-12-02 14:18:04'),
(10,	8,	'New asterisk version release',	4,	'This is to announce the new version of asterisk IP-PBX release. Go and download and keep us updated on your findings.',	'0',	'2012-12-02 14:24:46'),
(11,	4,	'First post from Mitra',	5,	'Hi, This is from the Art category.Hope you like this. thisfsdf][fsdfdslfkjfsdlfkjdfs]][fdsf;lknfd]',	'0',	'2012-12-02 14:36:34'),
(12,	2,	'fdsf',	4,	'r3fefdscd',	'0',	'2012-12-02 00:00:00'),
(13,	8,	'test',	1,	'This is the first test',	'1',	'2012-12-02 00:00:00'),
(14,	8,	'second post for testing',	1,	'hi this is my second post\n\nthis is line #1\n\nthis is line #2',	'1',	'2012-12-02 00:00:00'),
(15,	8,	'third post for testing',	4,	'hi this is my second postthis is line #1this is line #2this is line #3',	'0',	'2012-12-02 08:42:58'),
(16,	8,	'a post about history',	2,	'This post is related to the history of Malaysia.\n\nAround 100 years ago we ...\n\nThanks for reading',	'0',	'2012-12-02 12:40:35'),
(17,	8,	'test posting in sports category',	3,	'this is to say that i like sports, however, i hardly have time to excercise.\n\nhope i can do someday soon.',	'0',	'2012-12-02 14:18:04'),
(18,	8,	'New asterisk version release',	4,	'This is to announce the new version of asterisk IP-PBX release. Go and download and keep us updated on your findings.',	'0',	'2012-12-02 14:24:46'),
(19,	4,	'First post from Mitra',	5,	'Hi, This is from the Art category.Hope you like this. thisfsdf][fsdfdslfkjfsdlfkjdfs]][fdsf;lknfd]',	'0',	'2012-12-02 14:36:34'),
(20,	8,	'ewaewa',	3,	'ewe',	'1',	'2012-12-09 15:33:50'),
(21,	8,	'reza test',	3,	'test sports',	'1',	'2012-12-09 17:56:58'),
(22,	8,	'rwar',	1,	'rwararfsdfsdfdfsd&gt; &lt;\n&gt;&gt;\n\nfohfisduhfdihfsdkjfkcjdiuhf&quot;&quot;&quot;',	'1',	'2012-12-09 20:41:41'),
(23,	8,	'max character length',	4,	'MAx length should be no more than fsfkjhkjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjkjhkjhfds\n\n',	'1',	'2012-12-09 20:45:03'),
(24,	8,	'test 140 limit ',	1,	'this is to test the 140 character limit\nthis is to test the 140 character limit\nthis is to test the 140 character limit\nthis is to test tfdf',	'1',	'2012-12-09 20:55:30'),
(25,	8,	'reza',	7,	'ths is test',	'1',	'2012-12-11 16:23:18'),
(26,	8,	'test',	1,	'tet',	'1',	'2012-12-11 20:28:37'),
(27,	4,	'another post',	4,	'another post from mitra under computer category',	'0',	'2012-12-11 20:43:51'),
(28,	4,	'mitr',	1,	'looking forward to your reply',	'0',	'2012-12-11 20:45:20'),
(29,	4,	'another post',	1,	'another post uncategorized',	'0',	'2012-12-11 20:45:38'),
(30,	8,	'test',	4,	'test',	'1',	'2012-12-14 21:22:00'),
(31,	4,	'er',	1,	'e',	'1',	'2012-12-15 01:04:40'),
(32,	8,	'a post about sports',	3,	'here is another post about sports. see how you like it',	'0',	'2012-12-15 12:28:39'),
(33,	8,	'a post about history',	2,	'historsyfsd;ofkpofd\nfdlkjfd',	'0',	'2012-12-15 12:33:41'),
(34,	8,	'Post on comupter',	4,	'testkljoifjds\nlfwsdjfldifj',	'0',	'2012-12-15 12:35:12'),
(35,	8,	'post',	1,	'testfsdlkj',	'0',	'2012-12-15 12:39:35'),
(36,	8,	'testt',	1,	'est',	'1',	'2012-12-15 13:06:33'),
(37,	8,	'testt',	1,	'estes',	'1',	'2012-12-15 13:06:39'),
(38,	8,	't',	1,	'tefs',	'1',	'2012-12-15 13:24:00'),
(39,	8,	'fdsf;kd',	1,	';okfdspfokds',	'0',	'2012-12-15 13:24:05'),
(40,	8,	'new ',	1,	'nfdosifjq',	'0',	'2012-12-15 13:24:59'),
(41,	7,	'first post from tim',	7,	'Hi,this is my first post.I want to be active but don&#39;t know how. please advice.thanks and regards,',	'0',	'2012-12-15 21:40:21'),
(42,	7,	'2nd post from tim',	4,	'Hi, this is my second post. I want to be active but don&#39;t know how. please advice.thanks and regards, &lt;&lt;&lt; TIM &gt;&gt;&gt; ',	'1',	'2012-12-15 22:10:12'),
(43,	7,	'3rd post',	2,	'Hi\nmy 3rd post\n\ntim',	'1',	'2012-12-15 22:12:33'),
(44,	7,	'test',	1,	'this is to test line cariage\nline1\nline2\n',	'1',	'2012-12-15 22:27:22'),
(45,	7,	'tes',	1,	'test',	'1',	'2012-12-15 22:39:37'),
(46,	7,	'test',	7,	'test&lt;br/&gt;testts',	'1',	'2012-12-15 22:40:04'),
(47,	7,	'test',	1,	'test\ntestst',	'0',	'2012-12-15 22:43:19'),
(48,	7,	're',	1,	'resrs\nresresrse',	'0',	'2012-12-15 22:46:18'),
(49,	13,	'test',	4,	'&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, maximum-scale=1&quot;&gt;',	'0',	'2012-12-16 13:30:35'),
(50,	8,	'another post',	3,	'a new post under sports category.\nthis ',	'0',	'2012-12-19 00:42:07'),
(51,	8,	'Yet another post',	5,	'Parameters\n\n    this : Ext.Component\n    eOpts : Object\n\n    The options object passed to Ext.util.Observable.addListener.\n\n \nExt.state.Stat',	'0',	'2012-12-19 21:23:05');

DROP TABLE IF EXISTS `tbl_posts_reply`;
CREATE TABLE `tbl_posts_reply` (
  `reply_post_id` int(11) NOT NULL,
  `reply_user_id` int(11) NOT NULL,
  `reply_date_time` datetime NOT NULL,
  `reply_title` varchar(30) NOT NULL,
  `reply_body` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `tbl_posts_reply` (`reply_post_id`, `reply_user_id`, `reply_date_time`, `reply_title`, `reply_body`) VALUES
(22,	8,	'2012-12-09 22:00:17',	'testedffdiojvfdvkvfoivj',	'function handle_post_reply(user_id, post_id) {var required = &#39;&lt;span style=&quot;color:red;font-weight:bold&quot; data-qtip=&quot;Required&quot;&gt;*&lt;/span&gt;&#39;;	//**\n'),
(19,	4,	'2012-12-09 22:03:50',	'good topic',	'hi mitra, thanks for the post, very good topic\nkeep up the good work'),
(19,	6,	'2012-12-09 22:05:57',	'test test test',	'this itsihsidshivuhfvgfd'),
(20,	8,	'2012-12-09 22:12:47',	'test replying on posts',	'tehidsjkvjfdovijfvv\nfdoijfdoifdjv\nplbfdoijgfobigb\nbfkbngfbgbgfiobjgbooijboibjgfoibjfboijfhbofijbfgbm'),
(19,	4,	'2012-12-09 22:26:29',	'another reply',	'test another reply = this is the 3rd reply for this post'),
(11,	4,	'2012-12-09 22:56:14',	'test ',	'efsdoijvoifdjv'),
(21,	8,	'2012-12-11 09:42:29',	'this is cool',	'this is the coolest post ever\nthis is the coolest post everthis is the coolest post everthis is the coolest post everthis is the coolest pos'),
(21,	8,	'2012-12-11 09:44:08',	'another reply',	'thifsdfoij\nfdsoijoijfds\njlkjfdsijfsd'),
(21,	8,	'2012-12-11 09:44:16',	'another reply',	'thifsdfoij\nfdsoijoijfds\njlkjfdsijfsd'),
(18,	8,	'2012-12-11 09:45:26',	'reply test',	'test reply fast'),
(17,	8,	'2012-12-11 09:46:50',	'test reply to post',	'tetsetfdslkjf\n'),
(22,	8,	'2012-12-11 09:49:21',	'test',	'tesfsdfdsjfnkjdnf'),
(22,	8,	'2012-12-11 09:49:55',	'res',	'terstsf'),
(11,	4,	'2012-12-11 09:52:58',	'rear',	'resrse'),
(11,	4,	'2012-12-11 09:53:27',	'resr',	'es'),
(26,	8,	'2012-12-11 20:28:48',	'test',	'test'),
(25,	8,	'2012-12-11 20:29:46',	'test',	'testdvlkjvljfdvlfdkm'),
(27,	4,	'2012-12-12 01:31:09',	'My reply',	'plreriojfds\nfdslijodfds'),
(28,	4,	'2012-12-14 21:06:56',	'test',	'testst'),
(29,	4,	'2012-12-14 21:07:09',	'ee',	'dddddddddddd'),
(29,	4,	'2012-12-14 21:07:19',	'cscs',	'csdcdscdd'),
(29,	4,	'2012-12-14 22:10:46',	'This is reply from reza',	'reza&#39;s reply'),
(29,	8,	'2012-12-14 22:15:12',	'test reply from reza',	'another reply from reza to test'),
(29,	8,	'2012-12-14 22:53:10',	'reza',	'sam sam sam'),
(28,	8,	'2012-12-14 22:53:56',	'ra',	'fdsfds'),
(27,	8,	'2012-12-14 23:04:49',	'post from resz',	'dsflijvd\nvflkjopijoijvfv\n]livnfdlvijfd'),
(28,	8,	'2012-12-14 23:05:51',	'another test',	'tesotijvfdv\nvfdoivjf\nijgoijvvlkm'),
(28,	8,	'2012-12-14 23:17:01',	't',	'fdslijoid'),
(25,	8,	'2012-12-14 23:22:28',	'test reply refresh',	'ljoifsdmcsd\nfdoijoijfdoifjd\n\nfdijofdijv\ndosijdvfdv'),
(26,	8,	'2012-12-14 23:24:59',	'no response',	'nobody wants to put a comment here?'),
(25,	4,	'2012-12-14 23:27:45',	'reply frmo mitra',	'dsoijfsd\nflkfjdfijfd&#39;fdkv\nvfdlkvmfdvjfdvf\nokfv\n[flvfg\n[bpgfbpgflbfggvbbgpfkbgf\nbkgfb\n[pkgb\ngfpkbgf[\npbk\n[bpkgb[gfpkb\n[fgbkgfpbgf\n[ppkb[gf[kb'),
(25,	4,	'2012-12-14 23:28:52',	'another test',	'teoivjvoivjcxv&#39; l;,c'),
(26,	4,	'2012-12-14 23:29:50',	're',	'resfdsvc'),
(20,	4,	'2012-12-14 23:32:45',	'more test',	'ofijfd'),
(25,	4,	'2012-12-14 23:33:50',	'f',	'dsddslij'),
(28,	4,	'2012-12-14 23:35:01',	'reply on my own post',	'oijvfd'),
(26,	4,	'2012-12-14 23:36:08',	'res',	'fdsfsdf'),
(13,	8,	'2012-12-15 02:10:01',	'this is test',	'testvijvf'),
(26,	4,	'2012-12-15 02:31:01',	'test',	'test'),
(35,	8,	'2012-12-15 12:39:50',	'test',	'tesvs'),
(40,	7,	'2012-12-15 22:47:33',	'test reply',	'foidsjfodijfdfoij\nfdsoifjdf'),
(36,	8,	'2012-12-16 13:47:07',	'test',	'reply to this post');

DROP TABLE IF EXISTS `tbl_posts_viewed`;
CREATE TABLE `tbl_posts_viewed` (
  `view_post_id` int(11) NOT NULL,
  `view_user_id` int(11) NOT NULL,
  `view_date_time` datetime NOT NULL,
  KEY `view_user_id` (`view_user_id`),
  CONSTRAINT `tbl_posts_viewed_ibfk_1` FOREIGN KEY (`view_user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `tbl_posts_viewed` (`view_post_id`, `view_user_id`, `view_date_time`) VALUES
(29,	4,	'2012-12-15 03:05:59'),
(28,	4,	'2012-12-15 02:30:12'),
(26,	4,	'2012-12-15 02:30:31'),
(25,	4,	'2012-12-15 02:30:25'),
(27,	4,	'2012-12-15 03:02:12'),
(35,	8,	'2012-12-15 12:39:40'),
(28,	8,	'2012-12-15 12:40:18'),
(40,	8,	'2012-12-15 13:51:47'),
(39,	7,	'2012-12-15 22:31:31'),
(40,	7,	'2012-12-15 22:47:40'),
(41,	7,	'2012-12-15 22:31:25'),
(42,	7,	'2012-12-15 22:12:03'),
(38,	7,	'2012-12-15 22:47:43'),
(46,	7,	'2012-12-15 22:40:19'),
(47,	7,	'2012-12-15 22:45:54'),
(48,	7,	'2012-12-15 22:46:58'),
(47,	12,	'2012-12-16 00:26:35'),
(48,	12,	'2012-12-16 00:26:50'),
(49,	13,	'2012-12-16 13:30:50'),
(49,	8,	'2012-12-16 13:32:53'),
(41,	8,	'2012-12-16 13:46:16'),
(38,	8,	'2012-12-16 13:46:34'),
(36,	8,	'2012-12-16 13:46:52');

DROP TABLE IF EXISTS `tbl_profile`;
CREATE TABLE `tbl_profile` (
  `profile_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `profile_DOB` date DEFAULT NULL,
  `profile_email` varchar(50) NOT NULL,
  `profile_location` varchar(30) DEFAULT NULL,
  `profile_biography` mediumtext NOT NULL,
  `profile_photo` varchar(500) DEFAULT NULL,
  `profile_contactNo` varchar(30) NOT NULL,
  `profile_webpage` varchar(50) NOT NULL,
  PRIMARY KEY (`profile_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

INSERT INTO `tbl_profile` (`profile_user_id`, `profile_DOB`, `profile_email`, `profile_location`, `profile_biography`, `profile_photo`, `profile_contactNo`, `profile_webpage`) VALUES
(4,	'1983-07-26',	'mitra@mehrdust.com',	'Malaysia',	'this is my bio.\n\nfdosijfds\nfdkfhdoj',	'',	'9084302491',	'mitra.mehrdust.com'),
(7,	'1982-12-10',	'tim@yahoo.com',	'Australia',	'*',	'80bb215a9ab401b9ba80dfdf7a7ebabe.jpeg',	'98798',	'www.tim.au'),
(8,	'1984-01-07',	'reza@mehrdust.com',	'Malaysia',	'an Asterisk VOIP specialist',	'c5c5c72ad5ebbd66c204f07934e8b2c1.jpeg',	'01023',	'www.mehrdust.com'),
(12,	'0000-00-00',	'',	'USA ',	'Try writing something in here<br>rewrere<i>fdsfdfddsadsa<br>s<u><b>fdsfdfdsfdfdf</b>fdsfdfdsuddada<font size=\"1\">dsdsadsad</font></u></i><br><font color=\"FF6600\">;ldksa;lkdsa;d</font><br>',	'2220d0939e7a5550b8645609c8b730da.jpeg',	'',	'');

DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_nickname` varchar(30) NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `user_firstname` varchar(50) NOT NULL,
  `user_lastname` varchar(50) NOT NULL,
  `user_is_active` char(1) NOT NULL DEFAULT '1',
  `user_email` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

INSERT INTO `tbl_users` (`user_id`, `user_nickname`, `user_password`, `user_firstname`, `user_lastname`, `user_is_active`, `user_email`) VALUES
(3,	'mehrdust',	'password',	'reza',	'samimi',	'1',	'reza@mehrdust.com'),
(4,	'Mitra',	'pass',	'Mitra',	'Sh',	'1',	'mitra@mehrdust.com'),
(5,	'John',	'pass',	'Johny',	'',	'1',	'john@gmail.com'),
(6,	'Sara',	'sara123',	'Sara',	'Samimi',	'1',	'sara@yahoo.com'),
(7,	'tim',	'pass',	'tim',	'bagheri',	'1',	'tim@tet.com'),
(8,	'reza',	'sam',	'Reza',	'Samimi',	'1',	'reza@mehrdust.com'),
(9,	'mehr_rez',	'pass',	'Mehrdust',	'Mehrdustian',	'1',	'mehrdust@gmail.com'),
(11,	'CrazyCow',	'pass',	'Crazy',	'Cow',	'1',	'crazy.cow@yahoo.com'),
(12,	'test',	'test',	'tester',	'retset',	'1',	'test@segi.kl'),
(13,	'aaron',	'123456',	'Aaron',	'anthony',	'1',	'aaron@hotmail.com'),
(14,	'reza123',	'pass',	're',	'sa',	'1',	're_mehr@hotmail.com'),
(15,	'rerererere',	'1234',	'',	'',	'1',	're@is.ci'),
(16,	'reza35',	'3576',	'',	'',	'1',	're_r@hot.com'),
(17,	'fsdfdsf',	'434343',	'',	'',	'1',	'3@is.id'),
(18,	'arman2',	'12345',	'',	'',	'1',	're@fef.ff');

