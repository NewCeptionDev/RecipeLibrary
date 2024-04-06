module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(__dirname, "../assets/RecipeLibraryIcon"),
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: path.join(__dirname, "../assets/RecipeLibraryIcon.ico"),
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: path.join(__dirname, "../assets/RecipeLibraryIcon.png"),
        },
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: path.join(__dirname, "../assets/RecipeLibraryIcon.icns"),
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
}
