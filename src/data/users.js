// src/data/users.js
export const users = [
  {
    id: 1,
    pseudo: "ColorMaster",
    email: "colormaster@example.com",
    projects: [
      {
        idProject: 101,
        name: "Pallette par défaut",
        colorPalette: [
          { name: "Primary", value: "#1E90FF" },
          { name: "Secondary", value: "#FFD700" },
          { name: "Accent", value: "#FF6347" },
          { name: "Background", value: "#7849d7ff" },
          { name: "Text", value: "#333333" },
        ],
        typoScale: {
          baseSize: 16,
          sizeUnity:'px',
          ratio: 1.25,
          scaleLevels: 8,
          titleLevels: 4,
          titles: {
            fontFamily: "Montserrat",
            scale: [
              {
                textLevel: "h1",
                size: "2.44rem",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.02em"
              },
              {
               textLevel: "h2",
                size: "1.95rem",
                fontWeight: 600,
                lineHeight: 1.25,
                letterSpacing: "-0.01em"
              },
              {
               textLevel: "h3",
                size: "1.56rem",
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: "0em"
              },
              {
               textLevel: "h4",
                size: "1.25rem",
                fontWeight: 500,
                lineHeight: 1.35,
                letterSpacing: "0em"
              }
            ]
          },
          body: {
            fontFamily: "Roboto",
            scale: [
              {
               textLevel: "body",
                size: "1rem",
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: "0em"
              },
              {
               textLevel: "small",
                size: "0.875rem",
                fontWeight: 400,
                lineHeight: 1.4,
                letterSpacing: "0.01em"
              },
              {
               textLevel: "caption",
                size: "0.75rem",
                fontWeight: 400,
                lineHeight: 1.3,
                letterSpacing: "0.02em"
              }
            ]
          }
        }
      }
    ]
  }
];
