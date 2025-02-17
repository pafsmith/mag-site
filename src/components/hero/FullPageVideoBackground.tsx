// import { ArrowDownCircle } from '@mynaui/icons-react';
import Container from "../global/Container";
import { Playfair_Display } from "next/font/google";

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700"], // Specify weights as needed
  style: "italic",
});

export default function FullPageVideoBackground() {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 bg-opacity-30">
        <video
          autoPlay
          loop
          muted
          className="h-full w-full object-cover opacity-50"
        >
          <source
            src="https://utfs.io/f/EbsGU6WGPzCg1lX2LdE2RaPKEd4A5xnybD0BVOULYJk9Ssh6"
            type="video/mp4"
          />
        </video>
      </div>
      <Container>
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
          <h1 className="mb-14 text-3xl font-bold text-white">
            Welcome to
            <strong
              className={`block text-9xl font-extrabold italic text-orange-500 ${playfair_display.className}`}
            >
              Magna
            </strong>
          </h1>
          <h1 className="font-Poppins text-xl font-bold md:text-2xl">
            Behind Every Iconic Chocolate, There’s Mastery at Work.
          </h1>
          <p className="font-Poppins mb-20 mt-4 text-lg md:text-xl">
            We partner with the world’s leading brands to craft chocolate
            products with precision and care.
          </p>
          {/* <ArrowDownCircle
            size={48}
            className='text-orange-500 animate-bounce'
          /> */}
        </div>
      </Container>
    </section>
  );
}
