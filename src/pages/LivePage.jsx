import { motion } from "framer-motion";
import { assets } from "../data/assets.js";
import { featuredLive, isLiveVisible } from "../data/site.js";
import { ButtonLink, HeroBand, PageShell, SectionHeading, reveal } from "./PagePrimitives.jsx";

export function LivePage() {
  const showFeaturedLive = isLiveVisible();

  return (
    <PageShell>
      <HeroBand
        label="Live"
        title="ライブ情報"
        body="音が重なり、会場が揺れ、心が共鳴する。"
        image={assets.uiMockupsReal.live.primary}
      />
      {showFeaturedLive && (
        <motion.section
          className="mx-auto grid max-w-[1280px] gap-10 bg-white px-6 py-10 shadow-[var(--shadow-soft)] md:px-10 lg:grid-cols-[320px_1fr_220px]"
          {...reveal}
        >
          <img
            src={assets.photos.nextLiveFlyer}
            alt={`${featuredLive.date} ${featuredLive.title} フライヤー`}
            className="aspect-[4/3] w-full bg-[var(--color-paper)] object-contain"
          />
          <div className="self-center">
            <span className="inline-flex bg-[var(--color-accent)] px-5 py-2 text-sm font-bold text-white">次回ライブ</span>
            <h2 className="mt-6 text-4xl font-black md:text-5xl">{featuredLive.date}</h2>
            <p className="mt-5 text-2xl font-black">{featuredLive.title}</p>
            <p className="mt-4 text-xl">{featuredLive.venue}</p>
            <p className="mt-3 text-lg text-[var(--color-muted)]">{featuredLive.time}</p>
            <p className="mt-2 text-lg text-[var(--color-muted)]">{featuredLive.price}</p>
          </div>
          <div className="self-center">
            <ButtonLink href="/reserve" className="w-full">
              予約する
            </ButtonLink>
          </div>
        </motion.section>
      )}
      <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
        <SectionHeading title="過去のライブ" />
        <div className="mt-8 grid grid-cols-2 gap-9 lg:grid-cols-4">
          {[assets.photos.liveBlueGuitar, assets.uiMockupsReal.live.primary, assets.uiMockupsReal.live.featured, assets.uiMockupsReal.live.secondary].map((image) => (
            <motion.img
              key={image}
              src={image}
              alt=""
              className="aspect-[4/3] w-full object-cover object-[center_top] lg:h-[120px] lg:aspect-auto"
              {...reveal}
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
