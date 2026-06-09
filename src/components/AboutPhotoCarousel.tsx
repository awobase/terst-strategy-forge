import aboutCarousel1 from "@/assets/about-carousel-1.png";
import aboutCarousel2 from "@/assets/about-carousel-2.png";
import AutoPhotoCarousel from "@/components/AutoPhotoCarousel";

const SLIDES = [
  {
    src: aboutCarousel1,
    alt: "Équipe CAYRIBE PARTNERS lors d'un événement professionnel en extérieur",
  },
  {
    src: aboutCarousel2,
    alt: "Équipe CAYRIBE PARTNERS en réunion dans les locaux du cabinet",
  },
];

type AboutPhotoCarouselProps = {
  className?: string;
  imageClassName?: string;
};

const AboutPhotoCarousel = ({ className, imageClassName }: AboutPhotoCarouselProps) => (
  <AutoPhotoCarousel
    slides={SLIDES}
    ariaLabel="Photos de l'équipe CAYRIBE PARTNERS"
    className={className}
    imageClassName={imageClassName}
  />
);

export default AboutPhotoCarousel;
