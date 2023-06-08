console.log("script started");

const fs = require("fs");

const startPath = "./svg/";
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

      fs.writeFile(
        targetPath + file.slice(0, -4) + ".tsx",
        "import React from 'react';" +
          "\nfunction App() {" +
          "\n\treturn (\n\t" +
          data +
          "\n\t);" +
          "\n}" +
          "\nexport default App;",
        (err) => {
          if (err) {
            console.error(err);
          }
          console.log("created: ", file.slice(0, -4) + ".tsx");
          // file written successfully
        }
      );
    });
  });
});
