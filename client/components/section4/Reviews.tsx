import ReviewCarousel from "./ReviewCarousel";

interface Props {
  reviews: {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export default function Reviews({ reviews }: Props) {
  return (
    <div className="relative h-dvh snap-center flex flex-col justify-center items-center  overflow-hidden">
      {/* Background split */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-(--primary) z-[-1]" />

      {/* Heading */}
      <div className="text-center">
        <h3 className="text-neutral-50">Customer Reviews</h3>
        <p className="text-neutral-50">Thanks for your feedback!</p>
      </div>

      {/* Carousel */}
      <ReviewCarousel reviews={reviews} />
    </div>
  );
}
