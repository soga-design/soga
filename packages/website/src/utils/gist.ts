import { Gists } from "services/github";

export interface ConvertedGist {
  id: string;
  name: string;
  url: string;
}

export const getGistContent = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const raw = await response.text();
  // TODO JSON.parse
  return raw;
};

//TODO filter
export const convertGistsData = (gists: Gists): ConvertedGist[] =>
  gists.map(({ id, files }) => {
    if (Object.values(files).length !== 1) {
      throw new Error("Should only have one file per gist");
    }
    const gist = Object.values(files)[0];
    return {
      id,
      name: gist.filename || "",
      url: gist.raw_url || "",
    };
  });
