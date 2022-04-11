--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6
-- Dumped by pg_dump version 13.6

-- Started on 2022-04-11 11:30:30 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA IF NOT EXISTS public;

CREATE EXTENSION citext WITH SCHEMA public;


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 206 (class 1259 OID 17933)
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    picture character varying
);


--
-- TOC entry 205 (class 1259 OID 17931)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 208 (class 1259 OID 17943)
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    category_id integer NOT NULL,
    parent_id integer,
    content text NOT NULL,
    gif_address character varying(150) DEFAULT NULL::character varying,
    creation_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 17941)
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.posts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 209 (class 1259 OID 17963)
-- Name: read_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.read_posts (
    user_id integer NOT NULL,
    post_id integer NOT NULL
);


--
-- TOC entry 202 (class 1259 OID 17901)
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL
);


--
-- TOC entry 201 (class 1259 OID 17899)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.roles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 204 (class 1259 OID 17911)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    role_id integer DEFAULT 1,
    email public.citext,
    password_hash character varying(60),
    nickname character varying(150) NOT NULL,
    motto character varying(150) DEFAULT NULL::character varying,
    picture character varying(150) DEFAULT NULL::character varying,
    register_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


--
-- TOC entry 203 (class 1259 OID 17909)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3393 (class 0 OID 17933)
-- Dependencies: 206
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories OVERRIDING SYSTEM VALUE VALUES (2, 'Work adventures', 'Let''s talk about work adventures', 'http://localhost:3000/images/work.jpeg1649087709316.jpg');
INSERT INTO public.categories OVERRIDING SYSTEM VALUE VALUES (3, 'entertainment', 'let''s talk about your favourite movies, series, books and games', 'http://localhost:3000/images/comics.jpeg1649113228832.jpg');
INSERT INTO public.categories OVERRIDING SYSTEM VALUE VALUES (1, 'weekends are great', 'Tell us about your weekends!', 'http://localhost:3000/images/weekend.jpg1646921769373.jpg');


