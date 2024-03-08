export const isTypography = (token) => ['typography'].includes(token.type);
export const isFontSize = (token) => ['fontSizes'].includes(token.type);
export const isSizing = (token) => ['sizing'].includes(token.type);
export const isMath = (token) => ['math'].includes(token.type);

export const isSource = (token) => token.isSource;
export const isPublic = (token) => token.public;
