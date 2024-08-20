import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/authContext";
import SearchBar from "../components/SearchBar";
import Skeleton from "../components/Skelton";
import Pagination from "../components/Pagination";
import useFetchPosts from "../hooks/useFetchPosts";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [, setSearchParams] = useSearchParams();

  const { posts, fetchAllPosts, fetchUserPosts, loading, pagination } =
    useFetchPosts();

  useEffect(() => {
    fetchAllPosts({ page: currentPage, limit: itemsPerPage, search: search });
  }, [location.pathname, user, currentPage, itemsPerPage]);

  const handleDeletePost = async (postId) => {
    if (!user) return; // Prevent deletion if not logged in

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
      try {
        await deletePost(postId);
        toast.success("Post deleted successfully!");
        fetchAllPosts(currentPage, itemsPerPage);
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Failed to delete post.");
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams(`?page=${page}&limit=${limit}&search=${search}`);
  };

  const handleLimitChange = (limit) => {
    setItemsPerPage(limit);
    setCurrentPage(1); // Reset to the first page when the limit changes
    setSearchParams(`?search=${search}&page=1&limit=${limit}`);
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

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col h-full justify-between flex-1 py-8">
        <div className="px-4 w-full max-w-4xl flex">
          <SearchBar
            search={search}
            setSearch={setSearch}
            fetchPosts={fetchAllPosts}
          />
        </div>

        <div className="px-4 w-full max-w-4xl flex justify-between items-center my-4">
          <h2 className="text-xl font-bold">
            {user
              ? location.pathname === "/"
                ? "All Posts"
                : "Your Posts"
              : "All Posts"}
          </h2>
        </div>

        <div className="flex flex-col flex-1 items-start w-full">
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
                    onDelete={user ? handleDeletePost : null} // Disable delete for non-authenticated users
                    onEdit={handleEditPost} // Allow editing if logged in
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
