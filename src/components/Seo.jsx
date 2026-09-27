import { useEffect } from "react";

const SITE_URL = "https://r-manac-site.vercel.app";
const SHARE_IMAGE = `${SITE_URL}/assets/live-projection-blue.jpg`;
const DEFAULT_DESCRIPTION =
  "大阪・堺を拠点に活動するアコギ・ループアーティストR-MANACの公式サイト。プロフィール、音楽・ライブ映像、出演予定、SNS、チケット予約情報を掲載。";

const pageMetadata = {
  "/": {
    title: "R-MANAC | 大阪・堺のアコギ・ループアーティスト",
    description: DEFAULT_DESCRIPTION,
  },
  "/profile": {
    title: "プロフィール | R-MANAC",
    description:
      "大阪・堺を拠点に、アコースティックギターとルーパーで活動するR-MANACのプロフィールと音楽への想いをご紹介します。",
  },
  "/music": {
    title: "音楽・ライブ映像 | R-MANAC",
    description:
      "アコギとルーパーで一人バンドのような音像を奏でるR-MANACの音楽、ライブ映像、演奏スタイルをご覧いただけます。",
  },
  "/live": {
    title: "ライブ情報・出演予定 | R-MANAC",
    description:
      "R-MANACの最新ライブ情報と出演予定を掲載。大阪を中心とした公演日時、会場、料金の確認とチケット予約ができます。",
  },
  "/sns": {
    title: "SNS・最新情報 | R-MANAC",
    description:
      "R-MANACのInstagram、X、YouTube、TikTok公式アカウントをまとめています。ライブ告知や演奏映像、活動の最新情報はこちら。",
  },
  "/contact": {
    title: "お問い合わせ・出演依頼 | R-MANAC",
    description:
      "R-MANACへのライブ出演依頼、イベント出演、取材、そのほか活動に関するお問い合わせはこちらからお送りください。",
  },
  "/reserve": {
    title: "チケット予約 | R-MANAC",
    description: "R-MANAC出演ライブのチケット予約ページです。",
    noindex: true,
  },
};

function setMeta(attribute, name, content) {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function Seo({ pathname }) {
  useEffect(() => {
    const metadata = pageMetadata[pathname] || pageMetadata["/"];
    const canonicalPath = pageMetadata[pathname] ? pathname : "/";
    const canonicalUrl = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;
    const robots = metadata.noindex
      ? "noindex,follow"
      : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

    document.title = metadata.title;
    setCanonical(canonicalUrl);
    setMeta("name", "description", metadata.description);
    setMeta("name", "robots", robots);
    setMeta("name", "googlebot", robots);

    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "R-MANAC");
    setMeta("property", "og:locale", "ja_JP");
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", SHARE_IMAGE);
    setMeta("property", "og:image:alt", "ステージで演奏するR-MANAC");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", SHARE_IMAGE);
  }, [pathname]);

  return null;
}
