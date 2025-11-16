import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CinelyAI from "./pages/CinelyAI";
import Talkify from "./pages/Talkify";
import MedicalBillRCM from "./pages/MedicalBillRCM";
import ConstructionEstimator from "./pages/ConstructionEstimator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products/cinely-ai" element={<CinelyAI />} />
          <Route path="/products/talkify" element={<Talkify />} />
          <Route path="/products/medical-bill-rcm" element={<MedicalBillRCM />} />
          <Route path="/products/construction-estimator" element={<ConstructionEstimator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
