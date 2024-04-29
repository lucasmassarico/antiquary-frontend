import React, { useState, ReactNode } from "react";
import {
    CarouselContainer,
    Slide,
    SlideContainer,
    PrevButton,
    NextButton,
    Image,
} from "./styles";
import { CaretRight, CaretLeft } from "phosphor-react";

interface CarouselProps {
    children: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
        );
    };

    return (
        <CarouselContainer>
            <SlideContainer
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {React.Children.map(children, (child) => (
                    <Slide>
                        <Image
                            src={(child as React.ReactElement).props.src}
                            alt={(child as React.ReactElement).props.alt}
                        />
                    </Slide>
                ))}
            </SlideContainer>
            <PrevButton onClick={prevSlide}>
                <CaretLeft size={48} />
            </PrevButton>
            <NextButton onClick={nextSlide}>
                <CaretRight size={48} />
            </NextButton>
        </CarouselContainer>
    );
};

export default Carousel;
