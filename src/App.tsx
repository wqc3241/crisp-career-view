import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import CinelyAI from "./pages/sideprojects/CinelyAI";
import Talkify from "./pages/sideprojects/Talkify";
import MedicalBillRCM from "./pages/sideprojects/MedicalBillRCM";
import ConstructionEstimator from "./pages/sideprojects/ConstructionEstimator";
import NLPBrochure from "./pages/sideprojects/NLPBrochure";
import LucidMotors from "./pages/career/LucidMotors";
import Bluesnap from "./pages/career/Bluesnap";
import HarmonyPlus from "./pages/career/HarmonyPlus";
import VortexAutogroup from "./pages/career/VortexAutogroup";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/products/cinely-ai" element={<CinelyAI />} />
              <Route path="/products/talkify" element={<Talkify />} />
              <Route path="/products/medical-bill-rcm" element={<MedicalBillRCM />} />
              <Route path="/products/construction-estimator" element={<ConstructionEstimator />} />
              <Route path="/products/nlp-brochure" element={<NLPBrochure />} />
              <Route path="/career/lucid-motors" element={<LucidMotors />} />
              <Route path="/career/bluesnap" element={<Bluesnap />} />
              <Route path="/career/harmony-plus" element={<HarmonyPlus />} />
              <Route path="/career/vortex-autogroup" element={<VortexAutogroup />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
