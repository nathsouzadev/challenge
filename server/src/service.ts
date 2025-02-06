import { createReadStream } from "fs";
import csv from "csv-parser";
import { saveContact } from "./db";
import { randomUUID } from "crypto";

export const adapter = (
  data: string[],
  requestId: string
): {
  requestId: string;
  email: string;
  firstName: string;
  lastName: string;
} => {
  const email = data[1];
  const fullName = data[0].split(" ");
  const firstName = fullName[0];
  const lastName = fullName[1];

  return { requestId, email, firstName, lastName };
};

export const save = async (filePath: string): Promise<{ id: string }> => {
  const t0 = Date.now();
  const requestId = randomUUID();

  createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => {
      const values: string[] = Object.values(data);
      const contact = adapter(values, requestId);

      saveContact(contact);
    })
    .on("end", () => console.log(`Processing time: ${Date.now() - t0}ms`));

  return { id: requestId };
};
