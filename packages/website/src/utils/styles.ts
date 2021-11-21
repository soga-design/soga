// eslint-disable-next-line import/prefer-default-export
export const classnames = (...classNames: Array<string | undefined>) => {
  const classes = classNames
    .filter((className) => Boolean(className) && className !== " ")
    .map((className) => className?.toString().trim()) as Array<string>;
  return classes.length === 0 ? undefined : classes.join(" ");
};
