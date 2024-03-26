const API_URL = "https://musicbrainz.org/ws/2";
const COVERART_API_URL = "https://coverartarchive.org";

async function getCoverartForRelease(releaseId) {
  const endpoint = "release";
  const url = `${COVERART_API_URL}/${endpoint}/${releaseId}`;

  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
}

async function getReleasesForReleaseGroup(releaseGroupId) {
  const endpoint = "release";

  const queryParams = new URLSearchParams({
    "release-group": releaseGroupId,
    inc: "recordings",
    fmt: "json",
  });

  const url = `${API_URL}/${endpoint}?${queryParams}`;
  const response = await fetch(url);
  const data = await response.json();

  const officialRelease = data.releases.filter(
    (release) => release.status === "Official",
  );

  let release = null;

  if (officialRelease.length > 0) {
    release = officialRelease[0];
  } else if (data.length > 0) {
    release = data[0];
  } else {
    return null;
  }

  const coverArt = await getCoverartForRelease(release.id);
  release.coverArt = coverArt;

  return release;
}

async function getArtist(artistId) {
  const endpoint = "release-group";

  const queryParams = new URLSearchParams({
    artist: artistId,
    inc: "artist-credits",
    fmt: "json",
  });

  const url = `${API_URL}/${endpoint}?${queryParams}`;
  const response = await fetch(url);
  const data = await response.json();

  for (let i = 0; i < data["release-groups"].length; i++) {
    const alb = data["release-groups"][i];

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const release = await getReleasesForReleaseGroup(alb.id);
    data["release-groups"][i].release = release;
  }

  return data;
}

async function main() {
  const artist = await getArtist("24b679c1-fc3d-4300-82e2-fea54e79dc89");
  console.log(artist);
}

await main();
