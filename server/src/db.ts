import { Pool } from "pg";
import dotenv from "dotenv";

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
}: {
  requestId: string;
  email: string;
  firstName: string;
  lastName?: string | null;
}) => {
  pool
    .query(
      "INSERT INTO contacts (request_id, email, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, first_name, email",
      [request_id, email, first_name, last_name]
    )
    .catch((error) => {
      console.error(error);
    });
};
