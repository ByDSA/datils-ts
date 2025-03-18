import * as Comparators from "./comparators";
import * as Removers from "./removers";
import * as Rotation from "./rotation";

const staticModule = {
  ...Comparators,
  ...Removers,
  ...Rotation,
};

export {
  staticModule as Arrays,
};

export type {
  NonEmpty as NonEmptyArray,
  Number as NonEmptyNumberArray,
} from "./types";
