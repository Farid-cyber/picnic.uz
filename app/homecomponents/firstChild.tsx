"use client";
import Link from "next/link";
import "./firstChild.scss";
import Image from "next/image";

const FirstChild = () => {
  return (
    <div className="firstChild">
      <div className="left-child">
        <h1>Zo'r jihozlar bilan sarguzashtlarni kashf eting</h1>
        <p>
          Sarguzasht ishqibozlari uchun moʻljallangan ochiq havoda kerakli
          jihozlarimizni kashf eting. Yuqori sifatli chodirlardan qulay lager
          anjomlarigacha, hammasi sizning tajribangizni yuksaltirish uchun.
        </p>
        <Link  href={"/mahsulotlar"}>
          <button className="cursor-pointer">Xarid qiling</button>
        </Link>
        <div className="last-child-left-child w-full">
          <div className="b">
            <h4>
              10<span>+</span>
            </h4>
            <h5>Xalqaro brendlar</h5>
          </div>
          <div className="b">
            <h4>
              2,000<span>+</span>
            </h4>
            <h5>Yuqori Sifatli Mahsulotlar</h5>
          </div>
          <div>
            <h4>
              500<span>+</span>
            </h4>
            <h5>Baxtli mijozlar</h5>
          </div>
        </div>
      </div>
      <div className="right-child">
        <Image alt="rasm" src={"/image.svg"} width={1000} height={100} />
      </div>
    </div>
  );
};

export default FirstChild;
