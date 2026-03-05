const typeOf = (token) => token?.type ?? token?.$type;
export const isTypography = (token) => ['typography'].includes(typeOf(token));
export const isFontSize = (token) => ['fontSizes'].includes(typeOf(token));
export const isSizing = (token) => ['sizing'].includes(typeOf(token));
export const isMath = (token) => ['math'].includes(typeOf(token));

export const isSource = (token) => token?.isSource === true;
export const isPublic = (token) => token?.public === true;
