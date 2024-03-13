import { ReactNode, createContext, useContext } from "react";

type Artist = {
  id: string;
  name: string;
  stats?: {
    id?: number;
    avg_rating?: number;
    amount_of_ratings?: number;
    amount_of_albums?: number;
    amount_of_singles?: number;
    amount_of_tracks?: number;
    amount_of_followers?: number;
    visits?: number;
    ownerId?: string;
  } | null;
  popularity: number;
  isFollowed?: boolean;
  isLiked?: boolean;
  isCommented?: boolean;
};

type ArtistContextType = {
  artist: Artist;
  children?: ReactNode;
};

const ArtistContext = createContext<ArtistContextType | null>(null);

export function ArtistProvider({ artist, children }: ArtistContextType) {
  return (
    <ArtistContext.Provider value={{ artist }}>
      {children}
    </ArtistContext.Provider>
  );
}

export function useArtist() {
  const context = useContext(ArtistContext);
  if (!context) {
    throw new Error("useArtist must be used within an ArtistProvider");
  }
  return context;
}
