import { useState, useEffect, useRef } from "react";
import cheetahImg from "@assets/image_1782095223216.png";
import shipmentImg from "@assets/image_1782095366735.png";
import hyundaiImg from "@assets/image_1782095439332.png";
import bariAudio from "@assets/miguel-miguel_1782096905374.mp3";

const buttonTexts = ["Get in Touch", "Say Hello", "Let's Talk", "Reach Out"];

const products = [
  {
    name: "Dashboard Cheetah",
    image: cheetahImg,
    description:
      "An immaculately designed piece of art that instantly adds 500hp to your vehicle.",
  },
  {
    name: "300 million dollar shipment",
    image: shipmentImg,
    description: "A whole collection of McLarens that will make you drool!",
  },
  {
    name: "Hyundai elantra",
    image: hyundaiImg,
    description:
      "A Hyundai Elantra is a futuristic road-glider so sharp and efficient it makes an LX570 feel like a luxury tank stuck in slow motion.",
  },
];

function Home() {
  const [buttonIndex, setButtonIndex] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleCycleText = () => {
    setButtonIndex((prev) => (prev + 1) % buttonTexts.length);
  };

  const playRevealSound = () => {
    const audio = new Audio(bariAudio);
    audioRef.current = audio;
    audio.play().catch(() => {});
  };

  const stopSound = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    }
  };

  const openOverlay = () => {
    setOverlayOpen(true);
    playRevealSound();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOverlayVisible(true));
    });
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    stopSound();
    setTimeout(() => setOverlayOpen(false), 250);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground selection:bg-primary/30 font-sans flex flex-col">
      {overlayOpen && (
        <div
          onClick={closeOverlay}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center cursor-pointer overflow-hidden transition-opacity duration-250"
          style={{ opacity: overlayVisible ? 1 : 0 }}
        >
          <h1
            className="text-7xl md:text-9xl font-black tracking-tight text-primary select-none transition-all duration-350"
            style={{
              transform: overlayVisible ? "scale(1)" : "scale(0.8)",
              opacity: overlayVisible ? 1 : 0,
            }}
          >
            BARI GAME
          </h1>
        </div>
      )}

      <main className="flex-1 max-w-5xl mx-auto px-6 py-24 flex flex-col items-center w-full space-y-40">
        <section className="flex flex-col items-center text-center space-y-10 mt-12 w-full animate-fade-up">
          <div className="space-y-6 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white max-w-3xl">
              F*S.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed font-light">
              Jab game itni bhari hojaye keh shipment cancel krni parjaye
            </p>
          </div>

          <button
            onClick={handleCycleText}
            className="mt-6 px-10 py-4 bg-primary text-primary-foreground text-base font-medium rounded-2xl hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
          >
            {buttonTexts[buttonIndex]}
          </button>
        </section>

        <section className="w-full flex flex-col items-center space-y-16 animate-fade-up-delay">
          <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight">
            What I've Built
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {products.map((product, i) => (
              <div
                key={i}
                onClick={openOverlay}
                className="group flex flex-col p-5 bg-card rounded-3xl border border-card-border hover:border-primary/50 transition-colors duration-500 cursor-pointer"
              >
                <div className="w-full aspect-[4/3] bg-muted/40 rounded-2xl border border-border/50 flex items-center justify-center overflow-hidden mb-6 group-hover:bg-muted/60 transition-colors duration-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3 px-1 pb-2">
                  <h3 className="text-xl font-medium text-white tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full py-12 text-center text-muted-foreground text-sm font-light">
        <p>Built with intent. © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return <Home />;
}
