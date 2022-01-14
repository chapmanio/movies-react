const Loading = () => {
  // Render
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="px-4 py-4 text-center">
        <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">React</h2>
        <h1 className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Movies
        </h1>
        <p className="mt-4 text-sm text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
