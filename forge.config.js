module.exports = {
  packagerConfig: {
    asar: true,
    icon: "assets/RecipeLibraryIcon",
    ignore: [
      /node_modules$/,
      /src$/,
      /\.angular$/,
      /\.git$/,
      /\.github$/,
      /\.idea$/,
      /\.vscode$/,
      /coverage$/,
      /cypress$/,
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: "assets/RecipeLibraryIcon.ico",
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
          icon: "assets/RecipeLibraryIcon.png",
        },
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "assets/RecipeLibraryIcon.icns",
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
