export default function TrailerModal({ trailerKey, onClose }) {
  if (!trailerKey) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black p-2 rounded">
        <iframe
          width="800"
          height="450"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          allowFullScreen
        ></iframe>

        <button
          onClick={onClose}
          className="mt-3 bg-red-600 px-4 py-2 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
