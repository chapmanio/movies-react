const Home = () => {
  // Render
  return (
    <form action="#" className="max-w-4xl mx-auto bg-indigo-700 sm:flex rounded-xl py-9 px-12">
      <div className="min-w-0 flex-1">
        <label htmlFor="cta-email" className="sr-only">
          Email address
        </label>
        <input
          id="cta-email"
          type="email"
          className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
          placeholder="Search for a movie, tv show or person..."
        />
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-3">
        <button
          type="submit"
          className="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700 sm:px-10"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Home;
