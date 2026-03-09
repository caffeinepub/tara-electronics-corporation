import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { useActor } from "./hooks/useActor";
import { AboutPage } from "./pages/AboutPage";
import { AdminPage } from "./pages/AdminPage";
import { CartPage } from "./pages/CartPage";
import { CategoryPage } from "./pages/CategoryPage";
import { ConsumerElectronicsPage } from "./pages/ConsumerElectronicsPage";
import { ContactPage } from "./pages/ContactPage";
import { CustomisationPage } from "./pages/CustomisationPage";
import { HomePage } from "./pages/HomePage";
import { LaserEngravingPage } from "./pages/LaserEngravingPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ThreeDPrintingPage } from "./pages/ThreeDPrintingPage";

function RootLayout() {
  const { actor } = useActor();

  useEffect(() => {
    if (actor) {
      actor.initSampleProducts().catch(() => {
        // Silently ignore errors
      });
    }
  }, [actor]);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
      <Toaster richColors position="top-right" />
    </CartProvider>
  );
}

// Define routes
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/category/$categoryId",
  component: CategoryPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$productId",
  component: ProductDetailPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const electronicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/electronics",
  component: ConsumerElectronicsPage,
});

const laserEngravingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/laser-engraving",
  component: LaserEngravingPage,
});

const threeDPrintingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/3d-printing",
  component: ThreeDPrintingPage,
});

const customisationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customisation",
  component: CustomisationPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  categoryRoute,
  productRoute,
  cartRoute,
  aboutRoute,
  contactRoute,
  adminRoute,
  electronicsRoute,
  laserEngravingRoute,
  threeDPrintingRoute,
  customisationRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
