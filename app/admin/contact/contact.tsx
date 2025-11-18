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
    // <div className="max-w-[300px] flex flex-col gap-[10px] border rounded p-3">
    //   <h3>Client firstname: {contact.firstname}</h3>
    //   <h3>Client lastname: {contact.lastname}</h3>
    //   <p>Client phonenumber: {contact.phonenumber}</p>
    //   <p>Client email: {contact.email}</p>
    //   <h5
    //     onClick={() => handleOpen(true)}
    //     className={`${open === false ? "line-clamp-1" : ""} cursor-pointer`}
    //   >
    //     Cleint message: {contact.message}
    //   </h5>
    // </div>

    <a
      href="#"
      className="bg-neutral-primary-soft block w-[300px] p-6 border border-default rounded shadow-xs hover:bg-neutral-secondary-medium"
    >
      <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
        {contact.firstname} {""} {contact.lastname}
      </h5>
      <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
        {contact.phonenumber}
      </h5>
      <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
        {contact.email}
      </h5>
      <p
        onClick={() => handleOpen(true)}
        className={`text-body ${
          open === false ? "line-clamp-1" : ""
        } cursor-pointer`}
      >
        Here are the biggest technology acquisitions of 2025 so far, in reverse
        chronological order.
      </p>
    </a>
  );
};

export default ContactF;
