import { motion } from "framer-motion";
import { assets } from "../data/assets.js";
import { featureLinks, siteMeta } from "../data/site.js";
import { routeHref } from "../utils/routing.js";
import { ButtonLink, PageShell, reveal } from "./PagePrimitives.jsx";

const featureImages = [
  assets.uiMockupsReal.top.secondary,
  assets.uiMockupsReal.top.card,
  assets.uiMockupsReal.top.accent,
];

export function TopPage() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden md:min-h-[680px]">
        <div className="absolute inset-y-0 right-[34%] -z-10 hidden h-[610px] w-[38%] bg-gradient-to-r from-[var(--color-paper)] via-[var(--color-paper)] to-transparent md:block" />
        <motion.div
          className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-36"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Acoustic Loop Artist
          </p>
          <h1 className="text-5xl font-black leading-none md:text-8xl">{siteMeta.name}</h1>
          <p className="mt-8 whitespace-pre-line text-3xl font-black leading-tight md:mt-9 md:text-5xl">
            {siteMeta.tagline.replace("、", "、\n")}
          </p>
          <p className="mt-7 whitespace-pre-line text-xl leading-9 text-[#2a2a2a]">{siteMeta.base}</p>
          <div className="mt-10 flex flex-wrap gap-5">
            <ButtonLink href="/live">ライブを見る</ButtonLink>
            <ButtonLink href="/music" filled={false}>
              音源を聴く
            </ButtonLink>
          </div>
          <img
            src={assets.uiMockupsReal.top.primary}
            alt=""
            className="hidden md:absolute md:right-0 md:top-0 md:-z-10 md:block md:h-[610px] md:w-[62%] md:object-cover md:object-[82%_center]"
          />
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-8 px-6 pb-24 md:px-10 lg:grid-cols-3">
        {featureLinks.map((item, index) => (
          <motion.a
            key={item.title}
            href={routeHref(item.href)}
            className="grid min-w-0 grid-cols-[minmax(120px,180px)_minmax(0,1fr)] items-center gap-6"
            {...reveal}
            transition={{ ...reveal.transition, delay: index * 0.05 }}
          >
            <img src={featureImages[index]} alt="" className="h-48 w-full object-cover" />
            <span className="min-w-0">
              <span className="block text-3xl font-black">{item.title}</span>
              <span className="mt-3 block h-1 w-10 bg-[var(--color-accent)]" />
              <span className="mt-5 block whitespace-pre-line text-sm leading-7 text-[#2a2a2a]">{item.body}</span>
              <span className="mt-5 block text-3xl text-[var(--color-accent)]">→</span>
            </span>
          </motion.a>
        ))}
      </section>
    </PageShell>
  );
}
