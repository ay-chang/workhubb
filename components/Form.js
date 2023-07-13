import Link from "next/link";

/**
 * This is the Form component used for creating a new post and editing an existing post.
 *
 * TODO:
 * Make own css and tailwind customizations
 *
 * - customize h1 tag for Create Post
 * - redesign the form box from glasssmoprhism
 * - edit description
 * - Better understand how this file works
 */

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head__text text-left">
        <span>{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">{type} a job posting to the WorkHubb community</p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/** Main job description text box */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Enter your job description here
          </span>
          <textarea
            value={post.post}
            onChange={(e) => setPost({ ...post, post: e.target.value })}
            placeholder="Type here"
            required
            className="form__textarea"
          />
        </label>

        {/** Tags input box */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags
            <span className="font-normal">
              {` `}(#webdev, # graphicdesign, #marketing, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tags"
            required
            className="form__input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm rounded-full"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
