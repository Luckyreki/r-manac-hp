import { ButtonLink, PageShell } from "./PagePrimitives.jsx";

export function NotFoundPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[900px] px-6 py-24 text-center md:px-10 md:py-36">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">404</p>
        <h1 className="mt-6 text-4xl font-black leading-tight md:text-5xl">ページが見つかりません</h1>
        <p className="mt-6 text-lg leading-8 text-[#2a2a2a]">
          お探しのページは移動または削除された可能性があります。
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <ButtonLink href="/">トップへ戻る</ButtonLink>
          <ButtonLink href="/music" filled={false}>
            楽曲を聴く
          </ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
