import request from '@/utils/request';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';

type RowItem = {
  id: number;
  title: string;
  desc: string;
  img: string;
  class: string;
  level: string;
  read: number;
  createTime: number;
};

const columns: ProColumns<RowItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '图片',
    dataIndex: 'img',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '分类',
    dataIndex: 'class',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '适用级别',
    dataIndex: 'level',
    copyable: true,
    ellipsis: true,
  },
];

const defaultData: RowItem[] = [
  {
    id: 1,
    title: '世界历史',
    desc: '介绍世界近代史',
    img: '',
    class: '历史',
    level: '中级',
    read: 12222,
    createTime: 1212121212,
  },
];

const getList = async (params: { page: number; size: number }) => {
  return request.getLessonList(params);
};

const Lesson: React.FC = () => {
  const [list, updateList] = useState<RowItem[]>([]);
  const [page, updatePage] = useState<number>(0);

  useEffect(() => {
    request.getLessonList({ page, size: 10 }).then((res) => {
      console.log('getLessonList', res);
      updateList(res.lessons);
    });
  }, [page]);

  return (
    <PageContainer>
      <ProTable<RowItem> columns={columns} dataSource={list}></ProTable>
    </PageContainer>
  );
};

export default Lesson;
