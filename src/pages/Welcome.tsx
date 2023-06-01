import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { theme } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return <PageContainer>欢迎学英语</PageContainer>;
};

export default Welcome;
