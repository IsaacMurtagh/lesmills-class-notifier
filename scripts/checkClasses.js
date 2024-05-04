import ClassConfig from "../src/ClassConfig.js";
import { getClasses } from "../src/lesmillsClient.js";

const classConfig = ClassConfig.fromJson([
  {
    "gym": "Auckland City",
    "class": "ceremony",
    "day": "tuesday",
    "notBefore": "0500",
    "notAfter": "0630"
  },
  {
    "gym": "Auckland City",
    "class": "ceremony",
    "day": "thursday",
    "notBefore": "0500",
    "notAfter": "0630"
  },
  {
    "gym": "Auckland City",
    "class": "ceremony",
    "day": "saturday",
    "notBefore": "0800",
    "notAfter": "0900"
  }
])


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