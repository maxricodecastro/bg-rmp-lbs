# Speculative Encoding launch video (Remotion)

- Studio: `npm run dev` (http://localhost:3000)
- Typecheck: `npm run lint`
- Render: `npm run render` -> out/spec-enc.mp4
- Composition `SpecEnc`: 1920x1080, 30fps, 59s (DURATION in src/theme.ts). One global timeline: each scene in src/scenes reads the absolute frame and renders only in its range; elements that carry across scenes must match position at the boundary frame. Shared pieces in src/components.tsx.
- Remotion pinned to 4.0.543 (keep all @remotion/* packages on the same exact version).
- Style reference: Ramp Labs videos — white bg, one centered headline (1-2 lines) with one accent-colored word, simple diagram below with small grey labels, monospace numbers.
- Source material: ~/Downloads/spec-enc-draft1.pdf (paper), ~/Downloads/bd0c7d9285bb5140abeb5f3843089539.mov (previous draft video; keep its disc-stack collapse -> logo ending).

## Visual decisions (Figma file uc1MjbxPmOIjisljVUohzh, Storyboard page, exploration board)
- Brand: Ramp "Solar System". Lausanne (stand-in Figtree) + IBM Plex Mono uppercase labels. Paper ground #F4F2F0 w/ grain; reveal on blurred Smolder ground. Solar #E4F222 only for Speculative Encoding (the "sun").
- Models = paper-disc planets with the real company logo in brand color (exploration A2 option C). Logos: @lobehub/icons-static-svg (MIT) *-color.svg.
- KV cache = paper card with a dot grid that lifts off the model (B2).
- Own format = one grid style per family: square (Llama), hex (Gemma), hatch (Qwen) (D1).
- Rules: NO drop shadows and NO strokes/outlines on shapes (looks vibe-coded). Thin connector lines are OK.
- Model labels = model name only, never the company: ChatGPT, Claude, Gemini, Grok, Llama, Gemma, Qwen, Mistral, DeepSeek.
- Typeface: Geist (headlines, Medium) + Geist Mono (labels).
