import { useEffect, useState } from "react";
import "./secondChildChild.scss";
type InitialProps = {
  question: string;
  answer: string;
};
const SecondChildChild = ({ answer, question }: InitialProps) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {}, [open]);
  return (
    <>
      {open === false ? (
        <div className="SecondChildChild">
          <h4>{question}</h4>
          <p onClick={() => setOpen(true)}>+</p>
        </div>
      ) : (
        <div className="SecondChildChild2">
          <div className="w-full flex justify-between">
            <h4>{question}</h4>
            <p onClick={() => setOpen(false)}>x</p>
          </div>
          <div>
            <h6>{answer}</h6>
          </div>
        </div>
      )}
    </>
  );
};

export default SecondChildChild;
