console.log("script started");

const fs = require("fs");

const startPath = "./svg/";
const targetPath = "./react-components/";

fs.readdir(startPath, (err, folder) => {
  console.log(folder);

  folder.forEach((file) => {
    console.log("found:", file);

    fs.readFile(startPath + file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      fs.writeFile(targetPath + file.slice(0, -4) + ".tsx", data, (err) => {
        if (err) {
          console.error(err);
        }
        console.log("created: ", file.slice(0, -4) + ".tsx");
        // file written successfully
      });
    });
  });
});
