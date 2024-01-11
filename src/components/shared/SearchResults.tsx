import { Models } from "appwrite";

import GridPostList from "./GridPostList";
import { GridPostsSkeleton } from "@/components/skeletons";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.DocumentList<Models.Document>;
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) return <GridPostsSkeleton />;

  if (searchedPosts && searchedPosts.documents.length > 0)
    return <GridPostList posts={searchedPosts.documents} />;

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  );
};

export default SearchResults;
