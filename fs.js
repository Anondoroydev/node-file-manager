import { promises as fs } from "node:fs";
import path from "node:path";

export async function createFolder(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function readFolder(dirPath) {
  return await fs.readdir(dirPath);
}

export async function deleteFolder(dirPath) {
  await fs.rm(dirPath, { recursive: true, force: true });
}

export async function createFile(filePath, content = "") {
  await fs.writeFile(filePath, content, "utf8");
}

export async function readFile(filePath) {
  return await fs.readFile(filePath, "utf8");
}

export async function updateFile(filePath, content) {
  await fs.writeFile(filePath, content, "utf8");
}

export async function deleteFile(filePath) {
  await fs.rm(filePath, { force: true });
}

export async function statPath(filePath) {
  const stat = await fs.stat(filePath);
  return {
    size: stat.size,
    createdAt: stat.birthtime,
    updatedAt: stat.mtime,
  };
}
