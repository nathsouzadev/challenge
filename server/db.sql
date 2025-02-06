CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    request_id UUID NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255)
);