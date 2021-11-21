import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import vars from "./var.css";

const properties = defineProperties({
  properties: {
    color: vars.colors,
    background: vars.colors,
  },
});

export const sprinkles = createSprinkles(properties);

export type Atoms = Parameters<typeof sprinkles>[0];
