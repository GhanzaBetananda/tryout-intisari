--
-- PostgreSQL database dump
--


-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-29 21:05:07

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16498)
-- Name: akun; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public.akun (
--     id bigint NOT NULL,
--     username character varying(100) NOT NULL,
--     email character varying(255) NOT NULL,
--     password character varying(255) NOT NULL,
--     no_hp character varying(255) NOT NULL,
--     role character varying(255) NOT NULL,
--     created_at timestamp(0) without time zone,
--     updated_at timestamp(0) without time zone,
--     CONSTRAINT akun_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'peserta'::character varying])::text[])))
-- );


ALTER TABLE public.akun OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16497)
-- Name: akun_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.akun_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.akun_id_seq OWNER TO postgres;

--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 221
-- Name: akun_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.akun_id_seq OWNED BY public.akun.id;


--
-- TOC entry 223 (class 1259 OID 16515)
-- Name: cache; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16526)
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16568)
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16567)
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO postgres;

--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 228
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- TOC entry 233 (class 1259 OID 16609)
-- Name: hasil_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hasil_detail (
    id bigint NOT NULL,
    hasil_tryout_id bigint NOT NULL,
    kategori character varying(255) NOT NULL,
    benar integer,
    salah integer,
    terjawab integer,
    nilai integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.hasil_detail OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16608)
-- Name: hasil_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hasil_detail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hasil_detail_id_seq OWNER TO postgres;

--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 232
-- Name: hasil_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hasil_detail_id_seq OWNED BY public.hasil_detail.id;


--
-- TOC entry 231 (class 1259 OID 16592)
-- Name: hasil_tryout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hasil_tryout (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    jenis_tryout character varying(255) NOT NULL,
    total_nilai integer NOT NULL,
    durasi integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.hasil_tryout OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16591)
-- Name: hasil_tryout_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hasil_tryout_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hasil_tryout_id_seq OWNER TO postgres;

--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 230
-- Name: hasil_tryout_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hasil_tryout_id_seq OWNED BY public.hasil_tryout.id;


--
-- TOC entry 227 (class 1259 OID 16553)
-- Name: job_batches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


ALTER TABLE public.job_batches OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16538)
-- Name: jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16537)
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobs_id_seq OWNER TO postgres;

--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 225
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- TOC entry 220 (class 1259 OID 16488)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16487)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 5100 (class 0 OID 0)
-- Dependencies: 219
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 4894 (class 2604 OID 16501)
-- Name: akun id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.akun ALTER COLUMN id SET DEFAULT nextval('public.akun_id_seq'::regclass);


--
-- TOC entry 4896 (class 2604 OID 16571)
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- TOC entry 4899 (class 2604 OID 16612)
-- Name: hasil_detail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hasil_detail ALTER COLUMN id SET DEFAULT nextval('public.hasil_detail_id_seq'::regclass);


--
-- TOC entry 4898 (class 2604 OID 16595)
-- Name: hasil_tryout id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hasil_tryout ALTER COLUMN id SET DEFAULT nextval('public.hasil_tryout_id_seq'::regclass);


--
-- TOC entry 4895 (class 2604 OID 16541)
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- TOC entry 4893 (class 2604 OID 16491)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 5078 (class 0 OID 16498)
-- Dependencies: 222
-- Data for Name: akun; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.akun (id, username, email, password, no_hp, role, created_at, updated_at) FROM stdin;
13	ghanza	ghanzabeta212@gmail.com	12345678	085930088301	admin	2026-07-12 06:18:48	2026-07-12 06:18:48
14	admin	admintampan@gmail.com	141414	089076887887	peserta	2026-07-12 06:30:21	2026-07-12 06:30:37
17	nada	nada@gmail.com	87654321	087877877877	peserta	2026-07-22 01:41:53	2026-07-22 01:41:53
18	Valid	valid@gmail.com	123456	0888888888	peserta	2026-07-26 13:44:51	2026-07-26 13:44:51
15	hafi	ha@gmail.com	yyyyyy	089898987721	peserta	2026-07-12 06:41:29	2026-07-26 14:25:57
\.


--
-- TOC entry 5079 (class 0 OID 16515)
-- Dependencies: 223
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cache (key, value, expiration) FROM stdin;
\.


