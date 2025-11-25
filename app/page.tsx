// import Image from "next/image";
"use client";

import FirstChild from "./homecomponents/firstChild";
import SecondChild from "./homecomponents/secondChild";
import All from "./homecomponents/all";
import TestimonialsCarousel from "./homecomponents/thirdChild";

export default function Home() {
  // console.log(testimonials);

  return (
    <div className="flex flex-col pb-[40px]">
      <hr className="hr" />
      <FirstChild />
      <All />
      <SecondChild />
      <TestimonialsCarousel />
    </div>
  );
}
