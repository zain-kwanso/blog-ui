import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/authContext";
import SearchBar from "../components/SearchBar";
import Skeleton from "../components/Skelton";
import Pagination from "../components/Pagination";
import useFetchAllPosts from "../hooks/useFetchAllPosts";
import useDeletePost from "../hooks/useDeletePost";

const HomePage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("allPosts");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(page);

  const { posts, fetchAllPosts, fetchUserPosts, loading, pagination } =
    useFetchAllPosts();
  const { deletePost, error } = useDeletePost();

  useEffect(() => {
    if (activeTab === "allPosts") {
      fetchAllPosts({ page: currentPage, limit: itemsPerPage, search: search });
    } else if (activeTab === "userPosts" && user) {
      fetchUserPosts({
        page: currentPage,
        limit: itemsPerPage,
        search: search,
      });
    }
  }, [user, currentPage, itemsPerPage, activeTab]);

  const handleDeletePost = async (postId) => {
    if (!user) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deletePost(postId);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Post deleted successfully!");
      }

      if (activeTab === "allPosts") {
        fetchAllPosts({
          page: currentPage,
          limit: itemsPerPage,
          search: search,
        });
      } else if (activeTab === "userPosts" && user) {
        fetchUserPosts({
          page: currentPage,
          limit: itemsPerPage,
          search: search,
          userId: user.id,
        });
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams(`?page=${page}&limit=${itemsPerPage}&search=${search}`);
  };

  const handleLimitChange = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
    setSearchParams(`?page=1&limit=${itemsPerPage}&search=${search}`);
  };

  const handlePostClick = (post) => {
    navigate(`/post/${post.id}/preview`);
  };

  const handleEditPost = (post) => {
    if (user) {
      navigate(`/post/${post.id}/edit`);
    } else {
      toast.error("Please log in to edit posts.");
    }
  };

  const fetchPostsWithSearch = async (debouncedSearch) => {
    setSearch(debouncedSearch);

    if (currentPage === 1) {
      if (activeTab === "allPosts") {
        await fetchAllPosts({
          page: 1,
          limit: itemsPerPage,
          search: debouncedSearch,
        });
      } else if (activeTab === "userPosts" && user) {
        await fetchUserPosts({
          page: 1,
          limit: itemsPerPage,
          search: debouncedSearch,
          userId: user.id,
        });
      }
    } else {
      setCurrentPage(1);
    }
    setSearchParams(debouncedSearch ? `?search=${debouncedSearch}` : "");
  };

  const handleCreatePost = () => {
    navigate("/post/create");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if(tab==="userPosts"){
      setSearchParams("?filter=user")
    }
    else if(tab === "allPosts"){
      setSearchParams("")
    }
    setCurrentPage(1);
  };

  return (
    <>
      <div className="sticky top-16 bg-white shadow-md z-10 px-4 w-full flex justify-between items-center py-8">
        <div className="w-1/2 pr-4">
          <SearchBar
            search={search}
            setSearch={setSearch}
            fetchPostsWithSearch={fetchPostsWithSearch}
          />
        </div>
        {user && (
          <div className="flex justify-end">
            <button
              onClick={handleCreatePost}
              className="bg-purple-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
            >
              Create Post
            </button>
          </div>
        )}
      </div>

      <div className="pt-20 flex flex-col h-full justify-between flex-1 py-8">
        <div className="px-4 w-full max-w-4xl">
          <div className="border-b border-gray-300">
            <div className="flex">
              <button
                onClick={() => handleTabChange("allPosts")}
                className={`py-2 px-4 text-center font-semibold text-sm rounded-t-lg transition-all duration-300 border-b-2 ${
                  activeTab === "allPosts"
                    ? "border-purple-600 bg-white text-purple-600"
                    : "border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Posts
              </button>
              {user && (
                <button
                  onClick={() => handleTabChange("userPosts")}
                  className={`py-2 px-4 text-center font-semibold text-sm rounded-t-lg transition-all duration-300 border-b-2 ${
                    activeTab === "userPosts"
                      ? "border-purple-600 bg-white text-purple-600"
                      : "border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  My Posts
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-start w-full mt-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4">
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4">
              {posts?.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 text-lg mt-10">
                  {search
                    ? `No posts found matching "${search}".`
                    : "No posts available. Please check back later or create a new post."}
                </div>
              ) : (
                posts?.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onClick={handlePostClick}
                    onDelete={user ? handleDeletePost : null}
                    onEdit={handleEditPost}
                    isUserPost={post.UserId === user?.id}
                  />
                ))
              )}
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </div>
    </>
  );
};

export default HomePage;
