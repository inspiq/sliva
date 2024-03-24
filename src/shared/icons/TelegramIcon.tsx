import { SVGProps } from 'react';

export const TelegramIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 24, height = 24, color } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill={color ?? '#039be5'}
      {...props}
    >
      <path d="M22.122 10.04h.022c.209 0 .403.065.562.177l-.003-.002a.632.632 0 0 1 .213.403v.003a2.553 2.553 0 0 1 .024.598v-.009c-.225 2.369-1.201 8.114-1.697 10.766-.21 1.123-.623 1.499-1.023 1.535-.869.081-1.529-.574-2.371-1.126-1.318-.865-2.063-1.403-3.342-2.246-1.479-.973-.52-1.51.322-2.384.221-.23 4.052-3.715 4.127-4.031a.308.308 0 0 0-.07-.265.34.34 0 0 0-.185-.053.364.364 0 0 0-.128.024l.002-.001q-.198.045-6.316 4.174a2.805 2.805 0 0 1-1.619.599h-.006a10.542 10.542 0 0 1-2.401-.573l.074.024c-.938-.306-1.683-.467-1.619-.985q.051-.404 1.114-.827 6.548-2.853 8.733-3.761a22.627 22.627 0 0 1 5.429-2.01l.157-.031zM15.93 1.025C7.628 1.045.905 7.78.905 16.085c0 8.317 6.742 15.06 15.06 15.06s15.06-6.742 15.06-15.06c0-8.305-6.723-15.04-15.023-15.06H15.93z" />
    </svg>
  );
};
