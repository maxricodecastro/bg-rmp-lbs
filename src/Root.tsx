import { Composition } from "remotion";
import { SpecEnc } from "./SpecEnc";
import { DURATION } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SpecEnc"
      component={SpecEnc}
      durationInFrames={DURATION}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
