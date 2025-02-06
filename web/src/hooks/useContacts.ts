import { ContactModel } from "@/models/contact.model";
import { parse } from "csv-parse/sync";
import { useState } from "react";

export const useContacts = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [contacts, setContacts] = useState<ContactModel[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleContacts = async (file: File) => {
    const content = await file.text();
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
    });

    const contacts = records.map((record: any, index: number) => {
      const data: string[] = Object.values(record);

      return {
        id: index,
        name: data[0].trim(),
        email: data[1].trim(),
      };
    });
    setContacts(contacts);
  };

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
    setIsUploading(true);
    e.preventDefault();
    if (!file) {
      setIsUploading(false);
      setError("Por favor, selecione um arquivo CSV.");
      setTimeout(() => setError(null), 2500);
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
      setSuccess(data.message);
      setTimeout(() => setSuccess(null), 2500);
      handleContacts(file);
      setFile(null);
      setError(null);
      return { message: data.message };
    } catch (error) {
      console.error(error);
      setError("Ocorreu um erro ao enviar o arquivo.");
      setTimeout(() => setError(null), 2500);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    file,
    setFile,
    error,
    setError,
    success,
    setSuccess,
    handleSubmit,
    handleFileChange,
    contacts,
    isUploading,
  };
};
