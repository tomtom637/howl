import React, { useState, useEffect } from 'react';
import ScrollButtonStyled from './ScrollButton-styles';

const ScrollButton = ({ newPostAnchor }) => {

  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    function intersectionCallback(entries) {
      if (!newPostAnchor.current) return;
      if (!entries[0].isIntersecting) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
    const observer = new IntersectionObserver(intersectionCallback);
    if (newPostAnchor.current) {
      observer.observe(newPostAnchor.current);
    }
    return () => {
      if (newPostAnchor.current) {
        observer.unobserve(newPostAnchor.current);
      }
    };
  }, [newPostAnchor.current]);

  return (
    <ScrollButtonStyled>
      <span onClick={scrollToTop}
        style={{ display: visible ? 'block' : 'none' }}
      >
      </span>
    </ScrollButtonStyled>
  );
};

export default ScrollButton;
