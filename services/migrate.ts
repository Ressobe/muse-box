import db from "../src/lib/db";

type ArtistType =
  | "PERSON"
  | "GROUP"
  | "ORCHESTRA"
  | "CHOIR"
  | "CHARACTER"
  | "OTHER";
type GenderType = "MALE" | "FEMALE" | "OTHER";
type RecordingType =
  | "ALBUM"
  | "SINGLE"
  | "EP"
  | "COMPILATION"
  | "SOUNDTRACK"
  | "REMIX"
  | "MIXTAPE"
  | "OTHER";
type AreaType =
  | "COUNTRY"
  | "SUBDIVISION"
  | "CITY"
  | "MUNICIPALITY"
  | "DISTRICT"
  | "ISLAND"
  | "OTHER";

// async function deleteEverything() {
//   await db.profile.deleteMany();
//   await db.track.deleteMany();
//   await db.recording.deleteMany();
//   await db.artist.deleteMany();
//   await db.user.deleteMany();
//   await db.label.deleteMany();
//   await db.language.deleteMany();
// }

async function deleteProfileArtist() {
  await db.profile.deleteMany();
  await db.user.deleteMany();
}

async function main() {
  const file = Bun.file("artists-json.txt");

  const arrBuf = await file.arrayBuffer();

  const decoder = new TextDecoder();

  const str = decoder.decode(arrBuf);
  const lines = str.split("\n");

  for (let i = 0; i < lines.length - 1; i++) {
    const item = lines[i];
    const d = JSON.parse(item);

    await db.artist.create({
      data: {
        name: d.name,
        mbid: d.mbid,
        about: d.about,
        type: d.type as ArtistType,
        gender: d.gender as GenderType,

        begin_date_day: d.begin_date_day,
        begin_date_month: d.begin_date_month,
        begin_date_year: d.begin_date_year,

        end_date_day: d.end_date_day,
        end_date_month: d.end_date_month,
        end_date_year: d.end_date_year,

        albums: {
          create: d.recordings.map((item) => ({
            name: item.name,
            mbid: item.gid,
            type: item.type as RecordingType,
            about: item.about,
            length: 0,

            tracks: {
              create: item.tracks.map((i) => ({
                mbid: i.gid,
                name: i.name,
                length: i.length,
                position: i.position,
              })),
            },
          })),
        },
      },
    });
  }
}

await deleteProfileArtist();
