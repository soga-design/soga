import { useRouter } from "next/router";
import { NextPage } from "next";
import { useGetGistContent } from "hooks/useGetGistContent";

const Edit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const content = useGetGistContent(id as string);

  return (
    <div>
      <h1>Content:</h1>
      <pre>{content}</pre>
    </div>
  );
};

export default Edit;