--
-- TOC entry 3395 (class 0 OID 17943)
-- Dependencies: 208
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (203, 87, 1, NULL, 'Hello everyone, Nice to be here with you today', 'https://media.tenor.com/images/3b849dc940c849858d1a104cedd97b73/tenor.gif', '2022-03-26 11:39:04.454703');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (3, 2, 1, NULL, 'I am goin all out this week-end :S', NULL, '2022-03-02 18:05:43.568985');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (285, 87, 3, NULL, 'Abracadabroo, and your wish shall come true', 'https://media.tenor.com/images/06447bcaa99945272b9a56149e00122b/tenor.gif', '2022-03-28 13:52:57.279065');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (254, 78, 1, NULL, 'hello', 'https://media.tenor.com/images/d68d471c860d7106aa83cf476b2ec26b/tenor.gif', '2022-03-28 00:58:12.666936');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (466, 91, 1, NULL, 'Hello there', 'https://media.tenor.com/images/715ec85f145afb93ca4d344f3a6d3a72/tenor.gif', '2022-04-05 22:30:56.131448');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (468, 78, 1, 305, 'coucou nice hair', 'https://media.tenor.com/images/8b20e6b533fe523853ca1c73192ec1f3/tenor.gif', '2022-04-07 22:47:54.037924');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (305, 78, 1, NULL, 'better than Uber yeaah', 'https://media.tenor.com/images/8efa3883cff72dad769f56f616b14de0/tenor.gif', '2022-03-29 22:12:35.015339');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (483, 78, 3, 452, 'About that many (or so)', 'https://media.tenor.com/images/637d7c52148c1a9d6ee9b831cb5e03a2/tenor.gif', '2022-04-08 16:34:43.162135');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (450, 78, 3, 347, 'woooow that was awesome', 'https://media.tenor.com/images/5cae5518b1bef0ef5a92b1ba622c3d6a/tenor.gif', '2022-04-03 15:03:15.316641');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (279, 87, 1, NULL, 'Hello', NULL, '2022-03-28 13:52:10.457902');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (457, 87, 1, 292, 'HAHAHAHA', 'https://media.tenor.com/images/92dd6317bdbd7ef7a9fbe5b0558bb1d8/tenor.gif', '2022-04-04 11:29:24.552817');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (306, 78, 1, 305, 'that was nice of her', 'https://media.tenor.com/images/a718c08d6be95165e3fd2a3d10462422/tenor.gif', '2022-03-29 22:13:06.570223');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (303, 78, 1, NULL, 'who wants a kiss ?', 'https://media.tenor.com/images/6c447682e56e163ce9649ae752822c6c/tenor.gif', '2022-03-29 15:34:18.607921');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (292, 87, 1, NULL, 'I finally have a few things working here :)', 'https://media.tenor.com/images/af4f0e81e9fd1400d271ae7b83417e93/tenor.gif', '2022-03-28 16:55:41.06657');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (294, 87, 2, NULL, 'let''s go on holidays guys', NULL, '2022-03-28 17:01:06.249723');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (295, 87, 1, NULL, 'Hey, what is up people ?', 'https://media.tenor.com/images/bb0570ab669394db4bfc7d1f1bfb91f0/tenor.gif', '2022-03-28 21:29:52.935941');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (314, 87, 3, NULL, 'who likes opera ?', 'https://media.tenor.com/images/2b6dee587a9cbab8c94f9c40185db2e8/tenor.gif', '2022-03-31 09:10:22.701175');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (300, 87, 2, 294, 'ok', 'https://media.tenor.com/images/c5adbc63411948a51293f469b4187d56/tenor.gif', '2022-03-29 00:10:42.979578');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (311, 87, 2, NULL, 'There are almost no posts in this category ...', 'https://media.tenor.com/images/63b34e21319aa6b95e4f82aa0789502d/tenor.gif', '2022-03-31 07:46:47.299712');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (313, 87, 3, NULL, 'Hi everyone', 'https://media.tenor.com/images/acc4116372dcc4b342cb1a00ae657151/tenor.gif', '2022-03-31 09:09:34.451022');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (315, 87, 3, NULL, 'Hello', 'https://media.tenor.com/images/1a2ea7f5888a5e68159b5db2bac95e69/tenor.gif', '2022-03-31 09:50:25.702814');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (316, 87, 3, NULL, 'Who''s coming to watch a movie with me ?', 'https://media.tenor.com/images/6b8997cb3e6830146bc7270597ee26bb/tenor.gif', '2022-03-31 09:58:58.759083');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (319, 87, 1, NULL, 'who wants to join me on an adventure this weekend ?', 'https://media.tenor.com/images/1c581a2b3491d887bd8c2b58922eb992/tenor.gif', '2022-03-31 11:17:48.12601');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (320, 87, 3, NULL, 'Hello everyone', 'https://media.tenor.com/images/0f7b59e27e63edbf1f097820e234a1fe/tenor.gif', '2022-03-31 11:23:33.427386');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (322, 87, 3, 314, 'I do ', 'https://media.tenor.com/images/72aaf6d6715ebe45bc366aac366164e5/tenor.gif', '2022-03-31 11:34:53.807597');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (323, 87, 2, 311, 'no need to be depressed by it :)', 'https://media.tenor.com/images/bd518b1186670884fc24fa6b7d84cd04/tenor.gif', '2022-03-31 12:52:41.354666');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (324, 90, 1, NULL, 'I have such an incredibly long name don''t I ?', 'https://media.tenor.com/images/94fa9997674020a58b418a2ec3a2ccdd/tenor.gif', '2022-03-31 13:28:07.416123');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (325, 90, 1, 324, 'yes I sure do', 'https://media.tenor.com/images/3672a1ea1a2b3e9aa921bf5e1c5491d1/tenor.gif', '2022-03-31 13:31:03.670548');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (326, 90, 1, 295, 'wow you''re way up there aren''t you ?', 'https://media.tenor.com/images/6ef818ad061483c4f3efb38aba65c3c9/tenor.gif', '2022-03-31 13:38:29.224979');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (327, 87, 1, 324, 'you''re cool all right', 'https://media.tenor.com/images/0faec55666d95baea898e4d41ec87067/tenor.gif', '2022-03-31 21:57:41.040253');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (337, 78, 1, 279, 'Nice message', 'https://media.tenor.com/images/cfbd546464274bc4953d8ccee80aa740/tenor.gif', '2022-04-01 00:34:06.263203');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (343, 78, 3, NULL, 'oh no it''s raining tomorrow', 'https://media.tenor.com/images/3a6d40ce5d8c5448fabf7ae1de37e094/tenor.gif', '2022-04-01 17:47:44.410442');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (350, 78, 1, 319, 'that guy ?', 'https://media.tenor.com/images/3e4f2f1171c0624b9043c9b4e0442fe9/tenor.gif', '2022-04-01 22:09:03.185453');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (456, 78, 3, 452, 'How many of those horses do you think we could fit in there ?', 'https://media.tenor.com/images/94bcea19e1376b2272b926e371b87199/tenor.gif', '2022-04-03 20:06:47.154413');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (452, 78, 3, NULL, 'The modern family', 'https://media.tenor.com/images/4820c2a1cd091af399018b60c817ea99/tenor.gif', '2022-04-03 19:56:46.398927');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (454, 78, 3, 343, 'I want snow :(', 'https://media.tenor.com/images/f8d7ec1ba0f3beb479cd9baa3429cff7/tenor.gif', '2022-04-03 19:59:12.096617');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (347, 78, 3, NULL, 'check those moves', 'https://media.tenor.com/images/e91c53238b99a8d90af183a40f8d3a46/tenor.gif', '2022-04-01 19:45:11.088691');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (333, 87, 3, 316, 'Bojack ?', 'https://media.tenor.com/images/7d8f9b90e93f980af2f3e36b4cfc2126/tenor.gif', '2022-03-31 22:43:33.238493');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (458, 84, 3, 285, 'I wish for a poney', 'https://media.tenor.com/images/e2c8fe29c84f6b1c6e29cf33116a2eb5/tenor.gif', '2022-04-04 11:36:10.788305');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (375, 83, 3, 347, 'those are cool cats', 'https://media.tenor.com/images/c2e2b20f2d9be2c19aa34ec9e2cb6d2f/tenor.gif', '2022-04-03 11:07:38.915266');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (376, 83, 3, 320, 'Hello to you too', 'https://media.tenor.com/images/e0a228a917d5aefadfca5060c113e3ea/tenor.gif', '2022-04-03 11:33:56.500892');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (387, 78, 1, 3, 'sounds fun', 'https://media.tenor.com/images/cbd7e37b64328e8e596df2d339b007d3/tenor.gif', '2022-04-03 13:06:53.012255');
INSERT INTO public.posts OVERRIDING SYSTEM VALUE VALUES (388, 78, 1, 203, 'nice', 'https://media.tenor.com/images/6e6fe79fc30dba4976665d9e1f5e46e7/tenor.gif', '2022-04-03 13:07:31.090914');


