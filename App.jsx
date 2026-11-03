const { useState } = React;

function MovieForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "") return;
    onAdd({
      id: Date.now(),
      title: title.trim(),
      rating: rating,
      review: review.trim(),
    });
    setTitle("");
    setRating(5);
    setReview("");
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} {n === 1 ? "star" : "stars"}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Write a review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button type="submit">Add Movie</button>
    </form>
  );
}

function MovieCard({ movie, onRemove }) {
  return (
    <li className="movie-card">
      <div className="movie-header">
        <h3 className="movie-title">{movie.title}</h3>
        <button className="remove-btn" onClick={() => onRemove(movie.id)}>
          Remove
        </button>
      </div>
      <div className="stars">
        {"⭐".repeat(movie.rating)} ({movie.rating}/5)
      </div>
      {movie.review && <p className="review">{movie.review}</p>}
    </li>
  );
}

function App() {
  const [movies, setMovies] = useState([]);

  function addMovie(movie) {
    setMovies([...movies, movie]);
  }

  function removeMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  return (
    <div className="app">
      <h1>🎬 Movies Watch List</h1>
      <MovieForm onAdd={addMovie} />
      {movies.length === 0 ? (
        <p className="empty">No movies yet. Add your first one!</p>
      ) : (
        <ul className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onRemove={removeMovie} />
          ))}
        </ul>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
