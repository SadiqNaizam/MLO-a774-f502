import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  productPageLink: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 'macclone-pro-16',
    name: 'MacClone Pro 16-inch (M3 Chip, 16GB RAM, 512GB SSD)',
    imageUrl: 'https://via.placeholder.com/80x80.png?text=MacClone+Pro',
    price: 1499.00,
    quantity: 1,
    productPageLink: '/product-overview',
  },
  {
    id: 'usbc-hub-premium',
    name: 'Premium USB-C Hub (7-in-1)',
    imageUrl: 'https://via.placeholder.com/80x80.png?text=USB-C+Hub',
    price: 59.99,
    quantity: 1,
    productPageLink: '#', // Placeholder for accessory page
  },
];

const CartPage: React.FC = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [shippingCost] = useState<number>(15.00); // Example fixed shipping cost

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (cartItems.length > 0 ? shippingCost : 0);

  useEffect(() => {
    // This could be used to sync with a backend or localStorage in a real app
    console.log('Cart items updated:', cartItems);
  }, [cartItems]);

  return (
    <div className="min-h-screen flex flex-col bg-muted/40 dark:bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Your Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            Review your items and proceed to checkout. You have {cartItems.length} item(s) in your cart.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="flex flex-col items-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2 text-foreground">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild size="lg">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] hidden sm:table-cell pl-6">Image</TableHead>
                        <TableHead className="pl-4 sm:pl-0">Product</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-center w-[120px]">Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right pr-6">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden sm:table-cell pl-6">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                          </TableCell>
                          <TableCell className="font-medium pl-4 sm:pl-0">
                            <Link to={item.productPageLink} className="hover:text-primary transition-colors text-foreground">
                              {item.name}
                            </Link>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center text-foreground">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-semibold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => handleRemoveItem(item.id)}
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Card */}
            <div className="lg:col-span-1 sticky top-24"> {/* Sticky for summary on scroll */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-xl text-foreground">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button asChild size="lg" className="w-full">
                    <Link to="/order">Proceed to Checkout</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                     <Link to="/">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;