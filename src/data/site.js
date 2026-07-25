export const profileText =
  "R-MANACは、大阪・堺を拠点に活動するアコギ・ループアーティスト。 アコースティックギターとルーパーを使い、ギター、コーラス、パーカッションをその場で重ねながら、ひとりでバンドのような音像を作るライブスタイルで活動しています。\n\nパニック障害を経験し、一度は思うように動けない時期もありましたが、今は音楽を通して、自分の足で少しずつ表現を取り戻しています。 音楽を競争や順位ではなく、聴く人と響き合うものとして届けたいと考えています。";

export const siteMeta = {
  name: "R-MANAC",
  tagline: "一人で奏でる、無限に広がる音の冒険",
  base: "大阪・堺を拠点に活動するアコギ・ループアーティスト。",
};

export const featuredLive = {
  date: "2026.07.18（土）",
  title: "堺轟音",
  venue: "堺東 Goith",
  time: "OPEN 18:00 / START 18:30",
  price: "ADV ¥2800 / DOOR ¥3300",
  visibleUntil: "2026-07-19T00:00:00+09:00",
};

export function isLiveVisible(live = featuredLive, now = Date.now()) {
  return now < new Date(live.visibleUntil).getTime();
}

export const featureLinks = [
  {
    title: "Profile",
    href: "/profile",
    body: "アコギとルーパーで\nひとりでバンドのような音像を。",
  },
  {
    title: "Music",
    href: "/music",
    body: "ライブ音源や演奏映像を\nご覧いただけます。",
  },
  {
    title: "Live",
    href: "/live",
    body: "ライブ情報や予約、\n過去のライブ記録。",
  },
];

export const songs = [
  { title: "夜明けの前に", year: "2024", duration: "03:42" },
  { title: "光の残像", year: "2024", duration: "04:18" },
  { title: "東京の呼吸", year: "2024", duration: "03:56" },
  { title: "声にならない声", year: "2024", duration: "04:02" },
];

export const liveSchedule = [
  {
    date: "2024.06.15（土）",
    place: "大阪・堺 / Live House Pangea",
    time: "18:30 / 19:00",
  },
  {
    date: "2024.07.21（日）",
    place: "大阪・心斎橋 / ANIMA",
    time: "17:30 / 18:00",
  },
  {
    date: "2024.08.10（土）",
    place: "堺・東区 / Music Spot 聖",
    time: "18:00 / 18:30",
  },
  {
    date: "2024.09.14（土）",
    place: "大阪・梅田 / Always",
    time: "17:30 / 18:00",
  },
];

export const socialLinks = [
  ["Instagram", "ライブ情報や写真、活動の記録をまとめています。", "フォローする", "https://www.instagram.com/iamrmanac/"],
  ["X", "ライブ告知や近況、日々の交流を投稿しています。", "フォローする", "https://x.com/iamrmanac"],
  ["YouTube", "ライブ映像や弾き語り、想いを公開しています。", "見る", "https://www.youtube.com/@iamrmanac"],
  ["TikTok", "パニック障害の発信や、ライブの一部を投稿。", "フォローする", "https://www.tiktok.com/@rmanac"],
];

export const newsItems = [
  ["2024.06.10", "6月15日 大阪・Live House Pangea にてワンマンライブ"],
  ["2024.05.28", "新曲「夜明けの前に」配信スタート"],
  ["2024.05.15", "新しいアーティスト写真を公開しました"],
];
