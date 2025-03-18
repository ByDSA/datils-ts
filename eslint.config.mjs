// @ts-check
import { Dependencies } from "daproj";
import { generateConfigs } from "daproj/eslint";

const generatedConfigs = await generateConfigs( {
  [Dependencies.Jest]: true,
  [Dependencies.Node]: true,
  [Dependencies.Eslint]: true,
  [Dependencies.Prettier]: true,
  [Dependencies.TypeScript]: true,
} );

export default [
  ...generatedConfigs,
];
