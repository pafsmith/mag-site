import Navbar from "~/components/global/Navbar";
import Footer from "~/components/global/Footer";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Mail, FileText } from "lucide-react";
export default function PolicyPage() {
  const policies = [
    {
      title: "Privacy Policy",
      description:
        "Learn how we collect, use, and protect your personal information.",
      link: "/policies/privacy",
    },
    {
      title: "Modern Slavery Policy",
      description:
        "Our commitment to preventing modern slavery in our business and supply chains.",
      link: "/policies/modern-slavery",
    },
    // Add more policies here as they are created
  ];
  return (
    <>
      <Navbar transparent={false} />
      <div className="min-h-96 bg-background text-foreground">
        <header className="bg-primary py-12 text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="mb-2 text-4xl font-bold">Our Policies</h1>
            <p className="text-lg">
              Transparency and ethical practices at Magna
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {policies.map((policy, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{policy.title}</CardTitle>
                  <CardDescription>{policy.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Link href={policy.link} passHref>
                    <Button className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Read Full Policy
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        <footer className="bg-secondary py-8 text-secondary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-semibold">
              Questions About Our Policies?
            </h2>
            <p className="mb-2">
              If you have any questions about our policies, please contact us:
            </p>
            <a
              href="mailto:policies@magna.co.uk"
              className="inline-flex items-center text-primary hover:underline"
            >
              <Mail className="mr-2 h-4 w-4" />
              policies@magna.co.uk
            </a>
          </div>
        </footer>
      </div>
      <Footer />
    </>
  );
}
