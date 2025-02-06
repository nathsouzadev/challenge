"use client";

import { ContactList } from "@/components/ContactList";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContacts } from "@/hooks/useContacts";
import { Loader } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const {
    handleSubmit,
    handleFileChange,
    error,
    success,
    file,
    contacts,
    isUploading,
  } = useContacts();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = await handleSubmit(event);

    if (fileInputRef.current && data) {
      console.log("HERE");
      fileInputRef.current.value = "";
    }
  };

  return (
    <main className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload de CSV</h1>
      <p className="text-sm mb-4">
        Upload your contacts in .csv. Ensure the file contains the fields email
        and name.
      </p>
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <Label htmlFor="csv-file">Select a CSV file</Label>
          <Input
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mt-1 border rounded-xl cursor-pointer"
            ref={fileInputRef}
          />
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        <Button
          type="submit"
          disabled={!file || isUploading}
          className="rounded-full"
        >
          {isUploading ? (
            <>
              <Loader className="h-4 w-4 animate-spin" /> Uploading...
            </>
          ) : (
            "Upload CSV"
          )}
        </Button>
      </form>

      {contacts.length > 0 && <ContactList contacts={contacts} />}
    </main>
  );
}
