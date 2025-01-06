import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import contactLottie from "../../public/contact-lottie.json";

export function HeroSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-4">
      <div className="flex flex-col items-center md:flex-row  md:justify-between md:items-center gap-5">
        <div className="flex justify-center">
          
          <Lottie animationData={contactLottie} loop={true} />
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-[30px] max-sm:text-center md:text-[36px] font-bold text-primary">
            Let&apos;s Connect
          </h1>
          <p className="max-w-[350px] text-primary max-sm:text-center text-[16px] md:text-[20px]">
            We&apos;re just one click away to help you take your brand or
            product from great to incredible.
          </p>
          <div className="flex flex-col gap-2">
            <span className="text-[20px] max-sm:text-center md:text-[24px] font-700 text-primary">
              Get In Touch
            </span>
            <Link
              to="mailto:info@smallbizmarketing.agency"
              className="text-primary hover:underline text-lg max-sm:text-center"
            >
              info@smallbizmarketing.agency
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}