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

import React from 'react';

export default function page() {
  return <div>page</div>;
}
