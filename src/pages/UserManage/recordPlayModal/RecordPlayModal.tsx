import request from '@/utils/request';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Input, Modal } from 'antd';
import React, { useRef, useState } from 'react';

const { TextArea } = Input;

interface Props {
  visible: boolean;
  // lesson: LessonItem
  setOpen: (flag: boolean) => void;
  // update: () => void;
}

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

const isDev = process.env.APP_ENV === 'development';
const BaseUrl = isDev ? 'http://devapi.itso123.com:8091/v1' : '/v1';

const Authorization = window.localStorage.getItem('authorization') || '';

const RecordPlayModal: React.FC<Props> = ({ visible, openId, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const audioRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState('');

  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const audioPlay = (data: any) => {
    console.log(data, audioRef.current);
    // setAudioSrc(data.recFile)
    audioRef.current.src = data.recFile;
    audioRef.current.play();
  };

  const columns: ProColumns<RowItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '课程名称',
      dataIndex: 'lessonTitle',
      copyable: true,
      ellipsis: true,
      width: 300,
    },
    {
      title: '录音时长',
      dataIndex: 'duration',
      copyable: true,
      ellipsis: true,
      width: 200,
      hideInSearch: true,
    },
    {
      title: '得分',
      dataIndex: 'score',
      copyable: true,
      ellipsis: true,
      width: 120,
      hideInSearch: true,
    },
    {
      title: '用户内容',
      dataIndex: 'sentence',
      copyable: true,
      ellipsis: true,
      width: 200,
      hideInSearch: true,
    },
    {
      title: '机器人内容',
      dataIndex: 'robotMsg',
      copyable: true,
      ellipsis: true,
      width: 120,
    },
    {
      title: '录音时间',
      dataIndex: 'createTime',
      copyable: true,
      ellipsis: true,
      width: 120,
      hideInSearch: true,
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
              audioPlay(record);
            }}
          >
            录音播放
          </Button>
        </div>,
      ],
    },
  ];

  return (
    <>
      <Modal
        title="录音试听"
        open={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1500}
      >
        <ProTable<RowItem>
          rowKey="id"
          columns={columns}
          // dataSource={list}
          search={false}
          params={{
            openId,
          }}
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
            const res = await request.getUserRecord({
              page: params.current,
              size: params.pageSize,
              openId: params.openId,
            });
            return {
              data: res.analyses,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: true,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: res.Total,
            };
          }}
          pagination={{
            pageSize: 15,
          }}
          // actionRef={actionRef}
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
        <audio src={audioSrc} ref={audioRef}></audio>
      </Modal>
    </>
  );
};

export default RecordPlayModal;
