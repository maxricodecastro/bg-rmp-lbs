import { useCurrentFrame } from "remotion";
import { Dash, Headline, Lines, Mono, Unit } from "../components";
import { geistMono } from "../fonts";
import { C, back, inOut, linear, mix, t } from "../theme";

const WORDS =
  "the Q3 report shows revenue grew 18% while costs fell across every region and margins expanded for the third straight quarter as new customers signed".split(
    " ",
  );
const widths = WORDS.map((w) => w.length * 12.1 + 28);
const GAP = 10;
const total = widths.reduce((a, b) => a + b + GAP, 0);

export const Handoff: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 180 || f >= 460) return null;
  const rise = t(f, 186, 228);
  const riseG = t(f, 191, 233);
  const apart = t(f, 238, 274, inOut);
  const exit = t(f, 362, 384, inOut);
  const center = t(f, 372, 412, inOut);
  const popL = t(f, 264, 282, back);
  const popG = t(f, 271, 289, back);
  const pipe = t(f, 282, 302, inOut);
  const fill = t(f, 302, 358, linear) * 0.42;
  const lx = mix(mix(404, 50, apart), 648, center);
  const gx = mix(990, 1246, apart) + exit * 60;
  const cy = 350 + 230;
  let cum = 0;
  return (
    <>
      <Lines opacity={1 - exit}>
        <Dash pts={[[576, cy - 32], [1246, cy - 32]]} p={pipe} />
        <Dash pts={[[576, cy + 32], [1246, cy + 32]]} p={pipe} />
      </Lines>
      <div
        style={{
          position: "absolute",
          left: 576,
          top: cy - 26,
          width: 670,
          height: 52,
          overflow: "hidden",
          opacity: t(f, 296, 306) * (1 - exit),
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {WORDS.map((w, i) => {
          const x = cum - total + 500 + (f - 296) * 6.5;
          cum += widths[i] + GAP;
          if (x > 700 || x + widths[i] < -20) return null;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: 8,
                width: widths[i],
                height: 36,
                borderRadius: 6,
                background: C.chip,
                fontFamily: geistMono,
                fontSize: 20,
                lineHeight: "36px",
                textAlign: "center",
                color: C.ink,
              }}
            >
              {w}
            </div>
          );
        })}
      </div>
      <Unit model="llama" x={lx} y={mix(1120, 350, rise)} pop={popL} />
      <Unit model="gemma" x={gx} y={mix(1120, 350, riseG)} pop={popG} fill={fill} opacity={1 - exit} />
      <Mono x={lx + 474} y={884} center opacity={popL * 0.65}>
        KV cache · full
      </Mono>
      <Mono x={gx + 474} y={884} center opacity={popG * 0.65 * (1 - exit)}>
        {f < 302
          ? "KV cache · empty"
          : `Prefill · ${(Math.round((fill / 0.42) * 268) * 100).toLocaleString("en-US")} / 64,000`}
      </Mono>
      <Headline
        text="But when a task moves to a new model,"
        size={88}
        cy={mix(540, 191, rise)}
        scale={mix(1, 72 / 88, rise)}
        at={-100}
        exit={362}
      />
      <Headline text="it has to prefill the entire context again." cy={985} at={314} exit={362} />
      <Headline text="Why not just pass along the KV cache?" cy={191} at={396} />
    </>
  );
};
