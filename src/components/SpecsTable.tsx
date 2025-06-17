import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SpecItem {
  id: string | number;
  category?: string; // Optional: For grouping specs
  name: string;
  value: string | number | React.ReactNode; // Value can be text, number, or even a React node for rich content
}

interface SpecsTableProps {
  specs: SpecItem[];
  title?: string;
  caption?: string;
}

const SpecsTable: React.FC<SpecsTableProps> = ({ specs, title, caption }) => {
  console.log('SpecsTable loaded');

  if (!specs || specs.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No specifications available.</p>
        </CardContent>
      </Card>
    );
  }

  // Group specs by category if category is present
  const groupedSpecs: { [key: string]: SpecItem[] } = specs.reduce((acc, spec) => {
    const category = spec.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(spec);
    return acc;
  }, {} as { [key: string]: SpecItem[] });

  const categories = Object.keys(groupedSpecs);

  return (
    <Card className="w-full shadow-lg">
      {title && (
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center md:text-left">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0 md:p-6">
        <div className="overflow-x-auto">
          {categories.map(category => (
            <div key={category} className="mb-8 last:mb-0">
              {categories.length > 1 && (
                <h3 className="text-xl font-medium mb-4 px-4 md:px-0 pt-4 md:pt-0 border-t md:border-t-0 first:pt-0 first:border-t-0">
                  {category}
                </h3>
              )}
              <Table className="min-w-full">
                {caption && categories.length === 1 && <caption className="mt-4 text-sm text-muted-foreground">{caption}</caption>}
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/60">
                    <TableHead className="w-2/5 md:w-1/3 font-bold text-foreground pl-4 pr-2 md:pl-6">Specification</TableHead>
                    <TableHead className="font-bold text-foreground pl-2 pr-4 md:pr-6">Detail</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedSpecs[category].map((spec, index) => (
                    <TableRow
                      key={spec.id}
                      className={`border-b transition-colors ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'} hover:bg-muted/50`}
                    >
                      <TableCell className="font-medium py-3 pl-4 pr-2 md:pl-6">{spec.name}</TableCell>
                      <TableCell className="py-3 pl-2 pr-4 md:pr-6">{spec.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
         {caption && categories.length > 1 && <p className="mt-4 text-sm text-muted-foreground px-4 md:px-0">{caption}</p>}
      </CardContent>
    </Card>
  );
};

export default SpecsTable;