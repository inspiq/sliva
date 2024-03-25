import { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const PaperClipIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 24, height = 24, ...rest } = props;

  const { grey } = useTheme();

  return (
    <svg
      width={width}
      height={height}
      fill={grey}
      viewBox="0 0 30.58 30.58"
      {...rest}
    >
      <path d="M28.692 3.179c-1.892-1.892-4.867-3.428-8.295 0L6.5 17.075c-.107.096-1.386 1.297-1.431 3.039-.028 1.076.413 2.079 1.313 2.979.768.768 1.687 1.167 2.655 1.155 1.754-.021 3.062-1.343 3.204-1.493l10.455-10.454a.999.999 0 1 0-1.414-1.414L10.811 21.358c-.249.256-1.029.884-1.807.89-.426.003-.821-.184-1.208-.57-.5-.5-.738-.99-.728-1.501.017-.907.805-1.647.813-1.656l13.93-13.928c1.352-1.351 3.059-2.409 5.467 0 .882.882 1.319 1.796 1.302 2.718-.029 1.515-1.257 2.667-1.27 2.679L11.691 25.434c-.034.034-1.965 1.986-4.316 2.002-1.237.008-2.412-.536-3.492-1.615-4.082-4.082-.262-8.156-.098-8.327L15.798 5.48a1 1 0 1 0-1.414-1.415L2.356 16.093c-1.878 1.956-4.249 6.78.112 11.142 1.478 1.477 3.139 2.217 4.937 2.2 3.198-.028 5.608-2.491 5.709-2.596l15.574-15.4c.044-.039 1.832-1.686 1.891-4.064.037-1.496-.598-2.908-1.887-4.196z" />
    </svg>
  );
};
