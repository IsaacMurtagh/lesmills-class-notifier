import { getClasses } from "../src/lesmillsClient.js";
import getClassConfig from "./getClassConfig.js";

const classConfig = getClassConfig();

const ceremonyClasses = await getClasses({
  classes: classConfig.classNames,
  gyms: classConfig.gyms
});

const validClasses = ceremonyClasses
  .filter(card => card.assertValid(classConfig))
  .map(c => c.toString());

console.log({ 
  allClasses: ceremonyClasses.map(c => c.toString()),
  validClasses: validClasses.map(c => c.toString()),
});