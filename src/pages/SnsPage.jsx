import { motion } from "framer-motion";
import { assets } from "../data/assets.js";
import { socialLinks } from "../data/site.js";
import { ButtonLink, HeroBand, PageShell, reveal } from "./PagePrimitives.jsx";

export function SnsPage() {
  return (
    <PageShell>
      <HeroBand label="SNS" title="SNS" body="各SNSはこちらから。" image={assets.uiMockupsReal.sns.primary} />
      <section className="mx-auto grid max-w-[1280px] items-stretch gap-6 px-6 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        {socialLinks.map(([name, desc, cta, href]) => (
          <motion.article key={name} className="flex h-full flex-col rounded-md bg-white px-8 py-9 shadow-[var(--shadow-soft)]" {...reveal}>
            <h2 className="text-3xl font-black">{name}</h2>
            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-[#2a2a2a]">{desc}</p>
            <ButtonLink href={href} target="_blank" rel="noreferrer" filled={false} className="mt-auto h-11 w-fit">
              {cta}
            </ButtonLink>
          </motion.article>
        ))}
      </section>
    </PageShell>
  );
}
