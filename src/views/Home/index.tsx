import { RightOutlined } from '@ant-design/icons';
import { Card, Col, Progress, Row, theme } from 'antd';
import { memo } from 'react';
// import './index.less';
import AreaChart from './components/AreaChart';
import Comment from './components/Comment';
import RoseChart from './components/RoseChart';
import WordCloudChart from './components/WordCloudChart';
import { getNumericalValue } from './style';

const Home = memo(() => {
  const thme = theme.useToken();

  const speedList = [
    {
      title: 'To do it',
      online: 24,
      total: 70,
    },
    {
      title: 'Upcoming Tasks',
      online: 39,
      total: 100,
    },
    {
      title: 'Target plan',
      online: 5,
      total: 10,
    },
    {
      title: 'Comment reply',
      online: 10,
      total: 40,
    },
  ];

  const value = (online: number, total: number) => {
    return Math.round((online / total) * 100);
  };

  return (
    <div className="p-3">
      <Row gutter={[12, 12]}>
        {speedList.map((i) => {
          return (
            <Col lg={6} sm={24} xs={24} key={i.title}>
              <Card size="small" title={i.title} extra={<RightOutlined />}>
                <div css={getNumericalValue(thme.token)}>
                  <div className="numerical-value">
                    <span className="number">
                      {i.online}/{i.total}
                    </span>
                    <span>Online/Total</span>
                  </div>
                  <Progress
                    percent={value(i.online, i.total)}
                    // size={[200, 17]}
                    strokeColor={thme.token.colorPrimary}
                  />
                </div>
              </Card>
            </Col>
          );
        })}

        <Col lg={18} sm={24} xs={24}>
          <Card size="small" title="任务数据">
            <AreaChart />
          </Card>
        </Col>
        <Col lg={6} sm={24} xs={24}>
          <Card size="small" title="任务数据">
            <RoseChart />
          </Card>
        </Col>
        <Col lg={18} sm={24} xs={24}>
          <Card size="small" title="评论列表">
            <Comment />
          </Card>
        </Col>
        <Col lg={6} sm={24} xs={24}>
          <Card size="small" title="词云">
            <WordCloudChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default Home;
