export const useDetectOS = () => {
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    any: function () {
      return isMobile.Android() || isMobile.iOS();
    },
  };

  let whichOS = '';

  if (!isMobile.any()) {
    //Trigger only in the case of NO Mobile operating system detected
    whichOS = 'not detected';
  }
  if (isMobile.any()) {
    //Trigger on any Mobile Operating System.
    whichOS = 'any mobile detected';
  }
  if (isMobile.Android()) {
    //Trigger only on Android Devices
    whichOS = 'android';
  }
  if (isMobile.iOS()) {
    //Trigger only on iOS Devices
    whichOS = 'ios';
  }

  return whichOS !== '' && whichOS;
};
