import React, { Fragment } from 'react';
import IconFont, { IconFontProps } from '@/components/IconFont';

export interface IconPositionProps extends IconFontProps {
  position: 'left' | 'right';
  space?: number;
}

const mapCom = {
  left: ({
    children,
    space,
    type,
    ...rest
  }: Omit<IconPositionProps, 'position'>) => {
    return (
      <Fragment>
        <IconFont type={type} {...rest} />
        <span style={{ marginLeft: space }} />
        {children}
      </Fragment>
    );
  },
  right: ({
    children,
    space,
    type,
    ...rest
  }: Omit<IconPositionProps, 'position'>) => {
    return (
      <Fragment>
        {children}
        <span style={{ marginLeft: space }} />
        <IconFont type={type} {...rest} />
      </Fragment>
    );
  },
};

const IconPosition: React.FC<IconPositionProps> = ({
  position = 'left',
  space = 4,
  ...rest
}) => {
  const Com = mapCom[position] || mapCom.left;

  return (
    <Fragment>
      <Com {...rest} space={space} />
    </Fragment>
  );
};

export default IconPosition;
