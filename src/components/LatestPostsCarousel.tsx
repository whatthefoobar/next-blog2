"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { Post } from "../../types";
import { truncateText } from "../lib/truncateText";

interface LatestPostsCarouselProps {
  posts: Post[];
}

const LatestPostsCarousel = ({ posts }: LatestPostsCarouselProps) => {
  // Get the last four posts, in reverse order
  const getLastFourArticles = (articles: Post[]): Post[] => {
    return articles.slice(-4).reverse();
  };

  const latestPosts = getLastFourArticles(posts);

  return (
    <div className="my-8 mx-4">
      <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation]}
        className="latest-posts-carousel"
      >
        {latestPosts.map((post) => {
          // const formattedDate = moment(post.date).format("MMMM Do, YYYY");

          return (
            <SwiperSlide key={post._id}>
              <Link href={`/posts/${post._id}`} passHref>
                <div className="flex flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="w-1/2 relative h-64">
                    <Image
                      src={`/images/${post.image}`} // Ensure this path is correct or use an absolute URL
                      alt={post.title}
                      fill
                      sizes="100%"
                      style={{ objectFit: "cover" }}
                      className="rounded-l-lg"
                    />
                  </div>
                  <div className="w-1/2 p-4 flex flex-col justify-center">
                    <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                    <p className="text-sm text-gray-700">
                      {truncateText(post.description, 30)}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default LatestPostsCarousel;
