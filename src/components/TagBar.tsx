interface TagBarProps {
  selectedTag: string;
  uniqueTags: string[];
  onTagClick: (tag: string) => void;
}

const TagBar = ({ selectedTag, uniqueTags, onTagClick }: TagBarProps) => {
  return (
    <div className="mb-4 flex space-x-4 overflow-x-auto">
      <button
        className={`py-2 px-4 rounded-full ${
          selectedTag === "all"
            ? "bg-teal-700 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => onTagClick("all")}
      >
        All
      </button>
      {uniqueTags.map((tag) => (
        <button
          key={tag}
          className={`py-2 px-4 rounded-full ${
            selectedTag === tag
              ? "bg-teal-700 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagBar;