--
-- TOC entry 3396 (class 0 OID 17963)
-- Dependencies: 209
-- Data for Name: read_posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.read_posts VALUES (78, 456);
INSERT INTO public.read_posts VALUES (78, 454);
INSERT INTO public.read_posts VALUES (78, 375);
INSERT INTO public.read_posts VALUES (78, 450);
INSERT INTO public.read_posts VALUES (91, 466);
INSERT INTO public.read_posts VALUES (91, 323);
INSERT INTO public.read_posts VALUES (78, 333);
INSERT INTO public.read_posts VALUES (78, 322);
INSERT INTO public.read_posts VALUES (78, 468);
INSERT INTO public.read_posts VALUES (78, 483);
INSERT INTO public.read_posts VALUES (78, 323);
INSERT INTO public.read_posts VALUES (78, 300);
INSERT INTO public.read_posts VALUES (90, 323);
INSERT INTO public.read_posts VALUES (90, 300);
INSERT INTO public.read_posts VALUES (90, 456);
INSERT INTO public.read_posts VALUES (90, 375);
INSERT INTO public.read_posts VALUES (90, 450);
INSERT INTO public.read_posts VALUES (90, 376);
INSERT INTO public.read_posts VALUES (90, 350);
INSERT INTO public.read_posts VALUES (90, 337);
INSERT INTO public.read_posts VALUES (78, 376);


--
-- TOC entry 3389 (class 0 OID 17901)
-- Dependencies: 202
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.roles OVERRIDING SYSTEM VALUE VALUES (1, 'user', 'can publish, edit and delete own posts');
INSERT INTO public.roles OVERRIDING SYSTEM VALUE VALUES (2, 'admin', 'can publish, edit and delete posts');


