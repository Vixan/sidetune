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
  plugins: [
    require("@tailwindcss/forms")
  ],
  variants: {
    // Extend the existing variants to support the disabled core utility
    // using textColor: ({after}) => after([])
    // or textColor: ["responsive", "hover", "focus", "group-hover"],
    opacity: ({ after }) => after(["disabled", "group-hover"]),
    textColor: ({ after }) => after(["group-hover"]),
    backgroundColor: ({ after }) => after(["disabled"]),
    cursor: ({ after }) => after(["disabled"])
  }
};
