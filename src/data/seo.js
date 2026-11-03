// Page metadata shared by the in-browser <Seo> component and the
// build-time prerender script (scripts/prerender.mjs).
// Keep this file free of browser-only or Vite-only APIs.

export const SITE_URL = "https://r-manac-site.vercel.app";
export const SHARE_IMAGE = `${SITE_URL}/assets/live-projection-blue.jpg`;
export const SHARE_IMAGE_ALT = "ステージでアコースティックギターを弾きながら歌うR-MANAC";

export const DEFAULT_DESCRIPTION =
  "R-MANAC（アール・マナック）は大阪・堺を拠点に活動するアコギ・ループアーティスト。アコギとルーパーでその場で音を重ねる一人バンドのライブ、配信中の楽曲、出演予定を掲載しています。";

export const pageMetadata = {
  "/": {
    title: "R-MANAC（アール・マナック）公式サイト | 大阪・堺のアコギ・ループアーティスト",
    description: DEFAULT_DESCRIPTION,
    summary:
      "R-MANAC（アール・マナック）は、大阪・堺を拠点に活動するアコギ・ループアーティストです。アコースティックギターとルーパーで、ギター・コーラス・パーカッションをその場で重ね、ひとりでバンドのような音を作ります。",
  },
  "/profile": {
    title: "プロフィール | R-MANAC（アール・マナック）",
    description:
      "大阪・堺を拠点に、アコースティックギターとルーパーで一人バンドのようなライブを行うR-MANAC（アール・マナック）のプロフィールと、音楽への想いを紹介します。",
    summary:
      "R-MANAC（アール・マナック）のプロフィール。大阪・堺を拠点に、アコースティックギターとルーパーを使ったライブ活動をしています。",
  },
  "/music": {
    title: "楽曲・ライブ映像 | R-MANAC（アール・マナック）",
    description:
      "R-MANAC（アール・マナック）の配信楽曲一覧。最新シングル「えぇ堺！」をはじめ、Spotify・Apple Musicで聴ける曲と、アコギ×ルーパーのライブ映像を掲載しています。",
    summary:
      "R-MANAC（アール・マナック）の楽曲とライブ映像。最新シングル「えぇ堺！」ほか、Spotify・Apple Musicで配信中の作品を紹介しています。",
  },
  "/live": {
    title: "ライブ情報・出演予定 | R-MANAC（アール・マナック）",
    description:
      "R-MANAC（アール・マナック）の出演予定と過去の出演記録。大阪を中心としたライブの日時・会場・料金を掲載し、チケット予約も受け付けています。",
    summary:
      "R-MANAC（アール・マナック）のライブ情報。大阪を中心とした出演予定と、これまでの出演記録を掲載しています。",
  },
  "/sns": {
    title: "SNS・最新情報 | R-MANAC（アール・マナック）",
    description:
      "R-MANAC（アール・マナック）のInstagram、X、YouTube、TikTok公式アカウント一覧。ライブ告知、演奏動画、活動の最新情報を発信しています。",
    summary: "R-MANAC（アール・マナック）の公式SNS一覧です。",
  },
  "/contact": {
    title: "お問い合わせ・出演依頼 | R-MANAC（アール・マナック）",
    description:
      "R-MANAC（アール・マナック）へのライブ・イベント出演依頼、取材、楽曲制作のご相談はこちらから。大阪・関西を中心に、アコギ×ルーパーの一人バンド演奏で出演します。",
    summary: "R-MANAC（アール・マナック）への出演依頼・お問い合わせはこちらから。",
  },
  "/reserve": {
    title: "チケット予約 | R-MANAC（アール・マナック）",
    description: "R-MANAC出演ライブのチケット予約ページです。",
    summary: "R-MANAC出演ライブのチケット予約ページです。",
    noindex: true,
  },
};

export const notFoundMetadata = {
  title: "ページが見つかりません | R-MANAC（アール・マナック）",
  description: "お探しのページは見つかりませんでした。",
  summary: "お探しのページは見つかりませんでした。トップページからお探しください。",
  noindex: true,
};

export const INDEX_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
export const NOINDEX_ROBOTS = "noindex,follow";

export function canonicalFor(pathname) {
  return `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
}
