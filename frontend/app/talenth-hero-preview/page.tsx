import type { Metadata } from "next";
import HeroMotionPreview from "./HeroMotionPreview";
import "./talenth-preview.css";

export const metadata: Metadata = {
  title: "TalentH-AI | Hero composition preview",
  description:
    "Vista previa completa del hero TalentH-AI con su menú, logotipo y cuadrícula.",
};

export default function TalentHHeroPreviewPage() {
  return <HeroMotionPreview />;
}
