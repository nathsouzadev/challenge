"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contact } from "./Contact";
import { ContactModel } from "@/models/contact.model";

interface ContactListProps {
  contacts: ContactModel[];
}

export const ContactList = ({ contacts }: ContactListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 100;
  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-xl font-semibold">Lista de Contatos</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <Contact key={contact.id} {...contact} />
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima
        </Button>
      </div>
    </div>
  );
};
