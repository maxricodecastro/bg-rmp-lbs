import { useCurrentFrame } from "remotion";
import { Headline, Mono } from "../components";
import { geist } from "../fonts";
import { C, inOut, t } from "../theme";

const Bar: React.FC<{ x: number; rows: number; on: boolean; at: number }> = ({ x, rows, on, at }) => {
  const f = useCurrentFrame();
  const dots = [];
  for (let r = 0; r < rows; r++) {
    const p = t(f, at + r * 2, at + r * 2 + 8);
    for (let c = 0; c < 4; c++)
      dots.push(
        <div
          key={`${r}-${c}`}
          style={{
            position: "absolute",
            left: x + c * 19,
            top: 960 - (r + 1) * 19,
            width: 10,
            height: 10,
            borderRadius: 5,
            background: on ? C.ink : C.off,
            opacity: p,
            transform: `scale(${p})`,
          }}
        />,
      );
  }
  const top = t(f, at + rows * 2 + 4, at + rows * 2 + 16);
  return (
    <>
      {dots}
      {on ? (
        <div
          style={{
            position: "absolute",
            left: x + 26,
            top: 960 - rows * 19 - 30,
            width: 14,
            height: 14,
            borderRadius: 7,
            background: C.solar,
            transform: `scale(${top})`,
          }}
        />
      ) : null}
    </>
  );
};

const Col: React.FC<{
  cx: number;
  label: string;
  value: string;
  rows: [number, number];
  names: [string, string];
  foot: string;
  at: number;
}> = ({ cx, label, value, rows, names, foot, at }) => {
  const f = useCurrentFrame();
  const o = t(f, at, at + 14);
  return (
    <>
      <Mono x={cx} y={320} center opacity={o * 0.6}>
        {label}
      </Mono>
      <div
        style={{
          position: "absolute",
          left: cx - 400,
          width: 800,
          top: 345,
          textAlign: "center",
          fontFamily: geist,
          fontWeight: 500,
          fontSize: 170,
          letterSpacing: "-0.04em",
          lineHeight: 1.15,
          fontVariantNumeric: "tabular-nums",
          color: C.ink,
          opacity: o,
          transform: `translateY(${(1 - o) * 24}px)`,
        }}
      >
        {value}
      </div>
      <Bar x={cx - 40 - 76} rows={rows[0]} on={false} at={at + 6} />
      <Bar x={cx + 40} rows={rows[1]} on at={at + 12} />
      <Mono x={cx - 40 - 43} y={976} center size={15} opacity={o * 0.65}>
        {names[0]}
      </Mono>
      <Mono x={cx + 40 + 33} y={976} center size={15} opacity={o * 0.65}>
        {names[1]}
      </Mono>
      <Mono x={cx} y={1022} center size={15} opacity={o * 0.45}>
        {foot}
      </Mono>
    </>
  );
};

export const Results: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 1400 || f >= 1568) return null;
  const exit = t(f, 1546, 1566, inOut);
  const a = t(f, 1418, 1470);
  const b = t(f, 1432, 1484);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - exit }}>
      <Headline text="And it keeps 95.6% of the new model’s accuracy." cy={191} at={1404} />
      <Col
        cx={560}
        label="Accuracy retained"
        value={`${(95.6 * a).toFixed(1)}%`}
        rows={[20, 19]}
        names={["Native", "Translated"]}
        foot="42 model pairs · 12 benchmarks"
        at={1418}
      />
      <Col
        cx={1360}
        label="Faster time to first token"
        value={`${(1 + 1.86 * b).toFixed(2)}×`}
        rows={[20, 7]}
        names={["Re-prefill", "Translated"]}
        foot="128k context · one H200"
        at={1432}
      />
    </div>
  );
};
