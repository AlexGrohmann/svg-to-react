console.log("script started");

const fs = require("fs");
const { optimize } = require("svgo");

// start dir
const startPath = "./svg/";
// target dir
const targetPath = "./demo/src/";

fs.readdir(startPath, (err, folder) => {
  console.log(folder);

  folder.forEach((file) => {
    console.log("found:", file);

    fs.readFile(startPath + file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      //boptimize svg
      const result = optimize(data, {
        path: startPath + file,
        multipass: true,
      });
      const optimizedData = result.data;
      console.log(
        "SVG optimized: " + data.length + " to " + optimizedData.length
      );
      const filename =
        file.slice(0, -4)[0].toUpperCase() + file.slice(0, -4).slice(1);
      fs.writeFile(
        targetPath + filename + ".tsx",
        "import React from 'react';" +
          "\nfunction " +
          filename +
          "() {" +
          "\n\treturn (\n\t" +
          optimizedData +
          "\n\t);" +
          "\n}" +
          "\nexport default " +
          filename +
          ";",
        (err) => {
          if (err) {
            console.error(err);
          }
          console.log("created: ", filename + ".tsx");
          // file written successfully
        }
      );
    });
  });
});

// test
