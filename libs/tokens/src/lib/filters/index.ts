export const isTypography = token => ['typography'].includes(token.type);
export const isFontSize = token => ['fontSizes'].includes(token.type);
export const isSizing = token => ['sizing'].includes(token.type);
export const isSource = token => token.isSource;

// export const isTypographyFilter = {
// 	name: 'isTypography',
// 	matcher: isTypography
// };

// export const isFontSizeFilter = {
// 	name: 'isFontSize',
// 	matcher: isFontSize
// };
