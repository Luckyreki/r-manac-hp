import { useState } from "react";
import { assets } from "../data/assets.js";
import { PageShell } from "./PagePrimitives.jsx";

const reserveEmail = "rmanac0805@gmail.com";

export function ReservePage() {
  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = "【チケット予約】2026.07.18 堺轟音";
    const body = [
      "R-MANAC チケット予約",
      "",
      "公演: 2026.07.18（土） 堺轟音",
      "会場: 堺東 Goith",
      "時間: OPEN 18:00 / START 18:30",
      "",
      `お名前: ${name}`,
      `チケット枚数: ${tickets}枚`,
    ].join("\n");

    window.location.href = `mailto:${reserveEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <PageShell>
      <section className="mx-auto grid max-w-[1180px] gap-12 px-6 py-20 md:px-10 lg:grid-cols-[420px_1fr]">
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Reservation
          </p>
          <h1 className="whitespace-nowrap text-4xl font-black leading-tight md:text-5xl">チケット予約</h1>
          <div className="mt-8 h-1 w-14 bg-[var(--color-accent)]" />
          <img
            src={assets.photos.nextLiveFlyer}
            alt="2026年7月18日 堺轟音 フライヤー"
            className="mt-10 max-h-[520px] w-full bg-white object-contain shadow-[var(--shadow-soft)]"
          />
        </div>

        <div className="self-center rounded-md bg-white p-7 shadow-[var(--shadow-soft)] md:p-10">
          <div className="border-b border-[var(--color-line)] pb-7">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Next Live
            </p>
            <h2 className="mt-4 text-3xl font-black">2026.07.18（土） 堺轟音</h2>
            <p className="mt-3 text-lg text-[var(--color-muted)]">堺東 Goith / OPEN 18:00 / START 18:30</p>
          </div>

          <form className="mt-8 grid gap-6" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-bold">
              お名前
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-13 rounded-md border border-[var(--color-line)] bg-[var(--color-paper)] px-4 text-base font-medium outline-none transition focus:border-[var(--color-accent)]"
                placeholder="例：山田 太郎"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              チケット枚数
              <input
                required
                type="number"
                min="1"
                max="20"
                value={tickets}
                onChange={(event) => setTickets(event.target.value)}
                className="h-13 rounded-md border border-[var(--color-line)] bg-[var(--color-paper)] px-4 text-base font-medium outline-none transition focus:border-[var(--color-accent)]"
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex h-13 items-center justify-center rounded-md bg-[var(--color-accent)] px-7 text-sm font-bold text-white transition hover:bg-[var(--color-accent-dark)]"
            >
              送信する
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
