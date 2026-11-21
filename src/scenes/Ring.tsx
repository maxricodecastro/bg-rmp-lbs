import { useCurrentFrame } from "remotion";
import { Card, Chip, Dash, Headline, Lines, Mono, Tile } from "../components";
import { geist } from "../fonts";
import { C, RING, back, easeIn, inOut, mix, ringPt, t } from "../theme";
import { CY } from "./Translator";

const CX = 860;
const RY = 665;
const TW2 = 176;
const TH2 = 154;

const PAIRS: [number, number][] = [];
for (let d = 1; d <= 3; d++) for (let a = 0; a < 7; a++) PAIRS.push([a, (a + d) % 7]);

export const Ring: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 798 || f >= 1108) return null;
  const exit = t(f, 1075, 1097, inOut);
  const webFade = 1 - t(f, 925, 940, inOut);
  const mv = t(f, 1078, 1108, inOut);
  const cardPop = t(f, 960, 984, back);
  let count = 0;
  const web = PAIRS.map(([a, b], i) => {
    const p1 = ringPt(a, CX, RY, 315);
    const p2 = ringPt(b, CX, RY, 315);
    const s0 = 834 + i * 3;
    const chips = [1 / 3, 2 / 3].map((k) => {
      const cs = s0 + 14 * k;
      if (f >= cs) count++;
      return { x: mix(p1[0], p2[0], k), y: mix(p1[1], p2[1], k), pop: t(f, cs, cs + 8, back) };
    });
    return { p1, p2, p: t(f, s0, s0 + 14, inOut), chips };
  });
  const n = f < 975 ? count : Math.round(mix(42, 1, t(f, 975, 1002)));
  return (
    <>
      <Lines opacity={webFade}>
        {web.map((l, i) => (
          <Dash key={i} pts={[l.p1, l.p2]} p={l.p} opacity={0.22} />
        ))}
      </Lines>
      <div style={{ position: "absolute", inset: 0, opacity: webFade }}>
        {web.flatMap((l, i) => l.chips.map((c, k) => <Chip key={`${i}-${k}`} cx={c.x} cy={c.y} pop={c.pop} />))}
      </div>
      <Lines opacity={1 - exit}>
        {RING.map((_, k) => (
          <Dash key={k} pts={[ringPt(k, CX, RY, 320), [CX, RY]]} p={t(f, 994 + k * 2, 1014 + k * 2, inOut)} opacity={0.35} />
        ))}
      </Lines>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - exit }}>
        {RING.map((_, k) => {
          const [x, y] = ringPt(k, CX, RY, 320 - 118);
          return <Chip key={k} cx={x} cy={y} pop={t(f, 1002 + k * 2, 1012 + k * 2, back)} />;
        })}
      </div>
      <Card
        cx={mix(CX, 960, mv)}
        cy={mix(RY, CY, mv)}
        variant="solar"
        top="Any → any"
        bottom="Speculative Encoding"
        scale={mix(0.8, 1, cardPop)}
        opacity={t(f, 960, 970)}
      />
      {RING.map((m, k) => {
        let r: number;
        let o: number;
        let sc = 1;
        if (f < 962) {
          const fly = t(f, 932 + k, 958 + k, easeIn);
          r = mix(315, 900, fly);
          o = t(f, 802 + k * 4, 812 + k * 4);
          sc = mix(0.7, 1, t(f, 802 + k * 4, 824 + k * 4, back));
        } else {
          r = mix(900, 320, t(f, 968 + k * 2, 1000 + k * 2));
          o = 1 - exit;
          sc = mix(1, 0.9, exit);
        }
        const [x, y] = ringPt(k, CX, RY, r);
        return <Tile key={k} model={m} x={x - TW2 / 2} y={y - TH2 / 2} w={TW2} h={TH2} opacity={o} scale={sc} />;
      })}
      <Mono x={1610} y={770} center opacity={t(f, 828, 840) * 0.6 * (1 - exit)}>
        Translators
      </Mono>
      <div
        style={{
          position: "absolute",
          left: 1410,
          width: 400,
          top: 790,
          textAlign: "center",
          fontFamily: geist,
          fontWeight: 500,
          fontSize: 200,
          letterSpacing: "-0.04em",
          lineHeight: 1.15,
          fontVariantNumeric: "tabular-nums",
          color: C.ink,
          opacity: t(f, 828, 840) * (1 - exit),
        }}
      >
        {n}
      </div>
      <Headline
        text={"But every model pair needs its own translator:\n42 for just 7 models."}
        size={60}
        cy={149}
        at={800}
        exit={925}
      />
      <Headline
        text={"Speculative Encoding replaces all of them\nwith one translator."}
        size={60}
        cy={149}
        at={968}
        exit={1075}
      />
    </>
  );
};
