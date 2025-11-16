"use client";
import "./secondChild.scss";
import SecondChildChild from "./secondChildChild";

const SecondChild = () => {
  const testimonials = [
    {
      q: "Mahsulotlarni qanday buyurtma qilsa bo‘ladi?",
      a: "Siz tanlagan mahsulotni savatchaga qo‘shib, to‘lov jarayonini davom ettirish orqali buyurtma qilishingiz mumkin. Buyurtma jarayoni oddiy va qulay.",
    },
    {
      q: "To‘lov usullari qanday?",
      a: "Siz tanlagan mahsulotni savatchaga qo‘shib, to‘lov jarayonini davom ettirish orqali buyurtma qilishingiz mumkin. Va o'sha yerdan turxil yo'llar bilan to'lov qilishingiz mumkin",
    },
    {
      q: "Yetkazib berish qancha vaqt oladi?",
      a: "Joylashgan hududingizga qarab turli xil vaqtni talab etadi",
    },
    {
      q: "Mahsulotlarni qaytarish mumkinmi?",
      a: "Yetkazib berilgan mahsulot qaytarib olinmaydi! Lekin siz hali masulotigiz yo'lga chiqmay qaytarib olishingiz mumkin",
    },
  ];
  return (
    <div className="secondChild">
      <h1>Tez-tez beriladigan savollar</h1>
      <div className="w-full">
        {testimonials.map((c, i) => (
          <SecondChildChild key={i} question={c.q} answer={c.a} />
        ))}
      </div>
    </div>
  );
};

export default SecondChild;
