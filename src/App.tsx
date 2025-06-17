import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import CartPage from "./pages/CartPage";
import GalleryPage from "./pages/GalleryPage";
import Homepage from "./pages/Homepage";
import OrderPage from "./pages/OrderPage";
import ProductOverviewPage from "./pages/ProductOverviewPage";
import SpecificationsPage from "./pages/SpecificationsPage";
import SupportPage from "./pages/SupportPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/product-overview" element={<ProductOverviewPage />} />
          <Route path="/specifications" element={<SpecificationsPage />} />
          <Route path="/support" element={<SupportPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
