import { Easing, interpolate } from "remotion";

export const W = 1920;
export const H = 1080;
export const DURATION = 1770;

export const C = {
  ink: "#0C0A08",
  black: "#1A1919",
  off: "#D2CECB",
  paper: "#ECE8E2",
  chip: "#F1EEEA",
  solar: "#E4F222",
  white: "#FFFFFF",
};

export const out = Easing.bezier(0.16, 1, 0.3, 1);
export const inOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.6, 0, 0.9, 0.3);
export const back = Easing.bezier(0.34, 1.4, 0.64, 1);
export const linear = Easing.linear;

export const t = (f: number, a: number, b: number, e: (n: number) => number = out) =>
  interpolate(f, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: e,
  });

export const mix = (a: number, b: number, p: number) => a + (b - a) * p;

export type Kind = "square" | "hex" | "hatch" | "bars" | "plus" | "vbars";

export type Model = {
  logo: string;
  label: string;
  idx: number;
  kind: Kind;
  grid?: boolean;
  dark?: boolean;
};

export const MODELS = {
  chatgpt: { logo: "openai", label: "ChatGPT", idx: 1, kind: "square", dark: true },
  grok: { logo: "grok", label: "Grok", idx: 2, kind: "square" },
  llama: { logo: "meta-color", label: "Llama", idx: 3, kind: "square" },
  claude: { logo: "claude-color", label: "Claude", idx: 4, kind: "square", grid: true },
  gemma: { logo: "gemma-color", label: "Gemma", idx: 5, kind: "hex" },
  mistral: { logo: "mistral-color", label: "Mistral", idx: 6, kind: "bars" },
  gemini: { logo: "gemini-color", label: "Gemini", idx: 7, kind: "square" },
  qwen: { logo: "qwen-color", label: "Qwen", idx: 8, kind: "hatch", grid: true },
  deepseek: { logo: "deepseek-color", label: "DeepSeek", idx: 9, kind: "plus" },
  kimi: { logo: "kimi-color", label: "Kimi", idx: 10, kind: "vbars" },
} satisfies Record<string, Model>;

export type ModelKey = keyof typeof MODELS;

export const RING: Model[] = [
  { logo: "qwen-color", label: "Qwen3.5", idx: 1, kind: "hatch", grid: true },
  { logo: "qwen-color", label: "Qwen3", idx: 2, kind: "hatch", grid: true },
  { logo: "meta-color", label: "Llama 3.1", idx: 3, kind: "square" },
  { logo: "gemma-color", label: "Gemma 3", idx: 4, kind: "hex" },
  { logo: "gemma-color", label: "Gemma 4", idx: 5, kind: "hex" },
  { logo: "mistral-color", label: "Ministral 3 8B", idx: 6, kind: "bars" },
  { logo: "mistral-color", label: "Ministral 3 14B", idx: 7, kind: "bars" },
];

export const ringPt = (k: number, cx: number, cy: number, r: number) => {
  const a = -Math.PI / 2 + (k * 2 * Math.PI) / 7;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
};

export const TW = 526;
export const TH = 461;
export const UW = 624;
