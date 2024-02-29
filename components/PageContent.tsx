"use client";

import { Song } from "@/types";
import React from "react";
import SongItem from "./SongItem";
import useOnPlay from "@/hooks/useOnPlay";

interface PageCotentProps {
  songs: Song[];
};

const PageContent: React.FC<PageCotentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">

      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((item) => (
        <SongItem
          key={item.id}
          onClick={onPlay}
          data={item}
        />
      ))}
    </div>
  );
};

export default PageContent;