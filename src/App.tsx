import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ContactPage from "./pages/contact/ContactPage.tsx";
import QuiSommesNousPage from "./pages/QuiSommesNousPage.tsx";
import OffresPage from "./pages/OffresPage.tsx";
import MentionsLegalesPage from "./pages/MentionsLegalesPage.tsx";
import AdminLoginPage from "./admin/AdminLoginPage.tsx";
import AdminLayout, { RequireAuth } from "./admin/AdminLayout.tsx";
import AdminSectorReferencesPage from "./admin/AdminSectorReferencesPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/qui-sommes-nous" element={<QuiSommesNousPage />} />
          <Route path="/offres" element={<OffresPage />} />
          <Route path="/presentation" element={<Navigate to="/qui-sommes-nous#presentation" replace />} />
          <Route path="/qui-sommes-nous/presentation" element={<Navigate to="/qui-sommes-nous#presentation" replace />} />
          <Route path="/qui-sommes-nous/equipe" element={<Navigate to="/qui-sommes-nous#equipe" replace />} />
          <Route path="/qui-sommes-nous/partenaires" element={<Navigate to="/qui-sommes-nous" replace />} />
          <Route path="/offres/start" element={<Navigate to="/offres#start" replace />} />
          <Route path="/offres/rise" element={<Navigate to="/offres#rise" replace />} />
          <Route path="/offres/jeunes" element={<Navigate to="/offres#etudes-personnalisees" replace />} />
          <Route path="/offres/personnalise" element={<Navigate to="/offres#recherche-financements" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact/prise-de-contact" element={<Navigate to="/contact" replace />} />
          <Route path="/contact/recrutement" element={<Navigate to="/contact?objet=stage-cv" replace />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<RequireAuth />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/sector-references" replace />} />
              <Route path="sector-references" element={<AdminSectorReferencesPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
