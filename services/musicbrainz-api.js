// jest problem z api rate
const API_URL = "https://musicbrainz.org/ws/2";

async function getReleasesForReleaseGroup(releaseGroupId) {
  const baseUrl = "https://musicbrainz.org/ws/2/";
  const endpoint = "release";

  const queryParams = new URLSearchParams({
    "release-group": releaseGroupId,
    inc: "recordings",
    fmt: "json",
  });

  const url = `${baseUrl}${endpoint}?${queryParams}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.releases;
}

async function getArtist(artistId) {
  const baseUrl = "https://musicbrainz.org/ws/2/";
  const endpoint = "release-group";
  const queryParams = new URLSearchParams({
    artist: artistId,
    inc: "artist-credits",
    fmt: "json",
  });

  const url = `${baseUrl}${endpoint}?${queryParams}`;
  const response = await fetch(url);
  const data = await response.json();

  for (const alb of data["release-groups"]) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(await getReleasesForReleaseGroup(alb.id));
  }

  // return albumsWithTracks;
}

async function main() {
  const artist = await getArtist("24b679c1-fc3d-4300-82e2-fea54e79dc89");
  // const releaseGroupYoungHems = "fd005bf1-779e-4ea9-8ef4-d232c346ea64";
  // const releases = await getReleasesForReleaseGroup(releaseGroupYoungHems);
  // console.log(releases);
}

await main();
