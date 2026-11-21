import { AbsoluteFill } from "remotion";
import { Formats } from "./scenes/Formats";
import { Handoff } from "./scenes/Handoff";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { Results } from "./scenes/Results";
import { Ring } from "./scenes/Ring";
import { Spec } from "./scenes/Spec";
import { Translator } from "./scenes/Translator";

export const SpecEnc: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      <Intro />
      <Handoff />
      <Formats />
      <Translator />
      <Ring />
      <Spec />
      <Results />
      <Outro />
    </AbsoluteFill>
  );
};
