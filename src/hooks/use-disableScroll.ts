import { useEffect } from 'react';

const keys: any = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e: Event) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e: any) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

export const useDisableScroll = () => {
  useEffect(() => {
    disableScroll();
    return () => enableScroll();
  }, []);

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  };

  const enableScroll = () => {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  };

  return {
    disableScroll,
    enableScroll,
  };
};
