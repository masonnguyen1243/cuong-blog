import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getPosts } from "~/store/slice/postSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [sidebarData, setSidabarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  console.log("🚀 ~ Search ~ posts:", posts);

  console.log(sidebarData);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidabarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      const searchQuery = urlParams.toString();
      const res = await dispatch(getPosts({ searchTerm: searchQuery }));
      setPosts(res.data);
    };
    fetchPosts();
  }, [location.search]);
  return (
    <div>
      <form action="">
        <div className="">
          <label>Search Term...</label>
          <TextInput placeholder="Search..." id="searchTerm" type="text" />
        </div>
      </form>
    </div>
  );
};
export default Search;