--
-- TOC entry 3391 (class 0 OID 17911)
-- Dependencies: 204
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (91, 1, 'jon@jon.com', '$2b$10$oSMTfAPu1JvmF6pY9U4KVOu5jwBGyAsWvFkd4gGnSEQSGImB2IBsi', 'jon', NULL, NULL, '2022-04-05 22:28:15.750378', false);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (82, 1, NULL, NULL, 'bibi', NULL, NULL, '2022-03-15 12:10:33.62578', true);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (2, 1, 'user@user.com', 'kjhf987fjTYRP2375', 'user-man', 'I''m king over the montain', '', '2022-03-02 17:37:13.561974', false);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (24, 1, NULL, NULL, 'p', NULL, NULL, '2022-03-15 01:08:07.899611', true);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (3, 2, 'colleague@happy.com', '$2b$10$hab5unbRkg7h.3E.YFpr4erkLT4mdCuHzcbDkKUX0X/0WMCrStwGG', 'other-admin-guy', NULL, '', '2022-03-07 19:29:32.406354', false);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (25, 1, NULL, NULL, 'bob', NULL, NULL, '2022-03-15 01:19:35.904167', true);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (81, 1, NULL, NULL, 'dudu', NULL, NULL, '2022-03-15 11:25:50.45331', true);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (4, 1, 'colleague2@happy.com', '$2b$10$oNv4onP4pKMsLmMHapQereAtAwGXeX9DzSMGbqQHItcQbtnVUHWuy', 'colleague2-man', NULL, '', '2022-03-08 13:36:14.80321', false);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (79, 1, 'didi@didi.com', '$2b$10$s97x0U6TZLTyXHYI.Nhzou/3bl/Hw6gaIrz2BeFNVjHDBgIKjHy1.', 'didi', NULL, '', '2022-03-15 11:20:44.111287', false);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (80, 1, 'dada@dada.com', '$2b$10$yDl/91Jf1jYoqSaUGyL5I.p2peXu8lOhAb9p0pjR5guStAsEHEkQu', 'dada', NULL, '', '2022-03-15 11:22:29.82685', false);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (9, 1, 'test@test.com', '$2b$10$pQdHpZ10msbM4Fv9z7S7L.VO6qBgI.o6E1.rALeMH43sN3WtQGMoy', 'test', NULL, '', '2022-03-10 21:39:20.437955', false);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (11, 1, 'test2@test2.com', '$2b$10$kNpaJqF3/omWM/nEaJvvWelp.WG0QlIshr8K2jHcM3Klh6.iQOCLq', 'test2', NULL, '', '2022-03-14 14:44:39.722107', false);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (84, 1, 'alice@alice.com', '$2b$10$r1WFfEIj7V/Qsw18WikL1OmZdF95siXK7/Uhp0B0CyugnyVaGNseq', 'alice', 'Bonjour, je suis Alice ', '', '2022-03-16 17:46:16.005805', false);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (89, 1, NULL, NULL, 'al', NULL, NULL, '2022-03-29 22:24:08.868672', true);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (90, 1, 'i-also-have-an-incredibly-long@email.com', '$2b$10$WWUlAVtHcaGXipeVD6G0qO4dkDZkA55q4EP3fYt3Pi5WLbwXsnSye', 'incredibly-long-named-person', NULL, '', '2022-03-31 13:27:15.268153', false);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (8, 1, NULL, NULL, 'newuser', NULL, NULL, '2022-03-09 16:35:48.551627', true);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (83, 1, NULL, NULL, 'tom', NULL, NULL, '2022-03-16 16:37:04.065902', true);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (87, 1, 'vic@vic.com', '$2b$10$pe68e7jzi43FA80fFuqISuYHucimm98Rvu6DV0gdVq35rxCz1VK4G', 'vic', 'Nostalgia isn''t what it used to be', 'http://localhost:3000/images/pixel-dog.gif1649168794745.gif', '2022-03-18 23:02:37.982459', false);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (78, 2, 'admin@admin.com', '$2b$10$ny11MXOpIkPeC4q3rFcPx.vzmacqxt8rz0ozQ/uyAY/BDTorQgBbG', 'admin', 'I''m all for hotdog Tuesdays every other day :)', 'http://localhost:3000/images/profile3.jpg1649322677422.jpg', '2022-03-15 10:56:26.340883', false);


--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 205
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 13, true);


--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 207
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 493, true);


--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 201
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 203
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 92, true);


--
-- TOC entry 3248 (class 2606 OID 17940)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 17952)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 3252 (class 2606 OID 17980)
-- Name: read_posts read_posts_user_id_post_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.read_posts
    ADD CONSTRAINT read_posts_user_id_post_id_key UNIQUE (user_id, post_id);


--
-- TOC entry 3240 (class 2606 OID 17908)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3242 (class 2606 OID 17923)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3244 (class 2606 OID 17925)
-- Name: users users_nickname_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nickname_key UNIQUE (nickname);


--
-- TOC entry 3246 (class 2606 OID 17921)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3255 (class 2606 OID 17958)
-- Name: posts posts_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- TOC entry 3254 (class 2606 OID 17953)
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3257 (class 2606 OID 17971)
-- Name: read_posts read_posts_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.read_posts
    ADD CONSTRAINT read_posts_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- TOC entry 3256 (class 2606 OID 17966)
-- Name: read_posts read_posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.read_posts
    ADD CONSTRAINT read_posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3253 (class 2606 OID 17926)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


-- Completed on 2022-04-11 11:30:30 CEST

--
-- PostgreSQL database dump complete
--