--
-- TOC entry 5080 (class 0 OID 16526)
-- Dependencies: 224
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- TOC entry 5085 (class 0 OID 16568)
-- Dependencies: 229
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- TOC entry 5089 (class 0 OID 16609)
-- Dependencies: 233
-- Data for Name: hasil_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hasil_detail (id, hasil_tryout_id, kategori, benar, salah, terjawab, nilai, created_at, updated_at) FROM stdin;
1	10	TWK	1	29	\N	5	2026-07-22 01:38:02	2026-07-22 01:38:02
2	10	TIU	0	35	\N	0	2026-07-22 01:38:02	2026-07-22 01:38:02
3	10	TKP	\N	\N	0	0	2026-07-22 01:38:02	2026-07-22 01:38:02
4	11	TWK	0	30	\N	0	2026-07-23 16:55:57	2026-07-23 16:55:57
5	11	TIU	0	35	\N	0	2026-07-23 16:55:57	2026-07-23 16:55:57
6	11	TKP	\N	\N	0	0	2026-07-23 16:55:57	2026-07-23 16:55:57
7	12	TWK	9	21	\N	45	2026-07-24 07:40:26	2026-07-24 07:40:26
8	13	TWK	1	29	\N	5	2026-07-26 13:46:34	2026-07-26 13:46:34
9	13	TIU	0	35	\N	0	2026-07-26 13:46:34	2026-07-26 13:46:34
10	13	TKP	\N	\N	0	0	2026-07-26 13:46:34	2026-07-26 13:46:34
11	14	TWK	9	21	\N	45	2026-07-26 14:37:59	2026-07-26 14:37:59
12	15	TWK	1	29	\N	5	2026-07-28 13:31:37	2026-07-28 13:31:37
13	15	TIU	2	33	\N	10	2026-07-28 13:31:37	2026-07-28 13:31:37
14	15	TKP	\N	\N	3	314	2026-07-28 13:31:37	2026-07-28 13:31:37
15	16	TWK	0	30	\N	0	2026-07-28 13:38:36	2026-07-28 13:38:36
16	16	TIU	0	35	\N	0	2026-07-28 13:38:36	2026-07-28 13:38:36
17	16	TKP	\N	\N	5	15	2026-07-28 13:38:36	2026-07-28 13:38:36
18	17	TWK	0	30	\N	0	2026-07-28 13:38:37	2026-07-28 13:38:37
19	17	TIU	0	35	\N	0	2026-07-28 13:38:37	2026-07-28 13:38:37
20	17	TKP	\N	\N	5	15	2026-07-28 13:38:37	2026-07-28 13:38:37
\.


--
-- TOC entry 5087 (class 0 OID 16592)
-- Dependencies: 231
-- Data for Name: hasil_tryout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hasil_tryout (id, user_id, jenis_tryout, total_nilai, durasi, created_at, updated_at) FROM stdin;
10	13	TRYOUT_LENGKAP	5	1944	2026-07-22 01:38:02	2026-07-22 01:38:02
11	17	TRYOUT_LENGKAP	0	15	2026-07-23 16:55:57	2026-07-23 16:55:57
12	17	TWK	45	101	2026-07-24 07:40:25	2026-07-24 07:40:25
13	18	TRYOUT_LENGKAP	5	27	2026-07-26 13:46:33	2026-07-26 13:46:33
14	13	TWK	45	142	2026-07-26 14:37:59	2026-07-26 14:37:59
15	15	TO BKN Paket 3	150314	39	2026-07-28 13:31:37	2026-07-28 13:31:37
16	14	TO BKN Paket 3	15	14	2026-07-28 13:38:36	2026-07-28 13:38:36
17	14	TO BKN Paket 3	15	15	2026-07-28 13:38:37	2026-07-28 13:38:37
\.


--
-- TOC entry 5083 (class 0 OID 16553)
-- Dependencies: 227
-- Data for Name: job_batches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
\.


--
-- TOC entry 5082 (class 0 OID 16538)
-- Dependencies: 226
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- TOC entry 5076 (class 0 OID 16488)
-- Dependencies: 220
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2026_07_21_162649_create_hasil_tryouts_table	2
5	2026_07_21_162815_create_hasil_details_table	2
\.


--
-- TOC entry 5101 (class 0 OID 0)
-- Dependencies: 221
-- Name: akun_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.akun_id_seq', 18, true);


--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 228
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 232
-- Name: hasil_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hasil_detail_id_seq', 20, true);


--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 230
-- Name: hasil_tryout_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hasil_tryout_id_seq', 17, true);


--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 225
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 219
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);


--
-- TOC entry 4904 (class 2606 OID 16514)
-- Name: akun akun_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.akun
    ADD CONSTRAINT akun_email_unique UNIQUE (email);


--
-- TOC entry 4906 (class 2606 OID 16512)
-- Name: akun akun_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.akun
    ADD CONSTRAINT akun_pkey PRIMARY KEY (id);


--
-- TOC entry 4912 (class 2606 OID 16535)
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- TOC entry 4909 (class 2606 OID 16524)
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- TOC entry 4919 (class 2606 OID 16583)
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 4921 (class 2606 OID 16585)
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- TOC entry 4925 (class 2606 OID 16618)
-- Name: hasil_detail hasil_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hasil_detail
    ADD CONSTRAINT hasil_detail_pkey PRIMARY KEY (id);


--
-- TOC entry 4923 (class 2606 OID 16602)
-- Name: hasil_tryout hasil_tryout_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hasil_tryout
    ADD CONSTRAINT hasil_tryout_pkey PRIMARY KEY (id);


--
-- TOC entry 4917 (class 2606 OID 16566)
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- TOC entry 4914 (class 2606 OID 16551)
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 4902 (class 2606 OID 16496)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4907 (class 1259 OID 16525)
-- Name: cache_expiration_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX cache_expiration_index ON public.cache USING btree (expiration);


--
-- TOC entry 4910 (class 1259 OID 16536)
-- Name: cache_locks_expiration_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX cache_locks_expiration_index ON public.cache_locks USING btree (expiration);


--
-- TOC entry 4915 (class 1259 OID 16552)
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- TOC entry 4927 (class 2606 OID 16619)
-- Name: hasil_detail hasil_detail_hasil_tryout_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hasil_detail
    ADD CONSTRAINT hasil_detail_hasil_tryout_id_foreign FOREIGN KEY (hasil_tryout_id) REFERENCES public.hasil_tryout(id) ON DELETE CASCADE;


--
-- TOC entry 4926 (class 2606 OID 16603)
-- Name: hasil_tryout hasil_tryout_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hasil_tryout
    ADD CONSTRAINT hasil_tryout_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.akun(id) ON DELETE CASCADE;


-- Completed on 2026-07-29 21:05:07

--
-- PostgreSQL database dump complete
--


