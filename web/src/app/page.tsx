"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "text/csv") {
        setFile(selectedFile);
        setError(null);
      } else {
        setFile(null);
        setError("Only CSV files are allowed.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError("Por favor, selecione um arquivo CSV.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/csv", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      setSuccess("Arquivo CSV enviado com sucesso!");
      setFile(null);
      setError(null);
      // if (result.success) {

      // } else {
      //   setError(result.message || "Ocorreu um erro ao enviar o arquivo.")
      // }
    } catch (error) {
      console.error(error);
      setError("Ocorreu um erro ao enviar o arquivo.");
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload de CSV</h1>
      <p className="text-sm mb-4">
        Upload your contacts in .csv. Ensure the file contains the fields email
        and name.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="csv-file">Select a CSV file</Label>
          <Input
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mt-1 border rounded-xl cursor-pointer"
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
        <Button type="submit" disabled={!file} className="rounded-full">
          Upload CSV
        </Button>
      </form>
    </main>
  );
}
