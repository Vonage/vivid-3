// declare module '*.css' {
//   const classes: { [key: string]: string };
//   export default classes;
// }

// declare module '*.scss' {
//   const classes: { [key: string]: string };
//   export default classes;
// }

declare module '*.scss' {
  const classes: import('lit').CSSResult;
  export default classes;
}