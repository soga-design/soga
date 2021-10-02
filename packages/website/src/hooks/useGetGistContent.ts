import { useEffect, useState } from "react";
import { useGetAllGists } from "hooks/useGetAllGists";
import { getGistContent } from "utils/gist";

export const useGetGistContent = (id: string): string => {
  const { gists } = useGetAllGists();
  const [content, setContent] = useState("");
  const gist = gists.find((item) => item.id === id);

  useEffect(() => {
    if (gist) {
      getGistContent(gist.url).then((res) => setContent(res));
    }
  }, [gist]);
  return content;
};
