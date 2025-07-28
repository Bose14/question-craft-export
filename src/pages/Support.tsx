import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FileText,
  Mail,
  Phone,
  MessageCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Support = () => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (location.hash) {
      const scrollToSection = () => {
        const target = document.querySelector(location.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      };
      setTimeout(scrollToSection, 300);
    }
  }, [location]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How do I generate a question paper using AI?",
      answer:
        "Simply upload your syllabus or select from our templates, configure your requirements (number of questions, difficulty level, marks distribution), and our AI will generate a professional question paper within minutes.",
    },
    {
      question: "What formats can I download my question papers in?",
      answer:
        "You can download your question papers in PDF, Word (DOCX), or share them directly via email, WhatsApp, or Google Drive. All formats maintain professional formatting with your institution's branding.",
    },
    {
      question: "Can I customize the difficulty level and marks distribution?",
      answer:
        "Yes! You can set different difficulty levels (Easy, Medium, Hard) for each section, customize marks distribution, set time limits, and even configure unit-wise question allocation to match your syllabus perfectly.",
    },
    {
      question: "Is there a limit on how many question papers I can generate?",
      answer:
        "Our free plan allows up to 5 question papers per month. Premium plans offer unlimited generation, advanced customization options, priority support, and additional features like bulk generation and team collaboration.",
    },
    {
      question: "How accurate are the AI-generated questions?",
      answer:
        "Our AI is trained on extensive educational datasets and continuously improved. Questions are generated based on your specific syllabus and requirements. You can also review and edit any question before finalizing your paper.",
    },
    {
      question: "Can I save and reuse question paper templates?",
      answer:
        "Absolutely! You can save your custom configurations as templates, reuse previous question papers, and even share templates with colleagues. This saves time when creating similar papers in the future.",
    },
    {
      question: "Do you provide customer support for technical issues?",
      answer:
        "Yes, we offer comprehensive support through multiple channels - email, live chat, and our knowledge base. Premium users get priority support with faster response times and dedicated assistance.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 text-slate-900 hover:text-slate-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <img src="/vinathaal%20logo.png" alt="Vinathaal Logo" className="h-16 w-auto object-contain" />
            </div>
          </div>
        </div>
      </nav>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            How Can We <span className="bg-gradient-primary bg-clip-text text-transparent">Help You?</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-3">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Quick answers to common questions about QuestionCraft</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

<section className="py-24 bg-gradient-to-b from-background to-background/80">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-extrabold text-foreground mb-4 tracking-tight">
        Need Assistance?
      </h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Reach out to our team, and we’ll respond promptly to help you succeed.
      </p>
    </div>

    {/* Grid Layout */}
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Contact Info Card */}
      <div className="relative bg-gradient-card border border-border/10 shadow-lg rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl" />
        <div className="relative">
          <h3 className="flex items-center text-2xl font-semibold text-primary mb-4">
            <MessageCircle className="w-7 h-7 mr-3 text-accent" />
            Get in Touch
          </h3>
          <p className="text-muted-foreground mb-8">We’re here to support you every step of the way.</p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 group">
              <Mail className="w-6 h-6 text-accent transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="font-medium text-foreground">Email Support</p>
                <a
                  href="mailto:support@questioncraft.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  support@questioncraft.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4 group">
              <Phone className="w-6 h-6 text-accent transition-transform duration-300 group-hover:scale-110" />
              <div>
                <p className="font-medium text-foreground">Phone Support</p>
                <a
                  href="tel:+15551234567"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
            <div className="bg-accent/5 p-5 rounded-xl border border-accent/10">
              <p className="text-sm font-semibold text-accent">Response Time</p>
              <p className="text-sm text-muted-foreground">Expect a reply within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Card */}
      <div className="bg-gradient-card border border-border/10 shadow-lg rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <h3 className="text-2xl font-semibold text-primary mb-4">Send us a Message</h3>
        <p className="text-muted-foreground mb-6">Fill out the form, and we’ll get back to you soon.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className="bg-background/50 border-border/20 focus:ring-2 focus:ring-accent transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-background/50 border-border/20 focus:ring-2 focus:ring-accent transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What's this about?"
                      className="bg-background/50 border-border/20 focus:ring-2 focus:ring-accent transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us how we can help you..."
                      className="min-h-[140px] bg-background/50 border-border/20 focus:ring-2 focus:ring-accent transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90 font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending Message...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  </div>
</section>


      <Footer />
    </div>
  );
};

export default Support;