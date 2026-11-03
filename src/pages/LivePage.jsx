import { motion } from "framer-motion";
import { assets } from "../data/assets.js";
import { getPastLives, isLiveVisible, upcomingLives } from "../data/site.js";
import { ButtonLink, HeroBand, PageShell, SectionHeading, reveal } from "./PagePrimitives.jsx";

const pastLivePhotos = [
  { key: "liveBlueGuitar", alt: "青い照明の中でアコースティックギターを弾くR-MANAC" },
  { key: "liveRedCloseup", alt: "赤い照明の中で歌うR-MANACのアップ" },
  { key: "liveAmberStage", alt: "オレンジ色の照明のステージで演奏するR-MANAC" },
  { key: "liveStageWide", alt: "ライブハウスのステージ全体とR-MANAC" },
];

export function LivePage() {
  const visibleLives = upcomingLives.filter((live) => isLiveVisible(live));
  const pastLives = getPastLives();

  return (
    <PageShell>
      <HeroBand
        label="Live"
        title="ライブ情報"
        body="音が重なり、会場が揺れ、心が共鳴する。"
        image={assets.uiMockupsReal.live.primary}
      />
      {visibleLives.map((live, index) => (
        <motion.section
          key={live.id}
          className={`mx-auto grid max-w-[1280px] gap-10 bg-white px-6 py-10 shadow-[var(--shadow-soft)] md:px-10 ${
            live.flyerAsset ? "lg:grid-cols-[320px_1fr_220px]" : "lg:grid-cols-[1fr_220px]"
          }`}
          {...reveal}
        >
          {live.flyerAsset && (
            <img
              src={assets.photos[live.flyerAsset]}
              alt={`${live.date} ${live.title} フライヤー`}
              className="h-auto max-h-[560px] w-full bg-[var(--color-paper)] object-contain"
            />
          )}
          <div className="self-center">
            <span className="inline-flex bg-[var(--color-accent)] px-5 py-2 text-sm font-bold text-white">
              {index === 0 ? "次回ライブ" : "ライブ予定"}
            </span>
            <h2 className="mt-6 text-4xl font-black md:text-5xl">{live.date}</h2>
            <p className="mt-5 text-2xl font-black">{live.title}</p>
            {live.venue && <p className="mt-4 text-xl">{live.venue}</p>}
            {live.performers && <p className="mt-4 text-lg">出演：{live.performers}</p>}
            <p className="mt-3 text-lg text-[var(--color-muted)]">{live.time}</p>
            <p className="mt-2 text-lg text-[var(--color-muted)]">{live.price}</p>
          </div>
          <div className="self-center">
            <ButtonLink href={`/reserve?event=${live.id}`} className="w-full">
              予約する
            </ButtonLink>
          </div>
        </motion.section>
      ))}
      {visibleLives.length === 0 && (
        <motion.section
          className="mx-auto max-w-[1280px] bg-white px-6 py-10 shadow-[var(--shadow-soft)] md:px-10"
          {...reveal}
        >
          <h2 className="text-2xl font-black md:text-3xl">次回の出演予定は準備中です</h2>
          <p className="mt-4 text-lg leading-8 text-[#2a2a2a]">
            決まり次第、このページとSNSでお知らせします。最新情報はInstagramやXをフォローしてチェックしてください。
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <ButtonLink href="/sns">SNSをフォローする</ButtonLink>
            <ButtonLink href="/contact" filled={false}>
              出演依頼はこちら
            </ButtonLink>
          </div>
        </motion.section>
      )}
      <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
        <SectionHeading title="過去のライブ" />
        {pastLives.length > 0 && (
          <ul className="mt-8 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {pastLives.map((live) => (
              <li key={live.id} className="grid gap-1 py-5 md:grid-cols-[220px_1fr] md:gap-8">
                <span className="font-bold">{live.date}</span>
                <span>
                  {live.title}
                  {live.venue && ` / ${live.venue}`}
                  {live.performers && <span className="block text-sm text-[var(--color-muted)]">出演：{live.performers}</span>}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 grid grid-cols-2 gap-9 lg:grid-cols-4">
          {pastLivePhotos.map(({ key, alt }) => (
            <motion.img
              key={key}
              src={assets.photos[key]}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover object-[center_top] lg:h-[120px] lg:aspect-auto"
              {...reveal}
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
