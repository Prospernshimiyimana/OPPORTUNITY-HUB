export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">

      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Job Application
        </h1>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="LinkedIn Profile"
            className="w-full border p-3 rounded"
          />

          <textarea
            placeholder="Cover Letter"
            className="w-full border p-3 rounded"
            rows={4}
          ></textarea>

          <button
            type="submit"
            className="bg-indigo-600 text-white w-full py-3 rounded hover:bg-indigo-700"
          >
            Submit Application
          </button>

        </form>

      </div>

    </main>
  );
}