import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import InfoCard from "./components/Infocard";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    const cachedData = localStorage.getItem("posts");
    if (cachedData) {
      const data = JSON.parse(cachedData);
      setPosts(data);
      setFilteredPosts(data);
      setLoading(false);
    } else {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          setFilteredPosts(data);
          localStorage.setItem("posts", JSON.stringify(data));
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load posts");
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    const searchTerm = search.trim().toLowerCase();
    if (!searchTerm) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.title.toLowerCase().includes(searchTerm));
      setFilteredPosts(filtered);
    }
    setPage(1); // Reset pagination when searching
  }, [search, posts]);

  const handleSearch = (e) => setSearch(e.target.value);

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="p-10 mx-auto bg-amber-50 min-h-screen">
      <Navbar search={search} handleSearch={handleSearch} />
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {!loading && !error && (
        <div className="flex-col w-full">
          <div className="grid grid-cols-3 place-content-around place-items-center gap-y-10 gap-x-4">
            {currentPosts.map((post, index) => (
              <InfoCard key={post.id} title={post.title} body={post.body} index={index} />
            ))}
          </div>
          <div className="flex justify-between mt-4 p-16">
            <button
              disabled={page === 1}
              className="px-4 py-2 bg-fuchsia-700 w-40 text-white rounded disabled:opacity-50"
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <button
              disabled={indexOfLastPost >= filteredPosts.length}
              className="px-4 py-2 bg-fuchsia-700 w-40 text-white rounded disabled:opacity-50"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
