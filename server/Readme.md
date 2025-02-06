# Server

## Routes available

- GET baseUrl/

Health check

```bash
{
  "message": "API Health"
}

```

- POST baseUrl/csv

Send CSV file

CSV to upload should be in a format like above

```bash
name, email
Ada Lovelace, ada@resend.com
...
```

```bash
{
  "message": "CSV Uploaded"
  "id": "7a14507e-e87e-4e52-a2a4-76622eb178e2"
}
```

The api return responses, when still saving the content on database.
The id on response is a key to track the request what send the contact to database
