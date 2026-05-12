import { green, red, yellow } from "kolorist";

export const logger = {
  success(message: string): void {
    console.log(green(message));
  },
  warn(message: string): void {
    console.warn(yellow(message));
  },
  error(message: string): void {
    console.error(red(message));
  },
  info(message: string): void {
    console.log(message);
  },
};
