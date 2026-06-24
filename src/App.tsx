import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import SmoothScroller from "./components/layout/SmoothScroller";
import CursorFollower from "./components/effects/CursorFollower";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import ScrollToTop from "./components/layout/ScrollToTop";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <SmoothScroller />
      <CursorFollower />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
          <AppRoutes />
        </main>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;