import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';
import ClassConfig from "../src/ClassConfig.js";

const configFilePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../classConfig.json'
)
const configFile = fs.readFileSync(configFilePath, 'utf-8');

export default function() {
  return ClassConfig.fromJson(JSON.parse(configFile))
}