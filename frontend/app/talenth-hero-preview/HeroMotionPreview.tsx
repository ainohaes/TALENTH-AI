"use client";

import Image from "next/image";

export default function HeroMotionPreview() {
  return (
    <main className="talenthPreviewPage">
      <header className="talenthPreviewHeader">
        <p className="talenthPreviewEyebrow">TALENTH-AI · BASE DEL HERO</p>
        <h1 className="talenthPreviewTitle">Composición original</h1>
        <p className="talenthPreviewDescription">
          Menú, logotipo y cuadrícula juntos, tal como aparecen en el diseño
          completo.
        </p>
      </header>

      <section className="talenthPreviewStageArea" aria-label="Vista previa del hero">
        <div className="talenthPreviewStage">
          <Image
            className="talenthPreviewArtwork"
            src="/talenth-hero-motion/hero-complete-design.png"
            alt="Composición completa del hero TalentH-AI con el menú, logotipo, cuadrícula y elementos originales."
            fill
            priority
            sizes="(max-width: 700px) 100vw, 1500px"
          />
        </div>
      </section>

      <footer className="talenthPreviewFooter">
        <p className="talenthPreviewNote">
          Revisión de la base visual · el CDR original permanece intacto · la
          animación aún no está aplicada
        </p>
      </footer>
    </main>
  );
}
