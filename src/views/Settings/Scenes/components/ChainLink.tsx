import type { CSSObject } from '@emotion/react';
import type { GlobalToken } from 'antd';
import { Card, theme, Typography } from 'antd';
import type { ReactNode } from 'react';

const ChainLink = ({
  style,
  active = true,
  text = 1,
}: {
  style?: React.CSSProperties;
  active?: boolean;
  text?: 1 | 2;
}) => {
  const { token } = theme.useToken();
  return (
    <div style={style} css={getDivCss(token, active)}>
      <span className="top-chain" />
      <span className="bottom-chain" />
      <Typography.Text
        style={{
          color: active ? token.blue : token.colorText,
        }}
        // type={active ? 'success' : 'secondary'}
      >
        {text === 2 ? 'OR' : 'AND'}
      </Typography.Text>
    </div>
  );
};

export default ChainLink;

export const CardContent = ({
  children,
  type = 1,
  hideChain,
}: {
  children: ReactNode;
  type?: 1 | 2;
  hideChain?: boolean;
}) => {
  return (
    <>
      <Card
        styles={{
          body: {
            padding: '12px 24px',
            position: 'relative',
            // width: '100%',
            // height: '100%',
          },
        }}
        style={{ width: '100%', minHeight: 100, padding: 0 }}
      >
        {children}
      </Card>
      {!hideChain && (
        <div className="pl-[100px]">
          <ChainLink text={type} />
        </div>
      )}
    </>
  );
};

const getDivCss = (token: GlobalToken, active: boolean): CSSObject => {
  return {
    '&': {
      position: 'relative',
      width: 45,
      height: 20,
      border: `1px solid ${active ? token.blue : token.colorBorder}`,
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
      border: `1px solid ${active ? token.blue : token.colorBorder}`,
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
      border: `1px solid ${active ? token.blue : token.colorBorder}`,
      borderTop: `1px solid transparent`,
      backgroundColor: token.colorBgLayout,
      zIndex: 1000,
    },
  };
};
