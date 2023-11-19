import fs from "fs";
import path from "path";

export function getFilesWithExtension(
  directoryPath: string,
  fileExtension: string
) {
  try {
    const pathDirectory = path.join(process.cwd(), "data", directoryPath);
    const files = fs.readdirSync(pathDirectory, "utf-8");

    const filePaths: Array<string> = files.reduce<Array<string>>(
      (accumulator, file) => {
        const filePath = path.join(pathDirectory, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
          const subDirectoryFiles = getFilesWithExtension(
            filePath,
            fileExtension
          );
          return accumulator.concat(subDirectoryFiles);
        }

        if (path.extname(file) === fileExtension) {
          accumulator.push(filePath);
        }

        return accumulator;
      },
      []
    );

    return filePaths;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export function getFilesByName(directoryPath: string, fileName: string) {
  try {
    const pathDirectory = path.join(process.cwd(), "data", directoryPath);
    const files = fs.readdirSync(pathDirectory, "utf-8");

    const filePaths: Array<string> = files.reduce<Array<string>>(
      (accumulator, file) => {
        const fullPath = path.join(pathDirectory, fileName);
        const isDirectory = fs.statSync(fullPath).isDirectory();

        if (isDirectory) {
          const subDirectoryFiles = getFilesByName(fullPath, fileName);
          return accumulator.concat(subDirectoryFiles);
        }

        if (file === fileName) {
          accumulator.push(fullPath);
        }

        return accumulator;
      },
      []
    );

    return filePaths;
  } catch (err) {
    console.log(err);
    return [];
  }
}
