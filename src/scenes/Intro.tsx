import { useCurrentFrame } from "remotion";
import { Headline, Tile } from "../components";
import { MODELS, ModelKey, back, inOut, mix, t } from "../theme";

const TILES: [number, number, number, number, ModelKey][] = [
  [110, 73, 347, 304, "chatgpt"],
  [809, 39, 275, 241, "gemini"],
  [1436, 166, 347, 304, "claude"],
  [18, 651, 229, 201, "grok"],
  [514, 776, 347, 304, "llama"],
  [1472, 776, 275, 241, "gemma"],
  [530, 92, 220, 190, "qwen"],
  [1084, 749, 146, 127, "mistral"],
  [1700, 560, 180, 158, "deepseek"],
];

export const Intro: React.FC = () => {
  const f = useCurrentFrame();
  if (f >= 180) return null;
  const shrink = t(f, 60, 92, inOut);
  return (
    <>
      {TILES.map(([x, y, w, h, key], i) => {
        const pop = t(f, 66 + i * 3, 88 + i * 3, back);
        const gone = t(f, 134 + i * 2, 154 + i * 2, inOut);
        const dx = (x + w / 2 - 960) * 0.012;
        const dy = (y + h / 2 - 540) * 0.012;
        const drift = Math.max(0, f - 66) / 60;
        return (
          <Tile
            key={key}
            model={MODELS[key]}
            x={x + dx * drift + Math.sin(f / 38 + i) * 3}
            y={y + dy * drift + Math.cos(f / 44 + i * 2) * 3}
            w={w}
            h={h}
            opacity={t(f, 66 + i * 3, 76 + i * 3) * (1 - gone)}
            scale={mix(0.7, 1, pop) * mix(1, 0.86, gone)}
          />
        );
      })}
      <Headline
        text={"AI products now split work\nacross multiple models."}
        size={88}
        cy={540}
        at={6}
        exit={138}
        scale={mix(1, 61 / 88, shrink)}
      />
      <Headline text="But when a task moves to a new model," size={88} cy={540} at={160} />
    </>
  );
};
