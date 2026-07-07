const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const assets = {
  logo: asset("/assets/r-manac-logo.png"),
  photos: {
    nextLiveFlyer: asset("/assets/next-live-20260718.jpg"),
    liveBlueGuitar: asset("/assets/live-blue-guitar.jpg"),
    liveBacklightGuitar: asset("/assets/live-backlight-guitar.jpg"),
    liveRedCloseup: asset("/assets/live-red-closeup.jpg"),
    liveStageWide: asset("/assets/live-stage-wide.jpg"),
    liveDarkVocal: asset("/assets/live-dark-vocal.jpeg"),
    liveAmberStage: asset("/assets/live-amber-stage.jpeg"),
    liveProjectionBlue: asset("/assets/live-projection-blue.jpg"),
    liveProjectionRed: asset("/assets/live-projection-red.jpg"),
    liveSideVocal: asset("/assets/live-side-vocal.jpg"),
    profileStreetVertical: asset("/assets/profile-street-vertical.jpg"),
    profileDenimVertical: asset("/assets/profile-denim-vertical.jpg"),
    profileMonochromeSquare: asset("/assets/profile-monochrome-square.jpg"),
  },
  generated: {
    waveformAccent: asset("/assets/generated/waveform-accent.png"),
  },
  uiMockupsReal: {
    top: {
      primary: asset("/assets/live-projection-blue.jpg"),
      secondary: asset("/assets/profile-street-vertical.jpg"),
      card: asset("/assets/live-projection-red.jpg"),
      accent: asset("/assets/live-amber-stage.jpeg"),
    },
    profile: {
      primary: asset("/assets/profile-street-vertical.jpg"),
      secondary: asset("/assets/profile-monochrome-square.jpg"),
    },
    music: {
      primary: asset("/assets/live-projection-blue.jpg"),
      secondary: asset("/assets/live-projection-red.jpg"),
    },
    live: {
      primary: asset("/assets/live-red-closeup.jpg"),
      featured: asset("/assets/live-amber-stage.jpeg"),
      secondary: asset("/assets/live-stage-wide.jpg"),
    },
    sns: {
      primary: asset("/assets/live-backlight-guitar.jpg"),
      secondary: asset("/assets/live-side-vocal.jpg"),
      listThumbnail: asset("/assets/profile-monochrome-square.jpg"),
    },
    contact: {
      primary: asset("/assets/profile-denim-vertical.jpg"),
      secondary: asset("/assets/r-manac-logo.png"),
    },
  },
};
