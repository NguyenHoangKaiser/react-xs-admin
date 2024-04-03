/* eslint-disable import/no-mutable-exports */
import { App, Layout, theme } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';
import AppMain from './components/AppMain/AppMain';
import Navbar from './components/Navbar';
import SidebarInline from './components/Sidebar/SidebarInline';
import './index.less';

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

const LayoutApp: React.FC = () => {
  const thme = theme.useToken();
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;

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
export { message, modal, notification };
export default LayoutApp;
