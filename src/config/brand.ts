import logoPrimary from '@/assets/brand/weewire-logo-primary.png';

/**
 * Brand identity.
 *
 * The logo is the owner-supplied primary logo (weewire-logo-primary.png),
 * with only its empty white margin trimmed. It is a raster file with an
 * opaque white background, so the Logo component blends it onto light
 * surfaces and places it on a light plate over dark ones.
 *
 * To replace it with a higher-resolution or vector version, put the new file
 * in src/assets/brand/ and change the import above (SVG works too). Keep the
 * artwork's proportions; never stretch or recolour it.
 */
export const brand = {
  logo: {
    image: logoPrimary,
    alt: 'Weewire LLC',
    source: 'Owner-supplied brand assets (Oct 2026), primary logo, margin trimmed',
  },
  /** Tagline as it appears in the logo artwork. */
  tagline: "It's what we do.",
  /**
   * Colours sampled from the logo. The raw values are for decoration and
   * dark backgrounds; text-safe variants live in src/styles/global.css.
   */
  colors: {
    cyan: '#00ffff',
    orange: '#ff9955',
    black: '#000000',
    white: '#ffffff',
  },
};
