import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Navbar from "~/components/global/Navbar";
import Footer from "~/components/global/Footer";
import Container from "~/components/global/Container";
import Image from "next/image";

const departments = [
  {
    name: "Production",
    description:
      "Our factory is the heart of our operations, where premium chocolate products are crafted with precision, care, and innovation. Combining state-of-the-art machinery with skilled craftsmanship, we deliver delicious confections that delight our customers.",
    image: "/images/marketing.jpg",
    link: "/departments/factory",
  },
  {
    name: "Warehouse",
    description:
      "Efficient storage and logistics are vital to ensuring our chocolate reaches customers on time and in perfect condition. Our warehouse team manages inventory, packaging, and shipping with accuracy and speed to keep operations flowing smoothly.",
    image: "/images/marketing.jpg",
    link: "/departments/warehouse",
  },
  {
    name: "Engineering",
    description:
      "The engineering department ensures our equipment operates at peak efficiency, supporting production with advanced technology and expert maintenance. Their innovations drive our ability to produce high-quality confections consistently and reliably.",
    image: "/Asset 3.svg",
    link: "/departments/engineering",
  },
  {
    name: "Finance",
    description:
      "Behind every great chocolate bar is a robust financial strategy. Our finance team manages budgets, forecasts, and investments, ensuring the company operates sustainably while meeting growth objectives.",
    image: "/images/sales.jpg",
    link: "/departments/finance",
  },
  {
    name: "HR",
    description:
      "Our HR team fosters a positive and productive workplace, attracting top talent and supporting our employees’ growth and well-being. They champion a culture of collaboration, innovation, and mutual respect.",
    image: "/images/sales.jpg",
    link: "/departments/hr",
  },
  {
    name: "Quality Control",
    description:
      "Ensuring every bite of chocolate meets our high standards is the job of our Quality Control team. From sourcing the finest ingredients to inspecting finished products, they guarantee excellence at every stage.",
    image: "/images/sales.jpg",
    link: "/departments/quality-control",
  },
];

export default function CareersPage() {
  return (
    <>
      <Navbar transparent={false} />
      <div>
        <div aria-hidden="true" className="relative">
          <Image
            alt=""
            src="/eggs.png"
            className="h-96 w-full object-cover"
            width={1000}
            height={1000}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white" />
        </div>
        <div className="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Departments
            </h2>
            <p className="mt-4 text-gray-500">
              Our wide range of departments ensures that our chocolate is made
              with precision, care, and innovation. From production to
              warehouse, we have the expertise and resources to deliver
              delicious confections that delight our customers.
            </p>
          </div>
        </div>
        <section
          aria-labelledby="features-heading"
          className="mx-w-7xl mx-auto py-12 sm:px-2 lg:px-8"
        >
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
            <TabGroup className="mt-4">
              <div className="-mx-4 flex overflow-x-auto sm:mx-0">
                <div className="flex-auto border-gray-200 px-4 sm:px-0">
                  <TabList className="flex justify-center space-x-10">
                    {departments.map((department) => (
                      <Tab
                        key={department.name}
                        className="whitespace-nowrap border-b-2 border-transparent py-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 data-[selected]:border-orange-500 data-[selected]:text-orange-600"
                      >
                        {department.name}
                      </Tab>
                    ))}
                  </TabList>
                </div>
              </div>
              <TabPanels>
                {departments.map((department) => (
                  <TabPanel
                    key={department.name}
                    className="space-y-16 pt-10 lg:pt-16"
                  >
                    <Container className="">
                      <div className="mt-6 flex flex-col items-center justify-center lg:flex-row lg:gap-x-12 lg:space-x-12">
                        {/* Image */}
                        <Image
                          src={department.image}
                          alt={department.name}
                          className="h-auto w-32"
                          width={1000}
                          height={1000}
                        />

                        {/* Description */}
                        <div className="flex w-1/2 flex-col gap-y-3 text-center lg:text-left">
                          <h2 className="text-2xl font-semibold text-gray-800">
                            {department.name}
                          </h2>
                          <p className="mt-4 text-gray-600">
                            {department.description}
                          </p>
                          <a
                            href={department.link}
                            className="mt-4 inline-block w-36 rounded-lg bg-orange-500 px-6 py-2 text-white shadow hover:bg-orange-600"
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    </Container>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
