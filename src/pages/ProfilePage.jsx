import { motion } from "framer-motion";
import { assets } from "../data/assets.js";
import { profileText } from "../data/site.js";
import { HeroBand, PageShell, reveal } from "./PagePrimitives.jsx";

export function ProfilePage() {
  return (
    <PageShell>
      <HeroBand
        label="Profile"
        title="プロフィール"
        image={assets.uiMockupsReal.profile.primary}
        imageClass="object-[center_top] md:translate-x-[12%] md:object-[70%_48%]"
      />
      <section className="mx-auto grid max-w-[1140px] items-center gap-16 px-6 pb-10 pt-8 md:grid-cols-[420px_1fr] md:px-10">
        <motion.img
          src={assets.uiMockupsReal.profile.primary}
          alt="R-MANAC profile"
          className="aspect-[4/5] w-full object-cover object-[center_top] md:h-[520px] md:aspect-auto md:object-[center_56%]"
          {...reveal}
        />
        <motion.div className="whitespace-pre-line text-lg leading-10 text-[#171717]" {...reveal}>
          {profileText}
        </motion.div>
      </section>
      <motion.section
        className="mx-auto mb-16 grid max-w-[1140px] gap-8 rounded-md bg-white px-10 py-7 shadow-[var(--shadow-soft)] md:grid-cols-2 md:px-20"
        {...reveal}
      >
        <div>
          <p className="text-sm text-[var(--color-muted)]">活動拠点</p>
          <p className="mt-2 text-2xl font-black">大阪・堺</p>
        </div>
        <div className="border-t border-[var(--color-line)] pt-7 md:border-l md:border-t-0 md:pl-20 md:pt-0">
          <p className="text-sm uppercase text-[var(--color-muted)]">Style</p>
          <p className="mt-2 text-2xl font-black">Acoustic Guitar / Looper</p>
        </div>
      </motion.section>
    </PageShell>
  );
}
