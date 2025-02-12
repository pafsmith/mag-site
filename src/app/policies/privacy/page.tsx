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
            <h1 className="mb-2 text-4xl font-bold">Privacy Policy</h1>
            <p className="text-lg">Last updated: February 11, 2025</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="mx-auto max-w-3xl">
            <p className="mb-8 text-lg">
              At Magna, we are committed to protecting your privacy and ensuring
              privacy and ensuring the security of your personal information.
              This Privacy Policy outlines how we collect, use, disclose, and
              safeguard your data when you use our services or visit our
              website.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="information-collection">
                <AccordionTrigger>Information We Collect</AccordionTrigger>
                <AccordionContent>
                  <p>
                    We collect information that you provide directly to us, such
                    as when you:
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>Create an account</li>
                    <li>Use our services</li>
                    <li>Contact our support team</li>
                  </ul>
                  <p className="mt-4">
                    This information may include your name, email address, phone
                    number, and other relevant details.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="information-use">
                <AccordionTrigger>How We Use Your Information</AccordionTrigger>
                <AccordionContent>
                  <p>We use the information we collect to:</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>
                      Send you technical notices, updates, and support messages
                    </li>
                    <li>Respond to your comments and questions</li>
                    <li>Analyze usage patterns and improve user experience</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="information-sharing">
                <AccordionTrigger>
                  Information Sharing and Disclosure
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    We do not sell or rent your personal information to third
                    parties. We may share your information in the following
                    circumstances:
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>With your consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights, privacy, safety, or property</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-security">
                <AccordionTrigger>Data Security</AccordionTrigger>
                <AccordionContent>
                  <p>
                    We implement appropriate technical and organizational
                    measures to protect your personal information against
                    unauthorized or unlawful processing, accidental loss,
                    destruction, or damage. However, please note that no method
                    of transmission over the Internet or electronic storage is
                    100% secure.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="your-rights">
                <AccordionTrigger>Your Rights and Choices</AccordionTrigger>
                <AccordionContent>
                  <p>You have the right to:</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      Access, correct, or delete your personal information
                    </li>
                    <li>
                      Object to or restrict certain processing of your data
                    </li>
                    <li>Request portability of your information</li>
                    <li>Withdraw consent where applicable</li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, please contact us using the
                    information provided below.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="policy-changes">
                <AccordionTrigger>Changes to This Policy</AccordionTrigger>
                <AccordionContent>
                  <p>
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the &quot;Last updated&quot; date
                    of this policy.
                  </p>
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
