import React from 'react';
import GradientDisplay from './components/GradientDisplay';
// FontSwitcher and useFontStyles removed. All text is Inter except for special font placeholders.
import logo from './assets/logo.png';

const App: React.FC = () => {
  // Detect if user is on a mobile device
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      const isTouchDevice = 'ontouchstart' in window;
      
      setIsMobile(isMobileDevice || (isSmallScreen && isTouchDevice));
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Simple text component without animations for mobile
  const SimpleText: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => {
    return <div className={className} style={style}>{children}</div>;
  };

  // TypewriterText component for typewriter effect (desktop only)
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
        <div className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl mt-2" style={schoolFont}>
          {displayed[1]}
          {lineIdx === 1 && <span className="type-cursor">|</span>}
        </div>
      </div>
    );
  };

  return (
    <>
      {isMobile ? (
        // Mobile-specific layout - full screen gradient with centered content and margin
        <div className="h-screen p-2 bg-[#fff0d9]">
          <div className="h-full relative overflow-hidden rounded-lg">
            {/* Full screen gradient background */}
            <div className="absolute inset-0">
              <GradientDisplay isMobile={isMobile} />
            </div>
            
            {/* Centered content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              {/* Main content container */}
              <div 
                className="flex flex-col items-center space-y-6"
                style={{
                  // Logo controls
                  '--logo-width': '600px',
                  '--logo-height': '600px',
                  '--logo-translate-x': '0px',
                  '--logo-translate-y': '80px',
                  '--logo-margin-top': '0px',
                  '--logo-margin-bottom': '-20px',
                  
                  // Text controls
                  '--hack-text-size': 'clamp(3rem, 8vw, 4rem)',
                  '--year-text-size': 'clamp(5rem, 8vw, 4rem)',
                  '--text-gap': '1rem',
                  '--hack-margin-top': '0px',
                  '--hack-margin-bottom': '0px',
                  '--year-margin-top': '0px',
                  '--year-margin-bottom': '0px',
                  '--hack-translate-x': '0px',
                  '--hack-translate-y': '-130px',
                  '--year-translate-x': '0px',
                  '--year-translate-y': '-138px',
                  '--title-container-translate-x': '0px',
                  '--title-container-translate-y': '0px',
                  
                  // Date section controls
                  '--date-container-translate-x': '0px',
                  '--date-container-translate-y': '-150px',
                  '--date-container-margin-top': '0rem',
                  '--date-main-size': 'text-xl',
                  '--date-sub-size': 'text-lg',
                  '--date-spacing': '0.5rem',
                  
                  // Button controls
                  '--button-translate-x': '0px',
                  '--button-translate-y': '-150px',
                  '--button-margin-top': '1rem',
                  '--button-padding-y': '0.75rem',
                  '--button-padding-x': '1.5rem',
                  '--button-font-size': 'text-lg',
                } as React.CSSProperties}
              >
                {/* Large logo at top */}
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="object-contain"
                  style={{ 
                    width: 'var(--logo-width)',
                    height: 'var(--logo-height)',
                    transform: 'translate(var(--logo-translate-x), var(--logo-translate-y))',
                    marginTop: 'var(--logo-margin-top)',
                    marginBottom: 'var(--logo-margin-bottom)'
                  }}
                />
                
                {/* Title line - HACK THE RIDGE 2025 */}
                <div 
                  className="flex items-center justify-center flex-wrap gap-4"
                  style={{
                    gap: 'var(--text-gap)',
                    transform: 'translate(var(--title-container-translate-x), var(--title-container-translate-y))'
                  }}
                >
                  <h1 
                    className="text-white uppercase font-bold"
                    style={{ 
                      fontFamily: "'Sacco', 'Righteous', sans-serif",
                      fontSize: 'var(--hack-text-size)',
                      textShadow: '0px 0px 20px rgba(0,0,0,0.5)',
                      letterSpacing: '-0.02em',
                      marginTop: 'var(--hack-margin-top)',
                      marginBottom: 'var(--hack-margin-bottom)',
                      transform: 'translate(var(--hack-translate-x), var(--hack-translate-y))'
                    }}
                  >
                    HACK THE RIDGE
                  </h1>
                  <div 
                    className="text-white font-bold"
                    style={{ 
                      fontFamily: "'VT323', monospace",
                      fontSize: 'var(--year-text-size)',
                      textShadow: '0px 0px 15px rgba(0,0,0,0.4)',
                      marginTop: 'var(--year-margin-top)',
                      marginBottom: 'var(--year-margin-bottom)',
                      transform: 'translate(var(--year-translate-x), var(--year-translate-y))'
                    }}
                  >
                    2025
                  </div>
                </div>
                
                {/* Date and location */}
                <div 
                  className="text-white"
                  style={{ 
                    gap: 'var(--date-spacing)',
                    display: 'flex',
                    flexDirection: 'column',
                    transform: 'translate(var(--date-container-translate-x), var(--date-container-translate-y))',
                    marginTop: 'var(--date-container-margin-top)'
                  }}
                >
                  <SimpleText 
                    className="font-bold"
                    style={{ 
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '1rem' // equivalent to text-xl
                    }}
                  >
                    Coming December 2025
                  </SimpleText>
                  <SimpleText 
                    style={{ 
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: '0.8rem' // equivalent to text-lg
                    }}
                  >
                    Iroquois Ridge High School
                  </SimpleText>
                </div>
                
                {/* Archive button */}
                <a
                  href="https://2024.hacktheridge.ca"
                  style={{ 
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", 
                    fontWeight: 700,
                    transform: 'translate(var(--button-translate-x), var(--button-translate-y))',
                    marginTop: 'var(--button-margin-top)',
                    paddingTop: 'var(--button-padding-y)',
                    paddingBottom: 'var(--button-padding-y)',
                    paddingLeft: 'var(--button-padding-x)',
                    paddingRight: 'var(--button-padding-x)',
                    fontSize: '1.125rem' // equivalent to text-lg
                  }}
                  className="inline-block bg-white/90 hover:bg-white text-sky-800 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-150 ease-in-out"
                  aria-label="Visit 2024 Hack the Ridge Archive"
                >
                  2024 Archive &rarr;
                </a>
              </div>
              
                {/* Copyright - absolute bottom */}
                <div 
                className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-white/60 text-[7px] px-2 text-center"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", letterSpacing: '0.04em' }}
                >
                © 2025 Hack the Ridge. Designed & Built by Jerry and Peter
                </div>
            </div>
          </div>
        </div>
      ) : (
        // Desktop layout (existing)
        <div className="h-screen bg-[#fff0d9] pt-4 pr-4 pl-4 pb-32 sm:pt-8 sm:pr-8 sm:pl-8 sm:pb-40 lg:pt-16 lg:pr-16 lg:pl-16 lg:pb-48 relative">
      {/* FontSwitcher removed */}
              <GradientDisplay isMobile={isMobile} />      {/* Animation Styles */}
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
          
          /* Responsive logo positioning */
          .logo-animated {
            --logo-offset-y: clamp(-5vh, 10vw, 35vh); /* Moved down by about 10% more */
            --logo-margin-top: clamp(50vh, 60vw, 500px); /* Moved down significantly */
          }
          
          @media (min-width: 640px) {
            .logo-animated {
              --logo-offset-y: clamp(0vh, 15vw, 40vh); /* 10% lower than before */
              --logo-margin-top: clamp(55vh, 65vw, 550px); /* 10% lower */
            }
          }
          
          @media (min-width: 1024px) {
            .logo-animated {
              --logo-offset-y: clamp(5vh, 20vw, 45vh); /* 10% lower - was -5vh to 35vh, now 5vh to 45vh */
              --logo-margin-top: clamp(60vh, 70vw, 600px); /* 10% lower */
            }
          }
        `}
      </style>
      
      {/* Logo - centered within gradient area */}
      <div className="absolute inset-x-0 top-0 bottom-32 sm:bottom-40 lg:bottom-48 overflow-hidden flex items-center justify-center z-10">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-[70vw] sm:w-[60vw] lg:w-[48vw] h-auto logo-animated"
          style={{
            // Responsive positioning using CSS custom properties
            transform: 'translate(0, var(--logo-offset-y))', 
            marginTop: 'var(--logo-margin-top)',
          }}
        />
      </div>
      <div className="absolute left-2 sm:left-8 lg:left-16 bottom-0 h-32 sm:h-40 lg:h-48 flex items-center fadeUpLeft"> {/* Coming December text - left aligned */}
        <TypewriterText
          lines={["Coming December 2025", "Iroquois Ridge Highschool"]}
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-sky-800"
        />
      </div>
      <div className="absolute right-2 sm:right-8 lg:right-16 bottom-0 h-32 sm:h-40 lg:h-48 flex items-center fadeUpRight"> {/* Vertically centered in bottom margin */}
      <a
        href="https://2024.hacktheridge.ca"
        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontWeight: 700 }}
        className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-sky-200 hover:bg-sky-300 text-sky-800 font-semibold py-2 px-4 sm:py-3 sm:px-6 lg:py-6 lg:px-16 rounded-full shadow-md hover:shadow-lg transition-all duration-150 ease-in-out"
        aria-label="Visit 2024 Hack the Ridge Archive"
      >
        <span className="hidden sm:inline">Visit 2024 Archive &rarr;</span>
        <span className="sm:hidden">2024 Archive &rarr;</span>
      </a>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs px-4 py-1 rounded z-0" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", letterSpacing: '0.05em', background: 'none', boxShadow: 'none', color: "#bea883" }}>
        © 2025 Hack the Ridge. Designed & Built by Jerry and Peter
      </div>
        </div>
      )}
    </>
  );
};

export default App;