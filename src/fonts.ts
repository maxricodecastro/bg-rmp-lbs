import { loadFont } from "@remotion/google-fonts/Geist";
import { loadFont as loadMono } from "@remotion/google-fonts/GeistMono";

export const { fontFamily: geist } = loadFont("normal", {
  weights: ["500"],
  subsets: ["latin"],
});

export const { fontFamily: geistMono } = loadMono("normal", {
  weights: ["400"],
  subsets: ["latin"],
});
