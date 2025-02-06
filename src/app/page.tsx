import Container from "~/components/global/Container";
import Footer from "~/components/global/Footer";
import Navbar from "~/components/global/Navbar";

import FullPageVideoBackground from "~/components/hero/FullPageVideoBackground";
import Testemonial from "~/components/Testemonial";
import { Separator } from "~/components/ui/separator";
import React from "react";

const testimonials = [
  {
    body: "Working here has been an incredible journey. The collaborative environment and cutting-edge projects keep me motivated every day",
    author: {
      name: "Leslie Alexander",
      role: "Engineer",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "I've grown so much professionally since joining this team. The support and opportunities for advancement are unparalleled.",
    author: {
      name: "Lindsay Walton",
      role: "Machine Operator",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "The emphasis on work-life balance and the friendly atmosphere make this the best place I've ever worked.",
    author: {
      name: "Tom Cook",
      role: "Process Operator",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "Working here has been an incredible journey. The collaborative environment and cutting-edge projects keep me motivated every day",
    author: {
      name: "Leslie Alexander",
      role: "Engineer",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "I've grown so much professionally since joining this team. The support and opportunities for advancement are unparalleled.",
    author: {
      name: "Lindsay Walton",
      role: "Machine Operator",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    body: "The emphasis on work-life balance and the friendly atmosphere make this the best place I've ever worked.",
    author: {
      name: "Tom Cook",
      role: "Process Operator",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

const stats = [
  { label: "Easter Eggs Produced a year", value: "125 Million" },
  { label: "Yearly investment into production", value: "£10,000,000" },
  {
    label: "Amount of foil used for wrapping Easter Eggs yearly",
    value: "3,000 tons",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar transparent={true} />
      <FullPageVideoBackground />

      <section className="">
        <Container className="flex flex-col gap-10 pt-12 lg:flex-row lg:gap-0">
          <Container className="flex flex-col justify-center">
            <h2 className="mb-8 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Who are <span className="text-orange-500">Magna</span>
            </h2>
            <p className="max-w-xl text-base/7 text-gray-700">
              At Magna we are dedicated to innovation and continuous
              improvement, pushing boundaries to deliver exceptional chocolate
              confectionery solutions. Our focus on creativity and technical
              expertise drives us to develop cutting-edge processes and embrace
              advancements that elevate our production capabilities. Through a
              culture of progress and excellence, we continually refine our
              operations to meet the evolving needs of our partners and the
              industry.
            </p>
          </Container>
          <Container className="flex flex-col justify-center">
            <div className="flex w-full flex-col lg:max-w-80">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    key={stat.label}
                    className="my-3 flex flex-col items-center lg:items-start"
                  >
                    <p className="mb-3 text-5xl font-semibold tracking-tight text-orange-500">
                      {stat.value}
                    </p>
                    <p className="mb-3 text-base/7 text-gray-600">
                      {stat.label}
                    </p>
                    <Separator className="" />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Testemonial key={testimonial.author.name} {...testimonial} />
          ))}
        </Container>
      </section>

      <section>
        <div className="relative isolate overflow-hidden bg-gray-900">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Shape the Future of{" "}
                <span className="text-orange-500">Chocolate</span> with Us.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-300">
                Join a passionate team dedicated to crafting exceptional
                chocolate creations. Explore exciting career opportunities and
                grow with us today.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-500 hover:text-slate-100 focus-visible:outline-orange-600 active:bg-orange-800 active:text-orange-100"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="text-sm/6 font-semibold text-white hover:text-orange-500"
                >
                  View Jobs <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/4 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                <stop stopColor="#ed6d05" />
                <stop offset={1} stopColor="#ed6d05" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>

      <Footer />
    </>
  );
}
