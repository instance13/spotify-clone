import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user, subscription } = useUser();
  const subscribeModal = useSubscribeModal();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen(); // you must be authenticated in order to listen to music !
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    };

    player.setId(id);
    player.setIds(songs.map((song) => song.id)); // dynamic playlists depending on the app section
  };

  return onPlay;
};

export default useOnPlay;