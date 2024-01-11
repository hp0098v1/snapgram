import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import SearchResults from "@/components/shared/SearchResults";
import GridPostList from "@/components/shared/GridPostList";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries";
import useDebounce from "@/hooks/useDebounce";
import Loader from "@/components/shared/Loader";
import { useInView } from "react-intersection-observer";
import { ExploreSkeleton } from "@/components/skeletons";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");

  const { ref, inView } = useInView();

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching: isPostFetching,
  } = useGetPosts();

  const debouncedValue = useDebounce(searchValue, 300);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts?.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      {/* Top Section and Search Inpput */}
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex items-center gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            className="w-6 h-6"
          />
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="explore-search"
          />
        </div>
      </div>

      {/* Filter */}
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            className="w-5 h-5"
          />
        </div>
      </div>

      {/*  */}
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {isPostFetching ? (
          <ExploreSkeleton />
        ) : shouldShowSearchResults && searchedPosts ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts?.pages.map((item, index) => {
            if (item)
              return (
                <GridPostList key={`page-${index}`} posts={item.documents} />
              );
          })
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
