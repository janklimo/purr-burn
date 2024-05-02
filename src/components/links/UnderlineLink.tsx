import * as React from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

const UnderlineLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, className, dotted = true, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          'animated-underline font-medium pb-1',
          'focus-visible:ring-hl-primary focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-offset-2',
          'border-hl-primary border-b hover:border-black/0',
          dotted && 'border-dotted',
          className,
        )}
      >
        {children}
      </UnstyledLink>
    );
  },
);

export default UnderlineLink;
