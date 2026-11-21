import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { geist, geistMono } from "./fonts";
import { C, H, Kind, MODELS, Model, ModelKey, TH, TW, W, inOut, mix, t } from "./theme";

export const Headline: React.FC<{
  text: string;
  cy: number;
  at: number;
  size?: number;
  exit?: number;
  scale?: number;
}> = ({ text, cy, at, size = 72, exit, scale = 1 }) => {
  const f = useCurrentFrame();
  const o = exit === undefined ? 1 : 1 - t(f, exit, exit + 14, inOut);
  if (o <= 0 || f < at) return null;
  let i = 0;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        width: W,
        top: cy,
        transform: `translateY(-50%) scale(${scale})`,
        textAlign: "center",
        fontFamily: geist,
        fontWeight: 500,
        fontSize: size,
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
        color: C.ink,
        opacity: o,
      }}
    >
      {text.split("\n").map((line, li) => {
        const words = line.split(" ");
        return (
          <div key={li}>
            {words.map((w, wi) => {
              const p = t(f, at + i * 2, at + i * 2 + 14);
              i++;
              return (
                <span
                  key={wi}
                  style={{
                    display: "inline-block",
                    marginRight: wi < words.length - 1 ? "0.26em" : 0,
                    opacity: p,
                    transform: `translateY(${(1 - p) * 0.3}em)`,
                    filter: p < 1 ? `blur(${(1 - p) * 6}px)` : undefined,
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const Mono: React.FC<{
  x: number;
  y: number;
  size?: number;
  opacity?: number;
  center?: boolean;
  color?: string;
  children: React.ReactNode;
}> = ({ x, y, size = 18, opacity = 0.65, center, color = C.ink, children }) =>
  opacity <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: center ? "translateX(-50%)" : undefined,
        fontFamily: geistMono,
        fontSize: size,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        lineHeight: 1.2,
        color,
        opacity,
      }}
    >
      {children}
    </div>
  );

const Paper: React.FC = () => (
  <Img
    src={staticFile("paper.png")}
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
  />
);

export const Tile: React.FC<{
  model: Model;
  x: number;
  y: number;
  w: number;
  h: number;
  opacity?: number;
  scale?: number;
}> = ({ model, x, y, w, h, opacity = 1, scale = 1 }) => {
  if (opacity <= 0) return null;
  const fs = Math.max(11, Math.min(w, h) * 0.06);
  const col = model.dark ? C.white : C.ink;
  const g = w / 14.5;
  const ls = Math.min(w, h) * 0.42;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: w * 0.04,
        overflow: "hidden",
        background: model.dark ? C.black : C.paper,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {model.dark ? null : <Paper />}
      {model.grid ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(12,10,8,0.06) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(12,10,8,0.06) 1.5px, transparent 1.5px)",
            backgroundSize: `${g}px ${g}px`,
            backgroundPosition: `${g - 1}px ${g - 1}px`,
          }}
        />
      ) : null}
      <Img
        src={staticFile(`logos/${model.logo}.svg`)}
        style={{
          position: "absolute",
          left: (w - ls) / 2,
          top: (h - ls) / 2 - h * 0.013,
          width: ls,
          height: ls,
          filter: model.dark ? "invert(1)" : undefined,
        }}
      />
      <Mono x={fs * 0.87} y={fs * 0.75} size={fs} opacity={0.5} color={col}>
        {String(model.idx).padStart(2, "0")}
      </Mono>
      <Mono x={fs * 0.87} y={h - fs * 2.15} size={fs} opacity={0.7} color={col}>
        {model.label}
      </Mono>
    </div>
  );
};

const PITCH: Record<Kind, [number, number]> = {
  square: [20, 20],
  hex: [15, 13],
  hatch: [20, 20],
  bars: [18, 14],
  plus: [20, 20],
  vbars: [14, 18],
};

const shape = (k: Kind, cx: number, cy: number, s: number, fill: string, o: number, key: string) => {
  const p = { key, fill, opacity: o };
  switch (k) {
    case "square":
      return <circle {...p} cx={cx} cy={cy} r={3.5 * s} />;
    case "hex":
      return <circle {...p} cx={cx} cy={cy} r={2.75 * s} />;
    case "hatch":
      return <rect {...p} x={cx - s} y={cy - 8 * s} width={2 * s} height={16 * s} transform={`rotate(35 ${cx} ${cy})`} />;
    case "bars":
      return <rect {...p} x={cx - 5.5 * s} y={cy - 1.5 * s} width={11 * s} height={3 * s} />;
    case "vbars":
      return <rect {...p} x={cx - 1.5 * s} y={cy - 5.5 * s} width={3 * s} height={11 * s} />;
    case "plus":
      return (
        <g {...p}>
          <rect x={cx - 5 * s} y={cy - 1.25 * s} width={10 * s} height={2.5 * s} />
          <rect x={cx - 1.25 * s} y={cy - 5 * s} width={2.5 * s} height={10 * s} />
        </g>
      );
  }
};

export const Pattern: React.FC<{
  w: number;
  h: number;
  kind: Kind;
  fill?: number;
  ps?: number;
  color?: string;
  offColor?: string;
}> = ({ w, h, kind, fill = 1, ps = 1, color = C.ink, offColor = C.off }) => {
  const px = PITCH[kind][0] * ps;
  const py = PITCH[kind][1] * ps;
  const cols = Math.max(1, Math.floor(w / px));
  const rows = Math.max(1, Math.floor(h / py));
  const ox = (w - (cols - 1) * px) / 2;
  const oy = (h - (rows - 1) * py) / 2;
  const els: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const on = Math.min(1, Math.max(0, fill * cols - c));
      const cx = ox + c * px + (kind === "hex" ? (r % 2 ? px / 4 : -px / 4) : 0);
      const cy = oy + r * py;
      if (on < 1) els.push(shape(kind, cx, cy, ps, offColor, 0.9, `o${r}-${c}`));
      if (on > 0) els.push(shape(kind, cx, cy, ps, color, on, `i${r}-${c}`));
    }
  return (
    <svg width={w} height={h} style={{ position: "absolute", left: 0, top: 0 }}>
      {els}
    </svg>
  );
};

export const Cache: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  kind: Kind;
  fill?: number;
  ps?: number;
  pad?: [number, number];
  radius?: number;
  opacity?: number;
  scale?: number;
}> = ({ x, y, w = 300, h = 200, kind, fill = 1, ps = 1.25, pad = [16, 14], radius = 10, opacity = 1, scale = 1 }) =>
  opacity <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: radius,
        overflow: "hidden",
        background: C.paper,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <Paper />
      <div style={{ position: "absolute", left: pad[0], top: pad[1] }}>
        <Pattern w={w - pad[0] * 2} h={h - pad[1] * 2} kind={kind} fill={fill} ps={ps} />
      </div>
    </div>
  );

