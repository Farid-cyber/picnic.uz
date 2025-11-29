"use client";
import { useRef, useState } from "react";
import "./thirdChild.scss";
import Image from "next/image";

const ThirdChild = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      text: "Shop.co orqali olgan jihozlarim sifati va uslubi meni hayratda qoldirdi...",
    },
    {
      name: "Alex K.",
      text: "Shaxsiy uslubimga mos keladigan jihozlarni topish qiyin edi...",
    },
    {
      name: "James L.",
      text: "Yangi va o'ziga xos jihozlar qidirib yuraganimda Shop.co saytini topdim...",
    },
    {
      name: "Moona R.",
      text: "Yetkazib berish juda tez edi va mahsulot sifati juda yaxshi!",
    },
  ];

  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <section className="section mx-auto">
      <div className="fff flex w-full justify-between px-8 mb-6 items-center">
        <h2 className="text-2xl font-semibold">Bizning mamnun mijozlarimiz</h2>
        {/* <div className="flex gap-3">
          <Image
            src={"/arrow-down-bold 2.svg"}
            alt="prev"
            width={30}
            height={30}
            className="cursor-pointer rotate-90"
            onClick={handlePrev}
          />
          <Image
            src={"/Vector.svg"}
            alt="next"
            width={24}
            height={24}
            className="cursor-pointer -rotate-90"
            onClick={handleNext}
          />
        </div> */}
      </div>

      <div
        className="carousel-container"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className={`carousel-track ${paused ? "paused" : ""}`}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="carousel-item">
              <div className="flex gap-1 mb-3 text-yellow-400">★★★★★</div>
              <div className="flex mb-2 items-center gap-[5px]">
                <h3 className="font-semibold text-lg ">{t.name}</h3>
                <img src="/Frame (1).svg" width={20} alt="" />
              </div>
              <p className="text-gray-600 text-sm">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThirdChild;
