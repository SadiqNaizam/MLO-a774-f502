import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductShowcaseSection from '@/components/ProductShowcaseSection';
import FeatureHighlightCard from '@/components/FeatureHighlightCard';
import SpecsTable from '@/components/SpecsTable';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';

// Icons
import { Cpu, Sparkles, MonitorSmartphone, ArrowRight } from 'lucide-react';

const ProductOverviewPage: React.FC = () => {
  console.log('ProductOverviewPage loaded');

  const featureHighlights = [
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Blazing Fast Performance",
      description: "Powered by the latest generation processors and high-speed RAM for seamless multitasking and demanding applications.",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Exquisite Craftsmanship",
      description: "Precision-engineered aluminum unibody design that's both durable and stunningly beautiful, reflecting a premium aesthetic.",
    },
    {
      icon: <MonitorSmartphone className="h-8 w-8" />,
      title: "Immersive Retina-like Display",
      description: "Experience vibrant colors, deep blacks, and incredible detail on our high-resolution, edge-to-edge display.",
    },
  ];

  const keySpecs = [
    { id: 'proc', category: 'Performance', name: 'Processor', value: 'Next-Gen ARM-based Chip / Latest Intel Core Ultra' },
    { id: 'mem', category: 'Performance', name: 'Memory (RAM)', value: 'Up to 32GB Unified LPDDR5X RAM' },
    { id: 'ssd', category: 'Storage', name: 'SSD Storage', value: 'Up to 4TB PCIe Gen4 NVMe SSD' },
    { id: 'disp', category: 'Display', name: 'Display Type', value: '14.2-inch Liquid Retina XDR style (3024x1964)' },
    { id: 'ports', category: 'Connectivity', name: 'Ports', value: 'Thunderbolt 4 (x2), USB-C (x1), HDMI 2.1, SDXC Card Slot' },
    { id: 'os', category: 'Software', name: 'Operating System', value: 'Optimized Linux Distribution / Windows 11 Pro' },
    { id: 'battery', category: 'Power', name: 'Battery Life', value: 'Up to 18 hours video playback' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow pt-16"> {/* pt-16 for fixed header (h-16) */}
        
        <ProductShowcaseSection
          headline="MacClone: Elegance. Power. Redefined."
          description="Discover the new standard in premium laptops. Experience breathtaking performance, a stunning display, and an iconic design that inspires. The MacClone is engineered for those who demand excellence."
          backgroundImageUrl="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcCUyMGRhcmslMjBtaW5pbWFsfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=60"
          parallaxImage={true}
          primaryCta={{ text: "Configure & Buy", link: "/order", icon: <ShoppingCart className="h-4 w-4" /> }}
          secondaryCta={{ text: "View Gallery", link: "/gallery", variant: "outline" }}
          textColorClass="text-white"
          overlayColor="bg-black/60"
          heightClass="min-h-[85vh] md:min-h-screen"
          headlineTag="h1"
          textAlignment="items-center text-center"
          contentMaxWidth="max-w-4xl"
        />

        <section id="features" className="py-16 lg:py-24 bg-muted/30 dark:bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
                Why MacClone?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Crafted with meticulous attention to detail, the MacClone offers an unparalleled user experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureHighlights.map((feature) => (
                <FeatureHighlightCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                />
              ))}
            </div>
          </div>
        </section>
        
        <ProductShowcaseSection
          headline="Design That Inspires."
          description="A unibody enclosure crafted from a single block of aluminum. Thin, light, and remarkably strong. Every curve, every edge, perfected."
          backgroundImageUrl="https://images.unsplash.com/photo-1494496195158-c38651809495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wJTIwZGVzaWdufGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=60"
          textColorClass="text-gray-900 dark:text-gray-100"
          heightClass="min-h-[60vh] md:min-h-[70vh]"
          textAlignment="items-start text-left"
          contentMaxWidth="max-w-2xl"
        />

        <ProductShowcaseSection
          headline="Performance Beyond Limits."
          description="With our next-generation chipset, experience lightning-fast processing for everything from pro-level video editing to immersive gaming. All while maintaining incredible power efficiency."
          videoUrl="https://cdn.pixabay.com/video/2023/07/08/173690-843611779_large.mp4" // Placeholder tech/abstract video
          overlayColor="bg-black/50"
          textColorClass="text-white"
          heightClass="min-h-[60vh] md:min-h-[70vh]"
          textAlignment="items-end text-right"
          contentMaxWidth="max-w-2xl"
        />


        <section id="specs-summary" className="py-16 lg:py-24 bg-muted/30 dark:bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
             <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Key Specifications
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                A glimpse into the power and precision of the MacClone.
              </p>
            </div>
            <SpecsTable
              specs={keySpecs}
              // title="Key Specifications at a Glance"
              caption="This is a summary of key features. For a complete technical breakdown, please visit our full specifications page."
            />
            <div className="mt-12 text-center">
              <Link to="/specifications">
                <Button size="lg" variant="outline" className="group">
                  View Full Specifications
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="cta-final" className="py-16 lg:py-24 bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
              Ready to Experience the MacClone?
            </h2>
            <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">
              Customize your MacClone with the options that fit your needs and join the forefront of innovation.
            </p>
            <Link to="/order">
              <Button size="lg" variant="default" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg py-3 px-8 shadow-lg transform transition-transform hover:scale-105">
                Configure & Order Yours Today
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ProductOverviewPage;