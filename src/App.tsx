import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PresentationPage from "./pages/PresentationPage.tsx";
import OfferStartPage from "./pages/offres/OfferStartPage.tsx";
import OfferRisePage from "./pages/offres/OfferRisePage.tsx";
import OfferJeunesPage from "./pages/offres/OfferJeunesPage.tsx";
import OfferPersonnalisePage from "./pages/offres/OfferPersonnalisePage.tsx";
import EquipePage from "./pages/qui-sommes-nous/EquipePage.tsx";
import PartenairesPage from "./pages/qui-sommes-nous/PartenairesPage.tsx";
import ContactPage from "./pages/contact/ContactPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/qui-sommes-nous/presentation" element={<PresentationPage />} />
          <Route path="/presentation" element={<Navigate to="/qui-sommes-nous/presentation" replace />} />
          <Route path="/offres/start" element={<OfferStartPage />} />
          <Route path="/offres/rise" element={<OfferRisePage />} />
          <Route path="/offres/jeunes" element={<OfferJeunesPage />} />
          <Route path="/offres/personnalise" element={<OfferPersonnalisePage />} />
          <Route path="/qui-sommes-nous/equipe" element={<EquipePage />} />
          <Route path="/qui-sommes-nous/partenaires" element={<PartenairesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact/prise-de-contact" element={<Navigate to="/contact" replace />} />
          <Route path="/contact/recrutement" element={<Navigate to="/contact?objet=candidature" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
