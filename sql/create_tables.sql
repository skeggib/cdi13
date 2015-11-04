\i drop.sql

CREATE TABLE subject (
    id SERIAL PRIMARY KEY,
    short_name VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE link (
    id SERIAL PRIMARY KEY,
    link VARCHAR UNIQUE NOT NULL,
    name VARCHAR NOT NULL,
    subject_id INTEGER REFERENCES subject(id) NOT NULL,
    creation_timestamp TIMESTAMP NOT NULL
);

CREATE TABLE markdown (
	id SERIAL PRIMARY KEY,
	link_id INT REFERENCES link(id) NOT NULL,
	markdown TEXT NOT NULL,
	creation_timestamp TIMESTAMP NOT NULL
);

\i create_functions.sql
\i create_views.sql
