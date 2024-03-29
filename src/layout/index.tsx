import { Layout, theme } from 'antd';
import AppMain from './components/AppMain/AppMain';
import Navbar from './components/Navbar';
import SidebarInline from './components/Sidebar/SidebarInline';
import './index.less';

const LayoutApp: React.FC = () => {
  const thme = theme.useToken();

  return (
    <div
      className="layout flex"
      style={{
        color: thme.token.colorText,
      }}
    >
      <SidebarInline />
      <Layout>
        <Navbar />
        <AppMain />
      </Layout>
      {/* <PageBlockerPrompt when={false} useWindowPrompt tabs={[RouteEnum.SettingsScenesAdd]} /> */}
    </div>
  );
};

export default LayoutApp;
