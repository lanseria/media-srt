import * as fs from "fs";
import * as path from "path";
function validTypeImage(image) {
  return /(?<=\S+)\.(jpg|png|jpeg)/gi.test(image);
}

function base64ToNode(buffer): string {
  return "data:image/png;base64," + buffer.toString("base64");
}

function readFileAndConvert(fileName) {
  if (fs.statSync(fileName).isFile()) {
    return base64ToNode(
      fs.readFileSync(path.resolve(fileName)).toString("base64")
    );
  }
  return null;
}

export function imageToBase64(urlOrImage) {
  if (validTypeImage(urlOrImage)) {
    return Promise.resolve(readFileAndConvert(urlOrImage));
  } else {
    return Promise.reject(
      "[*] An error occured: Invalid image [validTypeImage === false]"
    );
  }
}
