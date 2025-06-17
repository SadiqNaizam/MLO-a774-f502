import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"; // For basic form labels if not using shadcn/form fully
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin, HelpCircle, MessageSquare, ShieldCheck } from 'lucide-react';
import { toast } from "sonner"; // For form submission feedback

const faqItems = [
  {
    id: "faq-1",
    question: "What is the warranty period for the MacClone laptop?",
    answer: "All MacClone laptops come with a standard 1-year limited manufacturer's warranty covering hardware defects. Extended warranty options may be available at the time of purchase."
  },
  {
    id: "faq-2",
    question: "How do I initiate a return or exchange?",
    answer: "If you are not satisfied with your purchase, you can initiate a return or exchange within 30 days of delivery. Please visit our 'Returns & Exchanges' section (link placeholder) or contact our support team with your order number."
  },
  {
    id: "faq-3",
    question: "Where can I find drivers and software updates?",
    answer: "All necessary drivers are pre-installed. For software updates and optional utilities, please visit the 'Downloads' section on our website (link placeholder) or check your system's update utility."
  },
  {
    id: "faq-4",
    question: "What are the accepted payment methods?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and select financing options. All available methods will be shown at checkout."
  },
  {
    id: "faq-5",
    question: "How can I track my order?",
    answer: "Once your order has shipped, you will receive an email with a tracking number and a link to the carrier's website. You can also track your order status by logging into your account on our website."
  }
];

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, { message: "Message cannot exceed 1000 characters." })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const SupportPage = () => {
  console.log('SupportPage loaded');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Contact form submitted:", data);
    // Here you would typically send the data to a backend API
    toast.success("Message Sent!", {
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    form.reset();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Support Center
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're here to help! Find answers to common questions, contact our team, or learn about our policies.
          </p>
        </header>

        {/* FAQ Section */}
        <section id="faq" className="mb-12 md:mb-16">
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <HelpCircle className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
            {faqItems.map((item) => (
              <AccordionItem value={item.id} key={item.id} className="border-b dark:border-gray-700 last:border-b-0">
                <AccordionTrigger className="px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/30">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="mb-12 md:mb-16">
           <div className="flex items-center justify-center mb-6 md:mb-8">
            <MessageSquare className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
              Get in Touch
            </h2>
          </div>
          <Card className="max-w-2xl mx-auto shadow-xl dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Send us a message</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Fill out the form below and our support team will get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Question about my order" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">Your Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Please describe your issue or question in detail..." rows={5} {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>

        {/* Other Contact Info & Warranty/Returns Section */}
        <section id="other-info" className="mb-12 md:mb-16">
           <div className="flex items-center justify-center mb-6 md:mb-8">
            <ShieldCheck className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
              Policies & Direct Contact
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                  <Mail className="h-5 w-5 mr-2 text-primary" /> Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="flex items-center">
                  <strong className="w-20">Email:</strong>
                  <a href="mailto:support@macclone.com" className="ml-2 text-primary hover:underline">support@macclone.com</a>
                </p>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <strong className="w-20">Phone:</strong>
                  <a href="tel:+18005550199" className="ml-2 text-primary hover:underline">+1 (800) 555-0199</a>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">(Mon-Fri, 9am-5pm PST)</p>
                <p className="flex items-start mt-2">
                  <MapPin className="h-4 w-4 mr-1 mt-1 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <strong className="w-20">Address:</strong>
                  <span className="ml-2">123 Tech Avenue, Silicon Valley, CA 94000, USA</span>
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Warranty & Returns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>Our MacClone laptops come with a 1-year limited warranty. For full details on what's covered and how to make a claim, please review our <Link to="/warranty-policy" className="text-primary hover:underline">Warranty Policy</Link> (placeholder link, as `/warranty-policy` is not in `App.tsx`).</p>
                <p>If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Certain conditions apply. Please see our <Link to="/return-policy" className="text-primary hover:underline">Return Policy</Link> for detailed instructions (placeholder link, as `/return-policy` is not in `App.tsx`).</p>
                 <Button variant="outline" className="mt-2 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700">
                  Read Full Policies (Placeholder)
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;