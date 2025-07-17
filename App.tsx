import React from 'react';
import GradientDisplay from './components/GradientDisplay';
// FontSwitcher and useFontStyles removed. All text is Inter except for special font placeholders.
import logo from './assets/logo.png';

const App: React.FC = () => {
  // All font is Inter except for special font spots
  // TypewriterText component for typewriter effect
  const TypewriterText: React.FC<{ lines: string[]; className?: string }> = ({ lines, className }) => {
    const [displayed, setDisplayed] = React.useState(['', '']);
    const [lineIdx, setLineIdx] = React.useState(0);
    const [charIdx, setCharIdx] = React.useState(0);

    React.useEffect(() => {
      if (lineIdx >= lines.length) {
        return;
      }
      if (charIdx <= lines[lineIdx].length) {
        const timeout = setTimeout(() => {
          setDisplayed(prev => {
            const newArr = [...prev];
            newArr[lineIdx] = lines[lineIdx].slice(0, charIdx);
            return newArr;
          });
          setCharIdx(c => c + 1);
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setLineIdx(i => i + 1);
        setCharIdx(0);
      }
    }, [charIdx, lineIdx, lines]);

    const interFont = { fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 700 };
    const schoolFont = { fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 'normal' };

    // All text uses Inter font
    const renderFirstLine = () => {
      const text = displayed[0];
      if (text.length === 0) return '';
      return <span style={interFont}>{text}</span>;
    };

    return (
      <div className={className}>
        <div>
          {renderFirstLine()}
          {lineIdx === 0 && <span className="type-cursor">|</span>}
        </div>
        <div className="text-2xl sm:text-3xl mt-2" style={schoolFont}>
          {displayed[1]}
          {lineIdx === 1 && <span className="type-cursor">|</span>}
        </div>
      </div>
    );
  };

  // Upward scrolling carousel for event stats
  const stats = [
    "500+ Registrants",
    "$6000+ in prizes",
    "5+ Workshops",
    "Celebrating a Decade of Innovation"
  ];

  // Manual height control for carousel positioning (adjust this value to move it up/down)
  const carouselBottomOffset = 5; // Change this value: positive moves up, negative moves down

  const Carousel: React.FC = () => {
    const interFont = { fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 700 };
    return (
      <div 
        className="absolute left-1/2 -translate-x-1/2 h-48 w-full flex justify-center items-center pointer-events-none select-none z-10 carousel-fade-in"
        style={{ bottom: `${carouselBottomOffset}px` }}
      >
        <div style={{height: '4.5rem', overflow: 'hidden', minWidth: '500px', maxWidth: '95vw', width: 'max-content'}}>
          <div className="carousel-anim text-center text-3xl sm:text-5xl font-semibold text-sky-700" style={{...interFont, lineHeight: '4.5rem', whiteSpace: 'nowrap'}}>
            {stats.concat(stats[0]).map((item, i) => (
              <div key={i} style={interFont}>{item}</div>
            ))}
          </div>
        </div>
        <style>{`
          .carousel-fade-in {
            animation: carouselFadeIn 1.5s cubic-bezier(0.22, 1, 0.36, 1) 1.2s both;
          }
          @keyframes carouselFadeIn {
            0% { opacity: 0; transform: translateX(-50%) translateY(30px) scale(0.95); }
            100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
          }
          .carousel-anim {
            display: flex;
            flex-direction: column;
            animation: scrollUpPremium 12s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          }
          .carousel-anim > div {
            transition: opacity 0.6s ease-in-out;
          }
          @keyframes scrollUpPremium {
            0% { transform: translateY(0); opacity: 1; }
            22% { transform: translateY(0); opacity: 1; }
            25% { transform: translateY(-4.5rem); opacity: 0.95; }
            27% { opacity: 1; }
            47% { transform: translateY(-4.5rem); opacity: 1; }
            50% { transform: translateY(-9rem); opacity: 0.95; }
            52% { opacity: 1; }
            72% { transform: translateY(-9rem); opacity: 1; }
            75% { transform: translateY(-13.5rem); opacity: 0.95; }
            77% { opacity: 1; }
            97% { transform: translateY(-13.5rem); opacity: 1; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="h-screen bg-[#fff0d9] pt-16 pr-16 pl-16 pb-48 relative">
      {/* FontSwitcher removed */}
      <GradientDisplay />
      <Carousel />
      
      {/* Animation Styles */}
      <style>
        {`
          @keyframes logoColorShift {
            0%   { filter: drop-shadow(0 0 20px rgba(213, 157, 107, 0.3)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1)) hue-rotate(0deg); }
            25%  { filter: drop-shadow(0 0 20px rgba(219, 195, 122, 0.3)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1)) hue-rotate(15deg); }
            50%  { filter: drop-shadow(0 0 20px rgba(133, 189, 179, 0.3)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1)) hue-rotate(30deg); }
            75%  { filter: drop-shadow(0 0 20px rgba(189, 199, 137, 0.3)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1)) hue-rotate(15deg); }
            100% { filter: drop-shadow(0 0 20px rgba(213, 157, 107, 0.3)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1)) hue-rotate(0deg); }
          }
          .logo-animated {
            animation: logoColorShift 12s ease-in-out infinite, fadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
          }
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(40px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .fadeUpLeft {
            animation: fadeUpLeft 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
          }
          @keyframes fadeUpLeft {
            0% { opacity: 0; transform: translateY(40px) translateX(-40px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) translateX(0) scale(1); }
          }
          .fadeUpRight {
            animation: fadeUpRight 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both;
          }
          @keyframes fadeUpRight {
            0% { opacity: 0; transform: translateY(40px) translateX(40px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) translateX(0) scale(1); }
          }
          .type-cursor {
            display: inline-block;
            width: 1ch;
            animation: blink 1s steps(1) infinite;
          }
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
      
      {/* Logo - centered within gradient area */}
      <div className="absolute inset-x-0 top-0 bottom-48 overflow-hidden flex items-center justify-center z-10">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-[48vw] h-auto logo-animated"
          style={{
            // Positioning options - adjust these values to move the logo
            transform: 'translate(0, -750)', // Change to translate(x, y) to move left/right/up/down
            // Alternative positioning options (uncomment to use):
            marginTop: '750px',    // Positive moves down, negative moves up
            // marginLeft: '0px',   // Positive moves right, negative moves left
          }}
        />
      </div>
      <div className="absolute left-16 bottom-0 h-48 flex items-center fadeUpLeft"> {/* Coming December text - left aligned */}
        <TypewriterText
          lines={["Coming December 2025", "Iroquois Ridge Highschool"]}
          className="text-4xl sm:text-5xl text-sky-800"
        />
      </div>
      <div className="absolute right-16 bottom-0 h-48 flex items-center fadeUpRight"> {/* Vertically centered in bottom margin */}
      <a
        href="https://2024.hacktheridge.ca"
        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 700 }}
        className="text-3xl sm:text-4xl bg-sky-200 hover:bg-sky-300 text-sky-800 font-semibold py-6 px-16 rounded-full shadow-md hover:shadow-lg transition-all duration-150 ease-in-out"
        aria-label="Visit 2024 Hack the Ridge Archive"
      >
        Visit 2024 Archive &rarr;
      </a>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs px-4 py-1 rounded z-0" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", letterSpacing: '0.05em', background: 'none', boxShadow: 'none', color: "#bea883" }}>
        © 2025 Hack the Ridge. Designed & Built by Jerry and Peter
      </div>
    </div>
  );
};

export default App;