const { grey, teal } = require("@mui/material/colors");



const getDesignTokens = (mode) => ({
  palette: {
    // @ts-ignore
    mode,
    ...(mode === `light`
      ? {
          // palette values for Light mode
          ahmed: {
            main: `#647488`,
          },
          favColor: {
            main: grey[300],
          },
        }
      : {
          // palette values for dark mode
          ahmed: {
            main: teal,
          },
          favColor: {
            main: grey[800],
          },
        }),
  },
});

export default getDesignTokens;