import { Link } from "react-router-dom";
import { ArrowRight, Zap, Users, Palette, Eye, Sparkles, BarChart3, ClipboardCheck, Star, Twitter } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { usePortfolioList } from "@/hooks/usePortfolio";
import { useBlogList } from "@/hooks/useBlog";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import BlogCard from "@/components/blog/BlogCard";
import LoadingSkeleton from "@/components/ui/loading-skeleton";
import ProcessSlider from "@/components/ProcessSlider";
import PricingPlans from "@/components/PricingPlans";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HeroContent, HeroItem, FadeUp, FadeScale, SectionHeader, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { TypingHeading } from "@/components/ui/typing-heading";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import heroBg from "@/assets/hero-bg.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
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
const Index = () => {
  const {
    data: portfolio,
    isLoading: portfolioLoading
  } = usePortfolioList();
  const {
    data: blog,
    isLoading: blogLoading
  } = useBlogList();
  const featuredPortfolio = portfolio?.slice(0, 4) || [];
  const featuredBlog = blog?.slice(0, 3) || [];
  return <Layout hasHero>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${heroBg})`
      }} />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        
        {/* Content */}
        <div className="container relative z-10 text-center">
          <HeroContent className="flex flex-col gap-[15px] max-w-5xl mx-auto items-center">
            {/* Text Group */}
            <div className="flex flex-col gap-[10px]">
              <HeroItem>
                <p className="text-sm font-medium tracking-[0.3em] uppercase text-white/70">Open to Opportunities</p>
              </HeroItem>
              <HeroItem>
                <TypingHeading />
              </HeroItem>
              <HeroItem>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">Creating engaging brand experiences.</p>
              </HeroItem>
            </div>
            {/* Button */}
            <HeroItem>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 hover:gap-4 px-8 py-3.5">
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
            </HeroItem>
            {/* Trust Badge */}
            <HeroItem>
              <div className="inline-flex items-center gap-2 mt-[25px]">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-white/80" />
                  <Star className="w-4 h-4 text-white/80" />
                  <Star className="w-4 h-4 text-white/80" />
                  <Star className="w-4 h-4 text-white/80" />
                </div>
                <span className="text-xs md:text-sm font-normal text-white/90">Helped over 100+ businesses</span>
              </div>
            </HeroItem>
          </HeroContent>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="py-24 md:py-32">
        <div className="container">
          <FadeUp>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Selected Work
                </p>
                <h2 className="text-3xl md:text-4xl tracking-tight font-normal">
                  Portfolio
                </h2>
              </div>
              <Link to="/portfolio" className="editorial-link text-sm font-medium tracking-wide uppercase">
                View All
              </Link>
            </div>
          </FadeUp>

          {portfolioLoading ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => <LoadingSkeleton key={i} variant="card" />)}
            </div> : featuredPortfolio.length > 0 ? <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPortfolio.map(project => <StaggerItem key={project.id}>
                  <PortfolioCard project={project} />
                </StaggerItem>)}
            </StaggerContainer> : <div className="text-center py-20 text-muted-foreground">
              <p>No portfolio items yet. Add some in Lovable Cloud.</p>
            </div>}
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container">
          {/* Section Header */}
          <SectionHeader className="text-center mb-16">
            {/* Lightning Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-8">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-white/60 mb-4">
              Why Us
            </p>
            <h2 className="text-4xl md:text-5xl tracking-tight mb-6 font-normal lg:text-4xl">
              Why Partner With Us
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              See why we're the leading choice for brand innovation.
            </p>
          </SectionHeader>

          {/* Features Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Seamless Collaboration */}
            <StaggerItem>
              <div className="group p-8 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                  Collaboration
                </span>
                <h3 className="text-xl mb-3 font-normal">Seamless Collaboration</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Delivered 50+ projects driving tangible results for companies
                </p>
              </div>
            </StaggerItem>

            {/* Design Solutions */}
            <StaggerItem>
              <div className="group p-8 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                  Design
                </span>
                <h3 className="text-xl mb-3 font-normal">Design Solutions</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Improved 30+ user experiences for satisfaction.
                </p>
              </div>
            </StaggerItem>

            {/* Boosted Brand Visibility */}
            <StaggerItem>
              <div className="group p-8 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                  Visibility
                </span>
                <h3 className="text-xl mb-3 font-normal">Boosted Brand Visibility</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  95% customer satisfaction rate
                </p>
              </div>
            </StaggerItem>

            {/* Brand Impact */}
            <StaggerItem>
              <div className="group p-8 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                  Impact
                </span>
                <h3 className="text-xl mb-3 font-normal">Brand Impact</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Creating memorable brand experiences that resonate with audiences
                </p>
              </div>
            </StaggerItem>

            {/* Data-Driven Insights */}
            <StaggerItem>
              <div className="group p-8 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                  Data
                </span>
                <h3 className="text-xl mb-3 font-normal">Data-Driven Insights</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Analyzed user behavior for a 25% engagement boost.
                </p>
              </div>
            </StaggerItem>

            {/* Agile Management */}
            <StaggerItem>
              <div className="group p-8 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                  Management
                </span>
                <h3 className="text-xl mb-3 font-normal">Agile Management</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Led teams to achieve milestones early.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <PricingPlans />

      {/* Our Process Section - Premium Slider */}
      <ProcessSlider />

      {/* Blog Section */}
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container">
          <FadeUp>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Insights & Stories
                </p>
                <h2 className="text-3xl md:text-4xl tracking-tight font-normal">
                  Our Inshights
                </h2>
              </div>
              <Link to="/blog" className="editorial-link text-sm font-medium tracking-wide uppercase">
                Read All
              </Link>
            </div>
          </FadeUp>

          {blogLoading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <div key={i} className="animate-pulse">
                  <div className="h-[260px] bg-muted rounded-t-3xl" />
                  <div className="p-5 space-y-3 bg-card rounded-b-3xl">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="flex justify-between">
                      <div className="h-4 bg-muted rounded w-1/4" />
                      <div className="h-6 bg-muted rounded-full w-16" />
                    </div>
                  </div>
                </div>)}
            </div> : featuredBlog.length > 0 ? <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBlog.map(post => <StaggerItem key={post.id}>
                  <BlogCard post={post} />
                </StaggerItem>)}
            </StaggerContainer> : <div className="text-center py-20 text-muted-foreground">
              <p>No blog posts yet. Add some in Lovable Cloud.</p>
            </div>}
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Booking Section */}
      <BookingSection />

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
            <FadeUp delay={0.2}>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50 py-2">
                    <AccordionTrigger className="text-left text-lg font-medium hover:no-underline group py-6">
                      <span className="flex items-center gap-4">
                        <span className="text-sm font-bold text-muted-foreground/50">
                          0{index + 1}
                        </span>
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pl-10">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>)}
              </Accordion>
            </FadeUp>

            {/* Optional CTA */}
            <FadeUp delay={0.3}>
              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">Still have questions?</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-foreground font-medium editorial-link">
                  Get in touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container">
          {/* Section Header */}
          <SectionHeader className="flex flex-col gap-4 mb-16 md:mb-20 max-w-2xl mx-auto text-center items-center">
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
              Our Team
            </span>
            <h2 className="text-3xl tracking-tight font-normal md:text-4xl">
              Trust our experienced experts.
            </h2>
            <p className="text-lg text-muted-foreground">
              Experts who turn ideas into meaningful experiences.
            </p>
          </SectionHeader>

          {/* Team Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Team Member 1 */}
            <StaggerItem>
              <div className="group">
                <FadeScale>
                  <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                    <img alt="Sarah A." className="w-full h-full object-cover object-center grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" loading="lazy" src="/lovable-uploads/20bc3d0f-ef7c-4de6-a8d0-34926502f6e3.jpg" />
                    <div className="absolute top-4 left-4">
                      <span className="text-4xl font-bold text-white/30">01</span>
                    </div>
                  </div>
                </FadeScale>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl tracking-tight font-medium">Sarah A.</h3>
                    <p className="text-muted-foreground">@Developers</p>
                  </div>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </StaggerItem>

            {/* Team Member 2 */}
            <StaggerItem>
              <div className="group">
                <FadeScale>
                  <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                    <img alt="Afgan A." className="w-full h-full object-cover object-center grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" loading="lazy" src="/lovable-uploads/8dbfa6fe-f942-4296-a3c5-19f19580617d.jpg" />
                    <div className="absolute top-4 left-4">
                      <span className="text-4xl font-bold text-white/30">02</span>
                    </div>
                  </div>
                </FadeScale>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl tracking-tight font-medium">Afgan A.</h3>
                    <p className="text-muted-foreground">@UI/UX</p>
                  </div>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </StaggerItem>

            {/* Team Member 3 */}
            <StaggerItem>
              <div className="group">
                <FadeScale>
                  <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                    <img alt="Leo B." className="w-full h-full object-cover object-center grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" loading="lazy" src="/lovable-uploads/6ba56bd3-4066-4e49-8ef5-001dd961fa11.jpg" />
                    <div className="absolute top-4 left-4">
                      <span className="text-4xl font-bold text-white/30">03</span>
                    </div>
                  </div>
                </FadeScale>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl tracking-tight font-medium">Leo B.</h3>
                    <p className="text-muted-foreground">@Creators</p>
                  </div>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-secondary/20">
        <div className="container">
          <FadeUp className="flex flex-col gap-[15px] max-w-3xl mx-auto text-center items-center">
            <span className="inline-block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground px-4 py-2 rounded-full bg-secondary">
              Let's Talk
            </span>
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-3xl tracking-tight text-balance font-normal md:text-4xl">
                Ready to bring your vision to life?
              </h2>
              <p className="text-lg text-muted-foreground">
                Let's create something extraordinary together.
              </p>
            </div>
            <a href="mailto:hello@atelier.studio" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all duration-300 hover:gap-4">
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </a>
          </FadeUp>
        </div>
      </section>
    </Layout>;
};
export default Index;