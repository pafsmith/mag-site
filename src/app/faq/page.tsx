const faqs = [
  {
    id: 1,
    question: "Do you offer part-time work?",
    answer:
      "We offer a range of part-time/seasonal work, as well as full-time career paths.",
  },
  {
    id: 2,
    question: "Do you offer transport?",
    answer:
      "We offer a coach service to employees situated in the area surrounding Telford.",
  },
  {
    id: 3,
    question: "How often am I paid?",
    answer: "Employees are paid on a weekly basis for seasonal work!",
  },
  {
    id: 4,
    question: "Do you offer work in follow ing seasons?",
    answer:
      "We do offer work for the following season to employees at the end of each season.",
  },
  {
    id: 5,
    question: "How long does an applcation take?",
    answer:
      "We recieve hundreds of applications every year, we try to respond to all applications within a week.",
  },
];

import React from "react";
import Footer from "~/components/global/Footer";
import Navbar from "~/components/global/Navbar";

export default function page() {
  return (
    <div>
      <Navbar transparent={false} />
      <main>
        <div>
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <dl className="mt-20 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8"
                >
                  <dt className="text-base/7 font-semibold text-gray-900 lg:col-span-5">
                    {faq.question}
                  </dt>
                  <dd className="mt-4 lg:col-span-7 lg:mt-0">
                    <p className="text-base/7 text-gray-900">{faq.answer}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
