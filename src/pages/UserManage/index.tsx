import request from '@/utils/request';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import RecordPlayModal from './recordPlayModal/RecordPlayModal';

type RowItem = {
  id: number;
  title: string;
  desc: string;
  img: string;
  class: string;
  level: string;
  read: number;
  lessonId: number;
  createTime: number;
};

const UserTable: React.FC = () => {
  const [list, updateList] = useState<RowItem[]>([]);
  const [page, updatePage] = useState<number>(1);
  const [recordPlayModalVisible, setRecordPlayModalVisible] = useState<boolean>(false);
  const [currentOpenId, setCurrentOpenId] = useState<string>('');
  const [sectionModalVisible, setSectionModalVisible] = useState<boolean>(false);
  const [translationModalVisible, setTranslationModalVisible] = useState<boolean>(false);
  const [currentSections, setCurrentSections] = useState<{ title: string; descript: string }[]>([]);
  const [currentLesson, setCurrentLesson] = useState<{
    id: number;
    lessonId: number;
    sections: any[];
  }>({
    id: 0,
    lessonId: 0,
    sections: [],
  });
  const actionRef = useRef<ActionType>();

  const updateLessonList = () => {
    request.getUserList({ page, size: 10 }).then((res: any) => {
      console.log('getLessonList', res);
      updateList(res.users);
    });
  };

  //   useEffect(() => {
  //     updateLessonList();
  //   }, [page]);

  const deleteLesson = (lesson: RowItem) => {
    console.log('deleteLesson', lesson);
  };

  const pageChange = (num: number) => {
    console.log('pageChange', num);
    updatePage(num);
  };

  /**
   * 打开播放弹框
   */
  const openRecordDialog = (record: any) => {
    console.log('openRecordDialog', record);
    setCurrentOpenId(record.openId);
    setRecordPlayModalVisible(true);
  };

  const columns: ProColumns<RowItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '用户ID',
      dataIndex: 'openId',
      copyable: true,
      ellipsis: true,
      width: 300,
    },
    {
      title: '号码',
      dataIndex: 'tel',
      copyable: true,
      ellipsis: true,
      width: 200,
      hideInSearch: true,
    },
    {
      title: '城市',
      dataIndex: 'city',
      copyable: true,
      ellipsis: true,
      width: 120,
      hideInSearch: true,
    },
    {
      title: '会员时间',
      dataIndex: 'vipExpire',
      copyable: true,
      ellipsis: true,
      width: 200,
      hideInSearch: true,
    },
    {
      title: '是否是会员',
      dataIndex: 'isVip',
      copyable: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '语速设置',
      dataIndex: 'speechRate',
      copyable: true,
      ellipsis: true,
      width: 120,
      hideInSearch: true,
    },
    {
      title: '课程使用数',
      dataIndex: 'usedLessons',
      copyable: true,
      ellipsis: true,
      width: 120,
      hideInSearch: true,
    },
    {
      title: '最近活跃',
      dataIndex: 'activeTime',
      copyable: true,
      ellipsis: true,
      width: 200,
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      copyable: true,
      ellipsis: true,
      width: 200,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <div key="record">
          <Button
            type="primary"
            onClick={() => {
              openRecordDialog(record);
            }}
          >
            录音播放
          </Button>
        </div>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<RowItem>
        rowKey="openId"
        columns={columns}
        // dataSource={list}
        search={{
          defaultCollapsed: false,
        }}
        // params={params}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: T & {
            pageSize: number;
            current: number;
          },
          sort,
          filter,
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const res = await request.getUserList({ page: params.current, size: params.pageSize });
          return {
            data: res.users,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res.Total,
          };
        }}
        pagination={{
          pageSize: 15,
          onChange: pageChange,
        }}
        actionRef={actionRef}
        // toolBarRender={() => [
        //     <Button
        //     key="button"
        //     icon={<PlusOutlined />}
        //     onClick={() => {
        //         // setLessonModalVisible(true);
        //     }}
        //     type="primary"
        //     >
        //     新建
        //     </Button>,
        // ]}
      ></ProTable>
      <RecordPlayModal
        visible={recordPlayModalVisible}
        openId={currentOpenId}
        setOpen={setRecordPlayModalVisible}
      ></RecordPlayModal>
    </div>
  );
};

export default UserTable;
