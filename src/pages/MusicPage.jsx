import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "../data/assets.js";
import { HeroBand, PageShell, SectionHeading, reveal } from "./PagePrimitives.jsx";

const musicLinks = {
  appleMusic: "https://music.apple.com/jp/artist/1571614837",
  spotify: "https://open.spotify.com/artist/6KJgRp1AZ72G46uUaFty8u",
  video: "https://youtu.be/WeOj-wUHWQw?si=AzWgc387HZl1EcEN",
};

const liveSessionThumbnails = [
  {
    image: assets.photos.liveBlueGuitar,
    className: "object-[42%_28%]",
  },
  {
    image: assets.uiMockupsReal.live.secondary,
    className: "object-[66%_28%]",
  },
  {
    image: assets.photos.liveSideVocal,
    className: "object-[45%_30%]",
  },
];

export function MusicPage() {
  return (
    <PageShell>
      <HeroBand
        label="Music"
        title="音楽"
        body={"たった１本のギターから紡ぎ出される、\n幾重にも重なる音の魔法。"}
        image={assets.uiMockupsReal.music.primary}
        imageClass="object-[center_top] md:object-[82%_center]"
      />
      <section className="mx-auto grid max-w-[1280px] gap-14 px-6 py-20 md:px-10 lg:grid-cols-[330px_1fr]">
        <div>
          <SectionHeading
            title="Original Songs"
            body={"日常の奥にある熱やまなざしを、\nアコギとルーパーで重ねて鳴らす。"}
          />
        </div>
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          {...reveal}
        >
          {[
            ["Apple Music", "Apple Musicで聴く", musicLinks.appleMusic],
            ["Spotify", "Spotifyで聴く", musicLinks.spotify],
          ].map(([service, cta, href]) => (
            <a
              key={service}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-[260px] flex-col justify-between rounded-md bg-white p-8 shadow-[var(--shadow-soft)] md:p-10"
            >
              <span>
                <span className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Streaming
                </span>
                <span className="mt-5 block text-4xl font-black leading-tight">
                  {service}
                </span>
                <span className="mt-6 block text-base leading-8 text-[var(--color-muted)]">
                  R-MANACの配信音源はこちらから。
                </span>
              </span>
              <span className="mt-8 inline-flex h-12 w-fit items-center justify-center rounded-md bg-[var(--color-accent)] px-7 text-sm font-bold text-white transition group-hover:bg-[var(--color-accent-dark)]">
                {cta}
              </span>
            </a>
          ))}
        </motion.div>
      </section>
      <section id="live-session" className="mx-auto grid max-w-[1280px] gap-12 px-6 pb-24 md:px-10 lg:grid-cols-[300px_1fr_230px]">
        <SectionHeading title="Live Session" body={"ライブの空気をそのままに。\nR-MANACのライブ映像を掲載。"} />
        <motion.a
          href={musicLinks.video}
          target="_blank"
          rel="noreferrer"
          className="relative aspect-[4/5] overflow-hidden md:h-[350px] md:aspect-auto"
          {...reveal}
        >
          <img src={assets.uiMockupsReal.music.secondary} alt="" className="h-full w-full object-cover object-[center_top]" />
          <span className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white text-white">
            <Play size={38} fill="currentColor" />
          </span>
        </motion.a>
        <div className="grid gap-5">
          {liveSessionThumbnails.map(({ image, className }) => (
            <motion.img
              key={image}
              src={image}
              alt=""
              className={`aspect-[16/9] w-full object-cover lg:h-[100px] lg:aspect-auto ${className}`}
              {...reveal}
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