export const MiniCache: React.FC<{ x: number; cy: number; kind: Kind; opacity: number }> = ({ x, cy, kind, opacity }) => (
  <Cache x={x} y={cy - 17} w={120} h={34} kind={kind} ps={0.62} pad={[8, 6]} radius={5} opacity={opacity} />
);

export const Unit: React.FC<{
  model: ModelKey;
  x: number;
  y: number;
  s?: number;
  fill?: number;
  pop?: number;
  opacity?: number;
}> = ({ model, x, y, s = 1, fill = 1, pop = 1, opacity = 1 }) =>
  opacity <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transformOrigin: "0 0",
        transform: `translate(${x}px, ${y}px) scale(${s})`,
        opacity,
      }}
    >
      <Tile model={MODELS[model]} x={0} y={0} w={TW} h={TH} />
      <Cache x={324} y={316} kind={MODELS[model].kind} fill={fill} opacity={pop} scale={mix(0.8, 1, pop)} />
    </div>
  );

export const Card: React.FC<{
  cx: number;
  cy: number;
  variant: "dark" | "solar";
  top: string;
  bottom: string;
  scale?: number;
  opacity?: number;
}> = ({ cx, cy, variant, top, bottom, scale = 1, opacity = 1 }) => {
  if (opacity <= 0) return null;
  const w = 300;
  const h = 263;
  const fg = variant === "dark" ? C.white : C.ink;
  return (
    <div
      style={{
        position: "absolute",
        left: cx - w / 2,
        top: cy - h / 2,
        width: w,
        height: h,
        borderRadius: 12,
        background: variant === "dark" ? C.black : C.solar,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div style={{ position: "absolute", left: 40, top: 84 }}>
        <Pattern w={90} h={95} kind="square" ps={0.85} color={fg} />
      </div>
      <div style={{ position: "absolute", left: 170, top: 84 }}>
        <Pattern w={90} h={95} kind="hex" ps={0.95} color={fg} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: w,
          top: 112,
          textAlign: "center",
          fontFamily: geist,
          fontSize: 28,
          lineHeight: "40px",
          color: fg,
          opacity: 0.8,
        }}
      >
        →
      </div>
      <Mono x={14} y={12} size={15.5} opacity={0.55} color={fg}>
        {top}
      </Mono>
      <Mono x={14} y={h - 33} size={15.5} opacity={0.85} color={fg}>
        {bottom}
      </Mono>
    </div>
  );
};

export const Chip: React.FC<{ cx: number; cy: number; pop: number; size?: number }> = ({ cx, cy, pop, size = 13 }) =>
  pop <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: cx - size / 2,
        top: cy - size / 2,
        width: size,
        height: size,
        borderRadius: size * 0.25,
        background: C.black,
        transform: `scale(${pop})`,
      }}
    />
  );

export const Lines: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0, opacity }}>
    {children}
  </svg>
);

export const Dash: React.FC<{ pts: (readonly [number, number])[]; p?: number; opacity?: number }> = ({
  pts,
  p = 1,
  opacity = 0.3,
}) => {
  if (p <= 0) return null;
  const lens = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]));
  let remain = lens.reduce((a, b) => a + b, 0) * p;
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < lens.length && remain > 0; i++) {
    const k = Math.min(1, remain / lens[i]);
    d += ` L ${mix(pts[i][0], pts[i + 1][0], k)} ${mix(pts[i][1], pts[i + 1][1], k)}`;
    remain -= lens[i];
  }
  return <path d={d} fill="none" stroke={C.ink} strokeOpacity={opacity} strokeWidth={2} strokeDasharray="8 8" />;
};
