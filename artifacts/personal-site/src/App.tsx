import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const buttonTexts = [
  "Get in Touch",
  "Say Hello",
  "Let's Talk",
  "Reach Out"
];

function Home() {
  const [buttonIndex, setButtonIndex] = useState(0);

  const handleCycleText = () => {
    setButtonIndex((prev) => (prev + 1) % buttonTexts.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground selection:bg-primary/30 font-sans flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto px-6 py-24 flex flex-col items-center w-full space-y-40">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-10 mt-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white max-w-3xl">
              Designing with intent.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed font-light">
              Crafting calm, focused digital experiences. Less noise, more clarity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          >
            <button
              onClick={handleCycleText}
              className="mt-6 px-10 py-4 bg-primary text-primary-foreground text-base font-medium rounded-2xl hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer overflow-hidden relative"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={buttonIndex}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="block whitespace-nowrap"
                >
                  {buttonTexts[buttonIndex]}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>
        </section>

        {/* Products Section */}
        <motion.section 
          className="w-full flex flex-col items-center space-y-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight">What I've Built</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              "Dashboard Cheetah",
              "300 million dollar shipment",
              "Hyundai elantra"
            ].map((productName, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="group flex flex-col p-5 bg-card rounded-3xl border border-card-border hover:border-primary/50 transition-colors duration-500 cursor-default"
              >
                <div className="w-full aspect-[4/3] bg-muted/40 rounded-2xl border border-border/50 flex items-center justify-center overflow-hidden mb-6 group-hover:bg-muted/60 transition-colors duration-500">
                  <span className="text-muted-foreground text-sm font-medium tracking-wide">Add your image</span>
                </div>
                <div className="space-y-3 px-1 pb-2">
                  <h3 className="text-xl font-medium text-white tracking-tight">{productName}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    A subtle description of this product goes here, detailing its core value.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="w-full py-12 text-center text-muted-foreground text-sm font-light">
        <p>Built with intent. © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
