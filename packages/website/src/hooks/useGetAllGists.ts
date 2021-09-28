import { useEffect, useState } from "react";
import { GIST_PER_PAGE, useGetGistsQuery } from "../services/github";
import { ConvertedGist, convertGistsData } from "../utils/gist";

export const useGetAllGists = (): {
  gists: ConvertedGist[];
  isLoading: boolean;
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [gists, setGists] = useState<ConvertedGist[]>([]);
  const { data } = useGetGistsQuery(page, { skip: !isLoading });
  useEffect(() => {
    // If the number returned is the same as the number we requested, then there may be a next page
    if (data) {
      if (data.length === GIST_PER_PAGE) {
        setPage((page) => page + 1);
      } else {
        setIsLoading(false);
      }
      setGists((prevGists) => [...prevGists, ...convertGistsData(data)]);
    }
  }, [data]);
  return {
    gists,
    isLoading,
  };
};
