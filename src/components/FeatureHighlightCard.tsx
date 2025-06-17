import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureHighlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureHighlightCard: React.FC<FeatureHighlightCardProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  console.log('FeatureHighlightCard loaded for:', title);

  return (
    <Card className={`w-full h-full flex flex-col ${className || ''}`}>
      <CardHeader className="items-center pt-6">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center flex-grow pb-6 px-4">
        <CardTitle className="text-lg font-semibold mb-2">{title}</CardTitle>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureHighlightCard;