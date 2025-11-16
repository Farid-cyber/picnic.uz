import { Contact } from "@/app/types";
import { useState } from "react";

interface InitialProps {
  contact: Contact;
}

const ContactF = ({ contact }: InitialProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (value: boolean) => {
    if (open === value) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <div className="max-w-[300px] flex flex-col gap-[10px] border rounded p-3">
      <h3>Client firstname: {contact.firstname}</h3>
      <h3>Client lastname: {contact.lastname}</h3>
      <p>Client phonenumber: {contact.phonenumber}</p>
      <p>Client email: {contact.email}</p>
      <h5
        onClick={() => handleOpen(true)}
        className={`${open === false ? "line-clamp-1" : ""} cursor-pointer`}
      >
        Cleint message: {contact.message}
      </h5>
    </div>
  );
};

export default ContactF;
