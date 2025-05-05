import { useEffect, useRef } from 'react'
import scrollFadeIn from './scrollFadeIn';

//----------------------------
// scrrollFadeIn ref generator
//----------------------------
const scrollFadeInRefGenerater = () => {
  const fadeRefs = useRef<HTMLElement[]>([]);

  const addFadeRefs = (el: HTMLElement | null) => {
    if (el && !fadeRefs.current.includes(el)) {
      fadeRefs.current.push(el);
    }
  };

  useEffect(() => {
    fadeRefs.current.forEach((ref) => {
      scrollFadeIn(ref, false);
    });
  },[]);

  return { addFadeRefs };
}

export default scrollFadeInRefGenerater;