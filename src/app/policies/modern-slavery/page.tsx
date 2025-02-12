import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Mail } from "lucide-react";
import Navbar from "~/components/global/Navbar";
import Footer from "~/components/global/Footer";
export default function PrivacyPolicy() {
  return (
    <>
      <Navbar transparent={false} />
      <div className="min-h-screen bg-background text-foreground">
        <header className="bg-primary py-12 text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="mb-2 text-4xl font-bold">
              Modern Slavery & Human Trafficking
            </h1>
            <p className="text-lg">Last updated: February 11, 2025</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="mx-auto max-w-3xl">
            <p className="mb-8 text-lg">
              At Magna Specialist Confectioners, we have a zero-tolerance
              approach to modern slavery and are fully committed to preventing
              slavery and human trafficking in our operation. We have taken
              steps to tackle modern slavery, as outlined below. This statement
              sets out the actions that we have taken to understand all
              potential modern slavery risks related to our business, and to
              implement steps to prevent slavery and human trafficking during
              the financial year 2023/24. This statement is made in accordance
              with section 54 (1) of the Modern Slavery Act 2015.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="information-collection">
                <AccordionTrigger>
                  Our business and supply chains
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      We are Europe’s largest privately-owned manufacturer of
                      chocolate hollow moulded products with an annual turnover
                      of £152 million. We supply major confectionery companies
                      from one manufacturing facility with all supply chain,
                      administrative & operations based at Telford, Shropshire,
                      TF3 3BH.
                    </li>
                    <li>
                      We work with a small number of suppliers, principally
                      involving services, including contract engineering,
                      engineering parts & equipment, cleaning services. All
                      other suppliers are directed by our customers.
                    </li>
                    <li>
                      Our customers have made significant progress in their
                      global supply chains; however, we recognise our
                      responsibility to ensure we stay abreast of their
                      continued progress and improvement in their supply chains.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="information-use">
                <AccordionTrigger>Risk assessment</AccordionTrigger>
                <AccordionContent>
                  <p>
                    WAs previously stated our suppliers are directed by our
                    customers giving us limited control over the supply chain.
                    However all suppliers have there own internal controls and
                    policies.
                  </p>
                  <p className="mt-4">
                    Due to the seasonal nature of our business and the high
                    intake of employees every effort is made to ensure that all
                    prospective employees are legally entitled to work in the UK
                    and to safeguard employees from any abuse or coercion. Magna
                    Specialist Confectioners is at a low risk to trafficking and
                    slavery due to the multiple steps put in place during the
                    recruitment process.
                  </p>
                  <p className="mt-4">
                    Magna over the past years we continue to take the following
                    steps to reduce the risk:
                  </p>

                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      Ensure no agency staff are used and employed within Magna,
                      we continue to prioritise recruiting new employees rather
                      than an agency, continuing with our in-house resource
                      team.
                    </li>
                    <li>
                      Continue to review the levels of recalls, staff that
                      return from previous seasons, the recall rate currently
                      for this financial year is 71%, this reduces the risk.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="information-sharing">
                <AccordionTrigger>Enhanced communication</AccordionTrigger>
                <AccordionContent>
                  <p>
                    To increase the ability of our colleagues to raise concerns
                    through multiple avenues of communication such as face to
                    face, phone communications, we have created electronic
                    communications through a Magna app/messaging service, this
                    is available to all employees.
                  </p>
                  <p className="mt-4">
                    We continue to give access to a member of HR to all
                    employees for each shift pattern, should they wish to
                    discuss any matters face to face rather than messages.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-security">
                <AccordionTrigger>Policies</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Magna Specialist Confectioners operates the following
                    policies for identifying and preventing slavery and human
                    trafficking in our operations:
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      Whistleblowing Policy – we encourage all employees to
                      report any suspicion of slavery or human trafficking
                      without fear of retaliation. We provide a confidential
                      helpline to protect the identity of whistle-blowers. The
                      whistleblowing service is available 24/7, while concerns
                      have been raised, none have been related to potential
                      modern slavery cases in the last 12 months.
                    </li>
                    <li>
                      Code of Conduct – our code, found in the staff handbook,
                      encourages employees to do the right thing by clearly
                      stating the actions and behaviour expected of them when
                      representing the business. We strive to maintain the
                      highest standards of employee conduct and ethical
                      behaviour when operating.
                    </li>
                    <li>
                      Supplier Code of conduct -Supplier pre-approval process
                      alongside financial and food safety considerations,
                      Ethical practice is an essential part of this code and we
                      make it clear that supplier need to meet or expectations.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="your-rights">
                <AccordionTrigger>Awareness</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Magna Specialist Confectioners has raised awareness of
                    modern slavery issues by including it the company handbook
                    and included a section on modern slavery in our mental
                    health course and sending an email that is focused
                    specifically on modern slavery to all team leaders,
                    supervisors and recruiters which explains:
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>Our commitment in the fight against modern slavery</li>
                    <li>
                      Red flags for potential cases of slavery or human
                      trafficking
                    </li>
                    <li>
                      How employees should report suspicions of modern slavery
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="policy-changes">
                <AccordionTrigger>Training</AccordionTrigger>
                <AccordionContent>
                  <p>
                    In addition to the awareness programme, All team leaders and
                    supervisors have attended the training course to ensure
                    awareness, any new team leaders and supervisors will attend
                    the course within the first year of employment. This is ran
                    as part of our mental health first aid course that covers:
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      Various forms of modern slavery in which people can be
                      held and exploited
                    </li>
                    <li>
                      The size of the problem and the risk to our organisation
                    </li>
                    <li>
                      How employees can identify the signs of slavery and human
                      traffickin
                    </li>
                    <li>
                      How employees should respond if they suspect slavery or
                      human trafficking
                    </li>
                    <li>
                      What external help is available for the victims of slavery
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="safeguards">
                <AccordionTrigger>Safeguards</AccordionTrigger>
                <AccordionContent>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      All employees must be over the age of 18 to commence
                      employment, this is shown using either their passport,
                      full British birth certificate or documents pertaining to
                      their right to work such as a Home Office right to work
                      check.
                    </li>
                    <li>
                      Procedural triggers are also in place that alert HR if
                      more than two people live at the same address or share the
                      same bank account.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </main>

        <footer className="bg-secondary py-8 text-secondary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
            <p className="mb-2">
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <a
              href="mailto:privacy@magna.co.uk"
              className="inline-flex items-center text-primary hover:underline"
            >
              <Mail className="mr-2 h-4 w-4" />
              privacy@magna.co.uk
            </a>
          </div>
        </footer>
      </div>
      <Footer />
    </>
  );
}
