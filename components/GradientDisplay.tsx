import React, { useEffect, useMemo } from 'react';

/* ------------------------------------------------------------------ */
/*                       CONFIGURATION CONSTANTS                      */
/* ------------------------------------------------------------------ */

const NUM_BLOBS = 5;

const BLOB_COLORS = [
  '#D59D6B', // Tan
  '#F7B7A3', // Peachy
  '#85BDB3', // Teal
  '#A0E7E5', // Light Cyan
  '#E6A4B4', // Soft Pink
  '#DBC37A', // Muted Yellow
];

const BACKGROUND_PALETTE = [
  '#D59D6B', // Tan
  '#DBC37A', // Muted Yellow
  '#85BDB3', // Teal
  '#BDC789', // Muted Green/Olive
];

const BLOB_ANIMATION_STYLE_ID       = 'blob-animation-style';
const BACKGROUND_ANIMATION_STYLE_ID = 'dynamic-background-animation-style';
const BACKGROUND_ANIMATION_CLASS    = 'animated-gradient-background';
const BACKGROUND_KEYFRAMES_NAME     = 'dynamicBackgroundAnimation';

/* ------------------------------------------------------------------ */

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

/* ------------------------------------------------------------------ */
/*                               COMPONENT                            */
/* ------------------------------------------------------------------ */

