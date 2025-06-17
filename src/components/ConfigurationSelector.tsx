import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Local cn utility function as we cannot modify src/lib/utils.ts
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface OptionChoice {
  value: string;
  label: string;
  priceModifier?: number; // Additive to base price
  imageUrl?: string; // Specific image for this choice, e.g., a color swatch or specific configuration image
}

interface OptionGroup {
  id: string; // e.g., 'ram', 'ssd', 'color'
  name: string; // Display name, e.g., "Select RAM", "Choose Storage"
  options: OptionChoice[];
  defaultOption?: string; // value of the default option for this group
}

interface ConfigurationSelectorProps {
  optionGroups: OptionGroup[];
  basePrice: number;
  onConfigurationChange: (
    selectedOptions: Record<string, string>, // e.g., { ram: '8gb', ssd: '256gb', color: 'silver' }
    totalPrice: number,
    selectedImage?: string // An image URL primarily from a color selection or other visually distinct option
  ) => void;
  className?: string;
}

const ConfigurationSelector: React.FC<ConfigurationSelectorProps> = ({
  optionGroups,
  basePrice,
  onConfigurationChange,
  className,
}) => {
  console.log('ConfigurationSelector loaded');

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initialSelections: Record<string, string> = {};
    optionGroups.forEach(group => {
      initialSelections[group.id] = group.defaultOption ?? (group.options.length > 0 ? group.options[0].value : '');
    });
    return initialSelections;
  });

  // This useEffect hook calculates the total price and determines a primary image
  // based on selections. It then calls `onConfigurationChange` to inform the parent.
  useEffect(() => {
    let calculatedPrice = basePrice;
    let primaryImageUrlFromSelection: string | undefined = undefined;

    optionGroups.forEach(group => {
      const selectedValue = selectedOptions[group.id];
      const chosenOption = group.options.find(opt => opt.value === selectedValue);
      if (chosenOption) {
        calculatedPrice += chosenOption.priceModifier ?? 0;
        // Logic to pick an image: typically, color options might define an image.
        // If multiple options could define images, a more specific rule might be needed.
        // Here, we'll just pick one if available.
        if (chosenOption.imageUrl) {
          primaryImageUrlFromSelection = chosenOption.imageUrl;
        }
      }
    });
    
    // If no specific option image, check if there's an image for the color choice specifically.
    // This assumes 'color' is a common group ID for images.
    const colorGroup = optionGroups.find(g => g.id.toLowerCase() === 'color');
    if (colorGroup) {
        const selectedColorValue = selectedOptions[colorGroup.id];
        const chosenColorOption = colorGroup.options.find(opt => opt.value === selectedColorValue);
        if (chosenColorOption?.imageUrl) {
            primaryImageUrlFromSelection = chosenColorOption.imageUrl;
        }
    }


    onConfigurationChange(selectedOptions, calculatedPrice, primaryImageUrlFromSelection);
  }, [selectedOptions, optionGroups, basePrice, onConfigurationChange]);
  
  // Memoized handler for changing a selection in an option group.
  const handleOptionChange = useCallback((groupId: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [groupId]: value,
    }));
  }, []);

  // Calculate total price separately for display within this component
  const calculateDisplayPrice = () => {
    let price = basePrice;
    optionGroups.forEach(group => {
      const selectedValue = selectedOptions[group.id];
      const chosenOption = group.options.find(opt => opt.value === selectedValue);
      if (chosenOption) {
        price += chosenOption.priceModifier ?? 0;
      }
    });
    return price;
  };
  const displayTotalPrice = calculateDisplayPrice();

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Configure Your Laptop</CardTitle>
        <CardDescription>Select your desired options. The price will update automatically.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {optionGroups.map((group) => (
          <div key={group.id} className="space-y-3">
            <Label htmlFor={group.id} className="text-base font-medium">{group.name}</Label>
            <RadioGroup
              id={group.id}
              value={selectedOptions[group.id]}
              onValueChange={(value) => handleOptionChange(group.id, value)}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
            >
              {group.options.map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`${group.id}-${option.value}`}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors",
                    selectedOptions[group.id] === option.value && "border-primary ring-2 ring-primary ring-offset-2"
                  )}
                  title={option.label + (option.priceModifier ? (option.priceModifier > 0 ? ` (+$${option.priceModifier.toFixed(2)})` : ` (-$${Math.abs(option.priceModifier).toFixed(2)})`) : '')}
                >
                  <RadioGroupItem value={option.value} id={`${group.id}-${option.value}`} className="sr-only" />
                  <span className="font-semibold text-center">{option.label}</span>
                  {option.priceModifier !== undefined && option.priceModifier !== 0 && (
                    <span className="text-xs text-muted-foreground">
                      {option.priceModifier > 0 ? `+$${option.priceModifier.toFixed(2)}` : `-$${Math.abs(option.priceModifier).toFixed(2)}`}
                    </span>
                  )}
                </Label>
              ))}
            </RadioGroup>
          </div>
        ))}
        <Separator className="my-6" />
        <div className="flex flex-col items-end space-y-1">
          <p className="text-sm text-muted-foreground">Total Price</p>
          <p className="text-3xl font-bold text-primary">${displayTotalPrice.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigurationSelector;