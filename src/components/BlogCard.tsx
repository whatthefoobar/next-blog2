import { truncateText } from "@/lib/truncateText";

import Image from "next/image";
import Link from "next/link";

interface IBlogCardProps {
  id: string;
  image?: string;
  title: string;
  description: string;
  date?: string;
  tags: string[];
}

const BlogCard = ({
  id,
  image,
  title,
  description,

  tags,
}: IBlogCardProps) => {
  // const imagePath = new URL(`../assets/images/${image}`, import.meta.url).href;

  // const formatedDate = moment(date, "M/D/YYYY").format("MMMM Do, YYYY");

  // console.log("converted date", formatedDate); // Sept 24, 2021
  const path = `/posts/${id}`;
  const formatedDescription = truncateText(description, 20);

  return (
    <Link href={path}>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
        {image ? (
          <Image
            className="h-48 w-full object-cover"
            width={200}
            height={50}
            src={`/images/${image}`}
            alt={title}
          />
        ) : (
          <Image
            className="h-48 w-full object-cover"
            src={"https://via.placeholder.com/150"}
            alt={title}
          />
        )}

        <div className="p-8 flex flex-col justify-between flex-1">
          <div>
            {/* <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {formatedDate}
            </div> */}
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
              {title}
            </h2>

            <p className="mt-2 text-gray-500">{formatedDescription}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
