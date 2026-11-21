import { useCurrentFrame } from "remotion";
import { Headline } from "../components";
import { geist } from "../fonts";
import { C, inOut, mix, t } from "../theme";

const COLS = 13;
const ROWS = 7;
const P = 19;

export const Outro: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 1566) return null;
  const collapse = t(f, 1682, 1712, inOut);
  const words = t(f, 1706, 1736);
  const word = (side: -1 | 1, text: string) => (
    <div
      style={{
        position: "absolute",
        top: 540,
        [side < 0 ? "right" : "left"]: 960 + 56,
        transform: `translate(${-side * (1 - words) * 40}px, -50%)`,
        fontFamily: geist,
        fontWeight: 500,
        fontSize: 84,
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
        color: C.ink,
        opacity: words,
      }}
    >
      {text}
    </div>
  );
  const dots = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const d = c - (COLS - 1) / 2;
      const p = t(f, 1656 + Math.abs(d) * 1.5 + r, 1668 + Math.abs(d) * 1.5 + r);
      const solar = r === 3 && d === 0 ? t(f, 1712, 1726) : 0;
      dots.push(
        <div
          key={`${r}-${c}`}
          style={{
            position: "absolute",
            left: 960 + d * P * (1 - collapse) - 5,
            top: 540 + (r - 3) * P - 5,
            width: 10,
            height: 10,
            borderRadius: 5,
            background: solar > 0.5 ? C.solar : C.ink,
            opacity: p * (d === 0 ? 1 : 1 - t(f, 1704, 1712)),
            transform: `scale(${p * mix(1, 1.3, solar)})`,
          }}
        />,
      );
    }
  return (
    <>
      <Headline text={"Prefill once.\nHand off to any model."} size={88} cy={540} at={1570} exit={1640} />
      {dots}
      {word(-1, "ramp")}
      {word(1, "baseten")}
    </>
  );
};
