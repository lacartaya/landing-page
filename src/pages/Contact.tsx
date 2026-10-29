import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Send, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HeroContent, HeroItem, FadeUp, SectionHeader } from "@/components/ui/scroll-animation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { PricingState } from "@/components/PricingPlans";

interface LocationState {
  pricing?: PricingState;
}

const faqItems = [{
  question: "How long does a project take?",
  answer: "Most projects take between 4–6 weeks, depending on scope, complexity, and feedback cycles. A detailed timeline is shared before we begin."
}, {
  question: "How long does it take?",
  answer: "Timelines vary based on project needs. Smaller engagements may take 2–3 weeks, while larger brand or web projects can take longer."
}, {
  question: "Do you offer revisions?",
  answer: "Yes. We include multiple revision rounds to ensure the final result aligns perfectly with your vision and expectations."
}];

interface SubmitContactResponse {
  success?: boolean;
  error?: string;
  errors?: Record<string, string>;
  remaining?: number;
}

const Contact = () => {
  const { toast } = useToast();
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const pricingData = locationState?.pricing;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot field - should remain empty
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill subject and message when coming from pricing
  useEffect(() => {
    if (pricingData) {
      const billingLabel = pricingData.billingType === "annual" ? "Annual" : "Monthly";
      setFormData(prev => ({
        ...prev,
        subject: `${pricingData.planName} Plan Inquiry`,
        message: `I'm interested in the ${pricingData.planName} plan.\n\nSelected options:\n• Billing: ${billingLabel}\n• Team size: ${pricingData.teamSize} member${pricingData.teamSize > 1 ? "s" : ""}\n• Price: $${pricingData.price.toFixed(0)}/month\n\nPlease send me more information.`,
      }));
    }
  }, [pricingData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Use edge function with rate limiting and server-side validation
      const { data, error } = await supabase.functions.invoke<SubmitContactResponse>('submit-contact', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          website: formData.website, // Honeypot field
        },
      });

      setIsSubmitting(false);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Handle rate limiting
      if (data?.error === 'Too many requests. Please try again later.') {
        toast({
          title: "Too Many Requests",
          description: "You've reached the limit. Please try again in an hour.",
          variant: "destructive",
        });
        return;
      }

      // Handle validation errors from server
      if (data?.errors) {
        setErrors(data.errors);
        toast({
          title: "Validation Error",
          description: "Please check the form and try again.",
          variant: "destructive",
        });
        return;
      }

      if (data?.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      setIsSubmitted(true);
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
    } catch {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@atelier.studio", href: "mailto:hello@atelier.studio" },
    { icon: Phone, label: "WhatsApp", value: "+1 (555) 123-4567", href: "https://wa.me/15551234567" },
    { icon: MapPin, label: "Location", value: "New York, NY", href: null },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Twitter, label: "X / Twitter", href: "https://x.com" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
        <div className="container relative z-10 text-center">
          <HeroContent className="flex flex-col items-center">
            <HeroItem>
              <p className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">
                Get in Touch
              </p>
            </HeroItem>
            <HeroItem>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Let's Talk
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
                Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </HeroItem>
          </HeroContent>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <FadeUp>
              <h2 className="text-2xl font-bold tracking-tight mb-8">
                Send a Message
              </h2>

              {/* Pricing Summary Card */}
              {pricingData && !isSubmitted && (
                <div className="mb-8 p-6 bg-secondary/50 rounded-2xl border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Selected plan</span>
                    <span className="text-sm font-medium px-3 py-1 bg-primary text-primary-foreground rounded-full">
                      {pricingData.planName}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-light">${pricingData.price.toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">/month</p>
                    </div>
                    <div>
                      <p className="text-2xl font-light">{pricingData.teamSize}</p>
                      <p className="text-xs text-muted-foreground">team {pricingData.teamSize === 1 ? "member" : "members"}</p>
                    </div>
                    <div>
                      <p className="text-2xl font-light capitalize">{pricingData.billingType}</p>
                      <p className="text-xs text-muted-foreground">billing</p>
                    </div>
                  </div>
                </div>
              )}

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-secondary/30 rounded-3xl">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out. We'll get back to you within 24-48 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 rounded-full"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                  {/* Honeypot field - hidden from users, bots will fill it */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={200}
                        className={`rounded-xl h-12 ${errors.name ? "border-destructive" : ""}`}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        maxLength={254}
                        className={`rounded-xl h-12 ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject / Project Type
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="e.g., Editorial Shoot, Portrait Session"
                      value={formData.subject}
                      onChange={handleChange}
                      maxLength={500}
                      className={`rounded-xl h-12 ${errors.subject ? "border-destructive" : ""}`}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={10000}
                      className={`rounded-xl resize-none ${errors.message ? "border-destructive" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto rounded-full px-10 h-12 gap-2"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </FadeUp>

            {/* Contact Information */}
            <FadeUp delay={0.1}>
              <h2 className="text-2xl font-bold tracking-tight mb-8">
                Contact Information
              </h2>

              <div className="space-y-6 mb-12">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-accent transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6">Follow Us</h3>
                <div className="flex items-center gap-3">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-2xl border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-transparent transition-all duration-300"
                      aria-label={item.label}
                    >
                      <item.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Decorative element */}
              <div className="mt-16 p-8 bg-secondary/30 rounded-3xl">
                <p className="text-sm text-muted-foreground mb-2">Response Time</p>
                <p className="text-2xl font-bold">24-48 Hours</p>
                <p className="text-muted-foreground mt-2">
                  We aim to respond to all inquiries within two business days.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Section Header */}
            <SectionHeader className="text-center mb-16">
              <p className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4">
                FAQ
              </p>
              <h2 className="text-4xl tracking-tight mb-6 font-normal md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Find solutions to your queries and learn how we can help elevate your brand.
              </p>
            </SectionHeader>

            {/* Accordion */}
            <FadeUp>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50 py-2">
                    <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeUp>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
