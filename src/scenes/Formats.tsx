import { interpolate, useCurrentFrame } from "remotion";
import { Headline, Mono, Unit } from "../components";
import { ModelKey, inOut, mix, t } from "../theme";

const ROW: [number, ModelKey][] = [
  [-2, "kimi"],
  [-1, "deepseek"],
  [0, "llama"],
  [1, "gemma"],
  [2, "qwen"],
  [3, "mistral"],
];

export const Formats: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 460 || f >= 645) return null;
  const tr = t(f, 460, 506, inOut);
  const mv = t(f, 605, 645, inOut);
  const gone = t(f, 598, 620, inOut);
  const drift = interpolate(f, [472, 605], [0, 290], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const base = mix(648, 500, tr) + drift;
  const pitch = mix(1100, 444, tr);
  const s = mix(mix(1, 0.6, tr), 0.55, mv);
  const y = mix(mix(350, 420, tr), 470, mv);
  return (
    <>
      {ROW.map(([j, key]) => {
        const x0 = base + j * pitch;
        if (key === "llama") return <Unit key={key} model={key} x={mix(x0, 110, mv)} y={y} s={s} />;
        const show = t(f, 466 + Math.abs(j) * 4, 492 + Math.abs(j) * 4);
        if (key === "gemma")
          return (
            <Unit key={key} model={key} x={mix(x0, 1466.8, mv)} y={y} s={s} opacity={show} fill={1 - t(f, 612, 640)} />
          );
        return <Unit key={key} model={key} x={x0} y={y + gone * 20} s={s} opacity={show * (1 - gone)} />;
      })}
      <Mono x={648 + 474} y={884} center opacity={0.65 * (1 - t(f, 460, 470))}>
        KV cache · full
      </Mono>
      <Headline text="Why not just pass along the KV cache?" cy={191} at={-100} exit={460} />
      <Headline text="Every model stores context in its own format." cy={191} at={480} exit={598} />
    </>
  );
};
