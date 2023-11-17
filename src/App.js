import { Divider, ConfigProvider, Typography } from 'antd';

import './App.css';
import CreatePost from './CreatePost';
import Timeline from './Timeline';

const { Title } = Typography;

const DIVIDER_THEME = {
  token: {
    lineWidth: 4,
    colorSplit: 'rgba(0, 0, 0, 0.88)',
    lineHeight: '100%'
  },
};

const CustomDivider = () => (
  <ConfigProvider theme={DIVIDER_THEME}>
    <Divider type='vertical' style={{ height: '100vh', marginInline: 0 }} />
  </ConfigProvider>
);

function App() {
  return (
    <div className="App">
      <Title level={4} style={{ minWidth: '300px' }}>Hello, Welcome</Title>
      <CustomDivider />
      <Timeline />
      <CustomDivider />
      <CreatePost />
    </div>
  );
}

export default App;
