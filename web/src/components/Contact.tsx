import { ContactModel } from "@/models/contact.model";
import { TableCell, TableRow } from "./ui/table";

export const Contact = ({ id, name, email }: ContactModel) => {
  return (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
    </TableRow>
  );
};
