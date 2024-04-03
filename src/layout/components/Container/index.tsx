import { AppDefault } from '@/utils/constant';
import { Layout } from 'antd';
const { Content } = Layout;
interface PageProps {
  children: React.ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <Layout>
      <Content
        style={{
          height: AppDefault.height,
          width: '100%',
          padding: '4px 4px',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default Page;
