// TODO: Must include custom fonts in src/fonts and specify them here
const defaultFonts = [
  "Open Sans",
  "ui-sans-serif",
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto"
];

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      sans: defaultFonts,
      display: defaultFonts,
      body: defaultFonts
    },
    extend: {
      cursor: {
        grab: "grab"
      }
    }
  },
  variants: {
    // Extend the existing variants to support the disabled core utility
    opacity: ({ after }) => after(["disabled"]),
    backgroundColor: ({ after }) => after(["disabled"]),
    cursor: ({ after }) => after(["disabled"])
  }
};
