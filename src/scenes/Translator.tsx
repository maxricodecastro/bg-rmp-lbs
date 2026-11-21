import { useCurrentFrame } from "remotion";
import { Card, Dash, Headline, Lines, MiniCache, Mono, Unit } from "../components";
import { back, inOut, mix, t } from "../theme";

export const CY = 470 + (461 * 0.55) / 2;
export const LX = 110;
export const RX = 1466.8;
export const L_EDGE = LX + 526 * 0.55;

export const Translator: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 645 || f >= 800) return null;
  const exit = t(f, 776, 798, inOut);
  const pop = t(f, 655, 677, back);
  const pipe = t(f, 668, 690, inOut);
  const a = t(f, 692, 722, inOut);
  const b = t(f, 724, 754, inOut);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - exit, transform: `scale(${mix(1, 0.96, exit)})` }}>
      <Lines>
        {[-22, 22].map((d) => (
          <Dash key={d} pts={[[L_EDGE, CY + d], [810, CY + d]]} p={pipe} />
        ))}
        {[-22, 22].map((d) => (
          <Dash key={d} pts={[[1110, CY + d], [RX, CY + d]]} p={pipe} />
        ))}
      </Lines>
      <MiniCache x={mix(L_EDGE + 16, 690, a)} cy={CY} kind="square" opacity={t(f, 692, 698) * (1 - t(f, 716, 722))} />
      <MiniCache x={mix(1110, RX - 136, b)} cy={CY} kind="hex" opacity={t(f, 724, 730) * (1 - t(f, 748, 754))} />
      <Unit model="llama" x={LX} y={470} s={0.55} />
      <Unit model="gemma" x={RX} y={470} s={0.55} fill={t(f, 750, 766)} />
      <Card
        cx={960}
        cy={CY + mix(-24, 0, pop)}
        variant="dark"
        top="Llama → Gemma"
        bottom="Translator"
        scale={mix(0.9, 1, pop)}
        opacity={t(f, 655, 667)}
      />
      <Mono x={960} y={CY + 160} center size={16} opacity={t(f, 672, 686) * 0.5}>
        Prior work (SwaT) · one translator per pair
      </Mono>
      <Headline text={"Earlier work fixed this with a translator\nbetween two models."} size={64} cy={184} at={648} />
    </div>
  );
};