const GradientDisplay: React.FC = () => {
  /* -------------------------------------------------------------- *
     1.  Prepare the blobs (memoised so values stay stable)
  * -------------------------------------------------------------- */
  const blobs = useMemo(() => {
    return Array.from({ length: NUM_BLOBS }).map((_, i) => ({
      id:            `blob-${i}`,
      sizeVw:        `${rand(25, 45)}vw`,
      sizeVh:        `${rand(25, 45)}vh`,
      minSizePx:     `${rand(150, 250)}px`,
      initialTop:    `${rand(-10, 50)}%`,
      initialLeft:   `${rand(-10, 50)}%`,
      animDuration:  `${rand(16, 30)}s`,
      animDelay:     `${rand(0, 4)}s`,
    }));
  }, []);

  /* -------------------------------------------------------------- *
     2.  Build / inject stylesheet for the blobs
         – eight key-frame stops for a more erratic path
         – wide scale range so size visibly changes
  * -------------------------------------------------------------- */
  useEffect(() => {
    document.getElementById(BLOB_ANIMATION_STYLE_ID)?.remove();

    const sheet = document.createElement('style');
    sheet.id = BLOB_ANIMATION_STYLE_ID;

    let css = '';

    blobs.forEach((blob, i) => {
      const kf = `moveBlob${i}`;
      const stops: number[] = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];

      css += `@keyframes ${kf} {\n`;
      stops.forEach(pct => {
        css +=
          `  ${pct}% {` +
          ` transform: translate(${rand(-160, 160)}px, ${rand(-160, 160)}px)` +
          `           scale(${rand(0.5, 1.7)});` +
          ` background-color: ${BLOB_COLORS[(i + Math.floor(pct / 20)) % BLOB_COLORS.length]};` +
          ` opacity: ${rand(0.55, 0.9)}; }\n`;
      });
      css += '}\n';

      css += `
        .${blob.id}{
          position:absolute;
          top:${blob.initialTop};
          left:${blob.initialLeft};
          width:clamp(${blob.minSizePx},${blob.sizeVw},600px);
          height:clamp(${blob.minSizePx},${blob.sizeVh},600px);
          max-width:80vw; max-height:80vh;
          border-radius:50%;
          filter:blur(80px);
          animation:${kf} ${blob.animDuration} ${blob.animDelay}
                    infinite ease-in-out;
          will-change:transform,opacity,background-color;
        }\n`;
    });

    sheet.innerHTML = css;
    document.head.appendChild(sheet);
    return () => sheet.remove();
  }, [blobs]);

  /* -------------------------------------------------------------- *
     3.  Build / inject stylesheet for the animated gradient
         (same logic as before, but includes @property registration)
  * -------------------------------------------------------------- */
  useEffect(() => {
    document.getElementById(BACKGROUND_ANIMATION_STYLE_ID)?.remove();

    const sheet = document.createElement('style');
    sheet.id = BACKGROUND_ANIMATION_STYLE_ID;

    /* make a colour pair for every stop, wrap at the end */
    const frames: Array<{ c1: string; c2: string }> = [];
    const n = BACKGROUND_PALETTE.length;
    const total = n >= 2 ? n + 1 : 3;

    for (let i = 0; i < total; i++) {
      const c1 = BACKGROUND_PALETTE[i % n];
      const c2 = BACKGROUND_PALETTE[(i + Math.floor(n / 2)) % n];
      frames.push({ c1, c2: c1 === c2 ? BACKGROUND_PALETTE[(i + 1) % n] : c2 });
    }
    if (frames.length > 1) frames[frames.length - 1] = frames[0];

    /* key-frames */
    let keyframes = `@keyframes ${BACKGROUND_KEYFRAMES_NAME}{\n`;
    frames.forEach((f, idx) => {
      const pct = (idx / (total - 1)) * 100;
      keyframes += `  ${pct}%{--gradient-color-1:${f.c1};--gradient-color-2:${f.c2};}\n`;
    });
    keyframes += `}`;

    const duration = Math.max(15, total * 5);
    const init = frames[0];

    sheet.innerHTML = `
      @property --gradient-color-1{
        syntax:'<color>';inherits:false;initial-value:${init.c1};
      }
      @property --gradient-color-2{
        syntax:'<color>';inherits:false;initial-value:${init.c2};
      }

      .${BACKGROUND_ANIMATION_CLASS}{
        --gradient-color-1:${init.c1};
        --gradient-color-2:${init.c2};
        background-image:linear-gradient(135deg,
                    var(--gradient-color-1),var(--gradient-color-2));
        animation:${BACKGROUND_KEYFRAMES_NAME} ${duration}s ease-in-out infinite;
      }
      ${keyframes}
    `;
    document.head.appendChild(sheet);
    return () => sheet.remove();
  }, []);

  /* -------------------------------------------------------------- *
     4.  Render
  * -------------------------------------------------------------- */
  return (
    <div
      className={`
        relative w-full h-full
        rounded-[80px] shadow-2xl overflow-hidden
        ${BACKGROUND_ANIMATION_CLASS}
      `}
      aria-label="Animated abstract background with blurred, moving colour blobs on a shifting gradient, overlaid with the text 'Hack The Ridge 2025'"
      role="img"
    >
      {blobs.map(b => <div key={b.id} className={b.id} />)}

      {/* Text Overlay Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1" style={{ paddingTop: '6%' }}>
        {/* Main Title Text */}
        <h1
          className="text-white uppercase"
          style={{
            fontFamily: "'Sacco', 'Righteous', sans-serif", // Use Sacco, fallback to Righteous
            fontSize: 'clamp(8rem, 48vw, 27rem)',
            lineHeight: 1,
            letterSpacing: '0.05em',
            zIndex: 1,
            textShadow: '0px 0px 15px rgba(0,0,0,0)',
          }}
        >
          Hack The Ridge
        </h1>
      </div>

      {/* Year Text: Positioned bottom-right of the GradientDisplay */}
      <div
        className="absolute font-bold text-white"
        style={{
          fontFamily: "'Inter', sans-serif",
          bottom: 'clamp(1rem, 4vh, 2rem)',
          right: 'clamp(2rem, 6vw, 4rem)',
          fontSize: 'clamp(6rem, 12vw, 7rem)',
          zIndex: 1,
          textShadow: '0px 0px 10px rgba(0,0,0,0.2)',
        }}
      >
        2025
      </div>
    </div>
  );
};

export default GradientDisplay;