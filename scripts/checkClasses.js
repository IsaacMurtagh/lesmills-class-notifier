import { getClasses } from "../src/lesmillsClient.js";
import getClassConfig from "./getClassConfig.js";

const classConfig = getClassConfig();

const classes = await getClasses({
  classes: classConfig.classNames,
  gyms: classConfig.gyms
});

console.log(classConfig.classNames);

const validClasses = classes
  .filter(card => card.assertValid(classConfig))
  .map(c => c.toString());

console.log({ 
  allClasses: classes.map(c => c.toString()),
  validClasses: validClasses.map(c => c.toString()),
});