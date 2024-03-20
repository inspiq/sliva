const sizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
};

export const devices = {
  mobileS: `(max-width: ${sizes.mobileS})`,
  mobileM: `(max-width: ${sizes.mobileM})`,
  mobileL: `(max-width: ${sizes.mobileL})`,
  tablet: `(max-width: ${sizes.tablet})`,
  laptop: `(max-width: ${sizes.laptop})`,
  laptopL: `(max-width: ${sizes.laptopL})`,
};

export const SPECIALISTS_PAGINATION_STEP = 20;
export const DEFAULT_REVIEWS_COUNT = 0;
export const DEFAULT_AVG_RATING = 0;
export const SKELETON_MESSAGES_COUNT = 8;
export const SKELETON_SPECIALISTS_COUNT = 5;
export const SKELETON_REVIEWS_COUNT = 3;
export const SKELETON_DURATION = 1;
export const MODAL_COOKIE_EXPIRATION_DURATION = 7 * 24 * 60 * 60;
