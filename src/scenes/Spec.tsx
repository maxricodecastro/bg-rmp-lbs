import { useCurrentFrame } from "remotion";
import { Card, Dash, Headline, Lines, MiniCache, Mono, Unit } from "../components";
import { ModelKey, back, inOut, mix, t } from "../theme";
import { CY, LX, L_EDGE, RX } from "./Translator";

const TARGETS: [ModelKey, number][] = [
  ["gemma", 420],
  ["qwen", 640],
  ["mistral", 860],
];

export const Spec: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 1108 || f >= 1402) return null;
  const slide = t(f, 1108, 1140);
  const mvB = t(f, 1228, 1268, inOut);
  const exit = t(f, 1380, 1400, inOut);
  const pipeA = t(f, 1130, 1150, inOut);
  const pipeAFade = 1 - t(f, 1220, 1232);
  const a = t(f, 1152, 1182, inOut);
  const b = t(f, 1184, 1212, inOut);
  const pipeB = t(f, 1268, 1296, inOut);
  const c = t(f, 1294, 1318, inOut);
  const gemFill = f < 1232 ? t(f, 1208, 1222) : f < 1300 ? 1 - t(f, 1232, 1250) : t(f, 1320, 1336);
  const lx = mix(mix(-420, LX, slide), 90, mvB);
  const ly = mix(470, 524.75, mvB);
  const ls = mix(0.55, 0.5, mvB);
  const gx = mix(mix(2000, RX, slide), 1360, mvB);
  const gy = mix(470, 420 - 83, mvB);
  const gs = mix(0.55, 0.36, mvB);
  const ccx = mix(960, 830, mvB);
  const ccy = mix(CY, 640, mvB);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - exit }}>
      <Lines opacity={pipeAFade}>
        {[-22, 22].map((d) => (
          <Dash key={d} pts={[[L_EDGE, CY + d], [810, CY + d]]} p={pipeA} />
        ))}
        {[-22, 22].map((d) => (
          <Dash key={d} pts={[[1110, CY + d], [RX, CY + d]]} p={pipeA} />
        ))}
      </Lines>
      <Lines>
        {[-20, 20].map((d) => (
          <Dash key={d} pts={[[353, 640 + d], [700, 640 + d]]} p={pipeB} />
        ))}
        {TARGETS.map(([k, cy]) => (
          <Dash key={k} pts={[[960, 640], [1180, 640], [1180, cy], [1360, cy]]} p={pipeB} opacity={0.35} />
        ))}
      </Lines>
      <MiniCache x={mix(L_EDGE + 16, 690, a)} cy={CY} kind="square" opacity={t(f, 1152, 1158) * (1 - t(f, 1176, 1182))} />
      <MiniCache x={mix(1110, RX - 136, b)} cy={CY} kind="hex" opacity={t(f, 1184, 1190) * (1 - t(f, 1206, 1212))} />
      <MiniCache x={mix(370, 580, c)} cy={640} kind="square" opacity={t(f, 1294, 1300) * (1 - t(f, 1312, 1318))} />
      <Unit model="llama" x={lx} y={ly} s={ls} />
      <Unit model="gemma" x={gx} y={gy} s={gs} fill={gemFill} />
      {TARGETS.slice(1).map(([k, cy], i) => {
        const pop = t(f, 1262 + i * 5, 1284 + i * 5);
        return (
          <Unit
            key={k}
            model={k}
            x={1360 + (1 - pop) * 40}
            y={cy - 83}
            s={0.36}
            opacity={pop}
            fill={t(f, 1324 + i * 4, 1340 + i * 4)}
          />
        );
      })}
      {TARGETS.map(([k, cy], i) => (
        <Mono key={k} x={1615} y={cy - 11} opacity={t(f, 1340 + i * 4, 1354 + i * 4) * 0.75}>
          Prefill · 0 tokens
        </Mono>
      ))}
      <Card
        cx={ccx}
        cy={ccy}
        variant="solar"
        top="Any → any"
        bottom="Speculative Encoding"
        scale={mix(1, 260 / 300, mvB) * mix(1, 1.04, Math.sin(Math.PI * t(f, 1180, 1190, back)))}
      />
      <Mono x={960} y={CY + 160} center size={16} opacity={t(f, 1140, 1154) * 0.5 * pipeAFade}>
        Encode once · decode into any model’s format
      </Mono>
      <Headline
        text={"It converts any model’s KV cache\ninto any other model’s."}
        size={64}
        cy={184}
        at={1112}
        exit={1220}
      />
      <Headline text="So the new model skips the prefill." cy={191} at={1250} />
    </div>
  );
};
