// import Container from '@/components/global/Container';
// import FooterNew from '@/components/global/FooterNew';
// import NavbarTesting from '@/components/global/NavbarTesting';

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';

// import React from 'react';

// const questions = [
//   {
//     question: 'Do you offer part-time work?',
//     answer: 'We offer a range of part-time/seasonal work, as well as full-time career paths.',
//   },
//   {
//     question: 'Do you offer transport?',
//     answer: 'Yes, we offer a bus service to and from areas surounding Telford.',
//   },
// ];
// export default function FAQPage() {
//   return (
//     <>
//       <NavbarTesting />
//       <section className='h-[40rem]'>
//         <Container>
//           <div className='flex flex-col gap-10'>
//             <h1 className='text-4xl font-bold text-center'>Frequently Asked Questions</h1>
//             <Accordion type='single' collapsible className='w-full'>
//               <div className='grid grid-cols-1 gap-3 md:gap-6 lg:gap-10 md:grid-cols-2 lg:grid-cols-3'>
//                 {questions.map((question) => (
//                   <AccordionItem
//                     key={question.question}
//                     value={question.question}
//                     className='border-b-0 h-auto'>
//                     <AccordionTrigger className=''>{question.question}</AccordionTrigger>
//                     <AccordionContent>{question.answer}</AccordionContent>
//                   </AccordionItem>
//                 ))}
//               </div>
//             </Accordion>
//           </div>
//         </Container>
//       </section>
//       <FooterNew />
//     </>
//   );
// }

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
    question: "Do you offer recalls?",
    answer: "We do offer recalls for employees at the end of the season.",
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
      <p>Actually Starting to do the FAQ Page</p>
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
