import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
            <img src="https://firebasestorage.googleapis.com/v0/b/bq-final-project-storage.appspot.com/o/images%2Fbanners%2Fbanner1.png?alt=media&token=6dc76e30-aa96-46f1-9bf3-ce8d1dde19a3" alt="" />   
        </Carousel.Item>
        <Carousel.Item>
            <img src="https://firebasestorage.googleapis.com/v0/b/bq-final-project-storage.appspot.com/o/images%2Fbanners%2Fbanner2.png?alt=media&token=149c8476-4a6b-448b-a0c6-80dbaa1b9b1b" alt="" />   
        </Carousel.Item>
        <Carousel.Item>
            <img src="https://firebasestorage.googleapis.com/v0/b/bq-final-project-storage.appspot.com/o/images%2Fbanners%2Fbanner3.png?alt=media&token=15473303-29f9-4920-8b0c-13ee2238f779" alt="" />
        </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;