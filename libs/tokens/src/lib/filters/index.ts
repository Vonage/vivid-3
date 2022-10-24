export const isTypography = token => ['typography'].includes(token.type);
export const isFontSize = token => ['fontSizes'].includes(token.type);

export const isTypographyFilter = {
	name: 'isTypography',
	matcher: isTypography
};

export const isFontSizeFilter = {
	name: 'isFontSize',
	matcher: isFontSize
};
