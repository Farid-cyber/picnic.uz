import Image from "next/image";
import "./footer.scss";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper-top">
        <div className="footer-wrapper">
          <div className="left-side-footer-wrapper">
            <Image alt="" height={100} width={100} src={"/Frame 50.svg"} />
            <div className="second-child-left-side-footer-wrapper">
              <div className="icon">
                <FaTwitter />
              </div>
              <div className="icon">
                <FaFacebookF />
              </div>
              <div className="icon">
                <FaInstagram />
              </div>
              <div className="icon">
                <FaGithub />
              </div>
            </div>
          </div>
          <div className="help-menu">
            <h4>KOMPANIYA</h4>
            <p>Biz haqimizda </p>
            <p>Xususiyatlar</p>
            <p> Ishlash jarayoni </p>
            <p>Karyera imkoniyatlari</p>
          </div>
          <div className="help-menu">
            <h4>YORDAM</h4>
            <p>Mijozlarni qo‘llab-quvvatlash</p>
            <p>Yetkazib berish tafsilotlari</p>
            <p> Shartlar va qoidalar</p>
            <p>Maxfiylik siyosati</p>
          </div>
          <div className="help-menu">
            <h4>SONLAR</h4>
            <p>Hisob</p>
            <p>Yetkazib berishni boshqarish</p>
            <p>Buyurtmalar</p>
            <p>To‘lovlar</p>
          </div>
          <div className="help-menu">
            <h4>RESURSLAR</h4>
            <p>Bepul e-kitoblar</p>
            <p>Dasturlash bo‘yicha qo‘llanmalar</p>
            <p>Qanday foydalanish - Blog</p>
            <p>YouTube pleylist</p>
          </div>
        </div>
        <div className="child2-footer-wrapper-top">
          <h2>© 2000-2021, All rights reserved</h2>
          <Link
            href={`https://myaccount.google.com/payments-and-subscriptions`}
          >
            <Image src={"/Frame 53.svg"} width={250} height={100} alt="" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
