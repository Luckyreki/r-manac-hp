import { useState } from "react";
import { motion } from "framer-motion";
import { assets } from "../data/assets.js";
import { HeroBand, PageShell, reveal } from "./PagePrimitives.jsx";

const contactNotes = [
  ["出演依頼について", "ライブ出演、イベント出演、サポート演奏、\n楽曲提供などのご依頼を受け付けています。"],
  ["ライブ予約について", "日程・会場名・ご予約者名・枚数を\n明記のうえご連絡ください。"],
  ["その他のご相談", "音源制作、楽曲制作、コラボレーションなど、\n音楽に関する各種ご相談もお気軽にどうぞ。"],
];

const fields = ["お名前", "メールアドレス", "お問い合わせ種別", "メッセージ"];
const options = ["出演依頼", "ライブ予約", "音源制作", "その他"];
const contactEmail = "rmanac0805@gmail.com";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(options[0]);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = `【お問い合わせ】${category}`;
    const body = [
      "R-MANAC お問い合わせ",
      "",
      `お名前: ${name}`,
      `メールアドレス: ${email}`,
      `お問い合わせ種別: ${category}`,
      "",
      "メッセージ:",
      message,
    ].join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <PageShell>
      <HeroBand
        label="Contact"
        title="お問い合わせ"
        body="出演依頼・ライブ予約・制作のご相談はこちらから。"
        image={assets.uiMockupsReal.contact.primary}
        imageClass="object-[center_top] md:object-[center_18%]"
      />
      <section className="mx-auto grid max-w-[1280px] gap-16 px-6 py-20 md:px-10 lg:grid-cols-[420px_1fr]">
        <div className="space-y-12">
          {contactNotes.map(([title, body]) => (
            <motion.div key={title} className="border-b border-[var(--color-line)] pb-10" {...reveal}>
              <h2 className="text-2xl font-black">{title}</h2>
              <div className="mt-4 h-1 w-12 bg-[var(--color-accent)]" />
              <p className="mt-7 whitespace-pre-line text-lg leading-8 text-[#2a2a2a]">{body}</p>
            </motion.div>
          ))}
        </div>
        <motion.form className="border-t border-[var(--color-line)] pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0" onSubmit={handleSubmit} {...reveal}>
          <div className="space-y-8">
            {fields.map((field) => (
              <label key={field} className="block">
                <span className="flex items-center gap-4 text-lg font-bold">
                  {field}
                  <span className="text-sm text-[var(--color-accent)]">必須</span>
                </span>
                {field === "お問い合わせ種別" ? (
                  <span className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setCategory(option)}
                        className="flex items-center gap-3 text-left text-sm text-[#2a2a2a]"
                      >
                        <span className={`h-5 w-5 rounded-full border ${category === option ? "border-[var(--color-accent)] bg-[var(--color-accent)]" : "border-[var(--color-muted)]"}`} />
                        {option}
                      </button>
                    ))}
                  </span>
                ) : field === "メッセージ" ? (
                  <textarea
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="mt-4 h-48 w-full rounded-md border border-[var(--color-line)] bg-white px-4 py-3 outline-none focus:border-[var(--color-accent)]"
                  />
                ) : field === "メールアドレス" ? (
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-4 h-14 w-full rounded-md border border-[var(--color-line)] bg-white px-4 outline-none focus:border-[var(--color-accent)]"
                  />
                ) : (
                  <input
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-4 h-14 w-full rounded-md border border-[var(--color-line)] bg-white px-4 outline-none focus:border-[var(--color-accent)]"
                  />
                )}
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="mt-10 inline-flex h-14 w-56 items-center justify-center rounded-md bg-[var(--color-accent)] px-7 text-sm font-bold text-white transition hover:bg-[var(--color-accent-dark)]"
          >
            送信する
          </button>
        </motion.form>
      </section>
    </PageShell>
  );
}
