import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CtaButton {
  text: string;
  link?: string; // For react-router Link
  action?: () => void; // For onClick action
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  icon?: React.ReactNode; // Optional icon e.g. <MyIcon className="h-4 w-4" />
  className?: string; // Allow additional classes for the button
}

type HeadlineTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface ProductShowcaseSectionProps {
  backgroundImageUrl?: string;
  videoUrl?: string;
  parallaxImage?: boolean; // If true and backgroundImageUrl is set, uses 'bg-fixed'
  headline: string;
  headlineTag?: HeadlineTag;
  description: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
  textAlignment?: 'items-start text-left' | 'items-center text-center' | 'items-end text-right'; // Controls alignment of the content block and text within it
  contentMaxWidth?: string; // Max width of the text content block, e.g., 'max-w-3xl'
  textColorClass?: string; // Tailwind class for text color, e.g., 'text-white' or 'text-gray-900'
  overlayColor?: string; // Tailwind class for a semi-transparent overlay, e.g., 'bg-black/50'
  heightClass?: string; // Tailwind class for component height, e.g., 'min-h-screen', 'h-[75vh]'
}

const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  backgroundImageUrl,
  videoUrl,
  parallaxImage = false,
  headline,
  headlineTag = 'h2',
  description,
  primaryCta,
  secondaryCta,
  textAlignment = 'items-center text-center',
  contentMaxWidth = 'max-w-3xl',
  textColorClass = 'text-white',
  overlayColor,
  heightClass = 'min-h-[70vh] md:min-h-[80vh]',
}) => {
  console.log('ProductShowcaseSection loaded for headline:', headline);

  const HeadlineElement = headlineTag;

  const renderCta = (cta?: CtaButton, isPrimary = true) => {
    if (!cta) return null;

    const buttonContent = (
      <>
        {cta.icon && <span className="mr-2 h-5 w-5 flex items-center justify-center">{cta.icon}</span>}
        {cta.text}
      </>
    );

    const buttonVariant = cta.variant || (isPrimary ? 'default' : 'outline');
    
    let specificStylingClasses = "";
    // Special handling for outline button based on background contrast
    if (buttonVariant === 'outline' && !isPrimary) {
      if (textColorClass === 'text-white') { // Dark background, light text
        specificStylingClasses = "border-white text-white hover:bg-white/10 hover:text-white";
      } else { // Light background, dark text
        specificStylingClasses = "border-primary text-primary hover:bg-primary/10 hover:text-primary";
      }
    }
    // Primary buttons often use 'default' variant which has its own primary color styling
    // If a specific variant like 'secondary' or 'ghost' is passed, it will use its standard shadcn style.

    const effectiveClassName = cn(
      "transform transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      specificStylingClasses,
      cta.className // Allow user to pass further custom classes
    );
    
    const commonButtonProps = {
      variant: buttonVariant,
      size: "lg" as const,
      className: effectiveClassName,
    };

    if (cta.link) {
      // Ensure external links open in a new tab
      const isExternal = cta.link.startsWith('http://') || cta.link.startsWith('https://');
      if (isExternal) {
        return (
          <Button {...commonButtonProps} asChild>
            <a href={cta.link} target="_blank" rel="noopener noreferrer">
              {buttonContent}
            </a>
          </Button>
        );
      }
      // Internal link
      return (
        <Button {...commonButtonProps} asChild>
          <Link to={cta.link}>{buttonContent}</Link>
        </Button>
      );
    }

    if (cta.action) {
      return (
        <Button {...commonButtonProps} onClick={cta.action}>
          {buttonContent}
        </Button>
      );
    }
    return null;
  };

  return (
    <section className={cn('relative w-full flex overflow-hidden', heightClass)}>
      {/* Background Layer */}
      {videoUrl ? (
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
          aria-hidden="true"
        />
      ) : backgroundImageUrl && (
        <div
          className={cn(
            "absolute inset-0 w-full h-full bg-cover bg-center -z-10",
            parallaxImage && "bg-fixed"
          )}
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          role="img"
          aria-label={headline || "Background image"}
        />
      )}

      {/* Overlay Layer for contrast (optional) */}
      {overlayColor && (
        <div className={cn('absolute inset-0 w-full h-full z-0', overlayColor)} aria-hidden="true" />
      )}

      {/* Content Layer */}
      <div className={cn(
        'relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-12 md:py-20',
        textAlignment.split(' ')[0], // This applies items-* (e.g. items-center)
        textColorClass
      )}>
        <div className={cn(
          'space-y-6 md:space-y-8',
          contentMaxWidth,
          textAlignment.split(' ')[1] // This applies text-* (e.g. text-center)
        )}>
          <HeadlineElement className={cn(
            "font-extrabold tracking-tight",
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" // Responsive heading sizes
          )}>
            {headline}
          </HeadlineElement>
          <p className={cn(
            "opacity-90",
            "text-lg sm:text-xl md:text-2xl" // Responsive paragraph sizes
          )}>
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className={cn(
                "flex flex-col gap-3 pt-4 sm:flex-row",
                textAlignment.includes('items-center') ? 'sm:justify-center' : 
                textAlignment.includes('items-start') ? 'sm:justify-start' : 
                'sm:justify-end'
            )}>
              {renderCta(primaryCta, true)}
              {renderCta(secondaryCta, false)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;