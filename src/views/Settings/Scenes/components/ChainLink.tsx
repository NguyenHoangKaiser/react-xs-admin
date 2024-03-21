import type { CSSObject } from '@emotion/react';
import type { GlobalToken } from 'antd';
import { theme, Typography } from 'antd';

const ChainLink = ({
  style,
  active = true,
  text = 0,
}: {
  style?: React.CSSProperties;
  active?: boolean;
  text?: 0 | 1;
}) => {
  const { token } = theme.useToken();
  return (
    <div style={style} css={getDivCss(token, active)}>
      <span className="top-chain" />
      <span className="bottom-chain" />
      <Typography.Text
        style={{
          fontSize: 12,
        }}
        type={active ? 'success' : 'secondary'}
      >
        {text ? 'OR' : 'AND'}
      </Typography.Text>
    </div>
  );
};

export default ChainLink;

const getDivCss = (token: GlobalToken, active: boolean): CSSObject => {
  return {
    '&': {
      position: 'relative',
      width: 45,
      height: 17,
      border: `1px solid ${active ? token.colorSuccess : token.colorBorder}`,
      backgroundColor: token.colorBgLayout,
      zIndex: 999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .top-chain': {
      position: 'absolute',
      top: -8,
      width: 25,
      height: 8,
      right: 9,
      border: `1px solid ${active ? token.colorSuccess : token.colorBorder}`,
      borderBottom: `1px solid transparent`,
      backgroundColor: token.colorBgLayout,
      zIndex: 1000,
    },
    '& .bottom-chain': {
      position: 'absolute',
      bottom: -8,
      width: 25,
      height: 8,
      right: 9,
      border: `1px solid ${active ? token.colorSuccess : token.colorBorder}`,
      borderTop: `1px solid transparent`,
      backgroundColor: token.colorBgLayout,
      zIndex: 1000,
    },
  };
};
