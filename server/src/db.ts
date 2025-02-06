import { Pool } from "pg";
import dotenv from "dotenv";
import { ContactModel } from "./contact.model";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

export const saveContact = async ({
  requestId: request_id,
  email,
  firstName: first_name,
  lastName: last_name = null,
}: ContactModel) => {
  pool
    .query(
      "INSERT INTO contacts (request_id, email, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, first_name, email",
      [request_id, email, first_name, last_name]
    )
    .catch((error) => {
      console.error(error);
    });
};

export const createTable = async () => {
  pool
    .query(
      `
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      request_id UUID NOT NULL,
      email VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255)
    );
  `
    )
    .then(() => console.log("Table created successfully"))
    .catch((error) => console.error(error));
};
