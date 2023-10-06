import { addLesson } from '@/utils/request/lesson';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Select, Space, Upload } from 'antd';
import React, { useState } from 'react';

const { TextArea } = Input;

interface Props {
  visible: boolean;
  // lesson: LessonItem
  setOpen: (flag: boolean) => void;
  update: () => void;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const isDev = process.env.NODE_ENV === 'development';
const BaseUrl = isDev ? '/v2' : '/v1';

const Authorization = window.localStorage.getItem('authorization') || '';

const LessonModal: React.FC<Props> = ({ visible, setOpen, update }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  console.log('lessonItem', visible);

  const handleOk = () => {
    console.log('form', form.submit());
    setConfirmLoading(true);
    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
    setFileList([]);
    form.resetFields();
  };

  const onFinish = (values: any) => {
    console.log('onfinish', values);
    if (values.img[0]) {
      values.img = values.img[0].response.url;
    }
    addLesson(values).then(() => {
      setOpen(false);
      setConfirmLoading(false);
      form.resetFields();
      message.success('添加课程成功');
      update();
    });
  };

  // const handleBeforeUpload = (file, fileList) => {
  //   if (fileList.length === 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const handleOnChange = (info) => {
    let newFileList = [...info.fileList];

    // 限制上传一个文件
    if (newFileList.length > 1) {
      newFileList = newFileList.slice(-1);
    }

    // 如果上传的文件有返回url则覆盖原来上传的文件
    newFileList = newFileList.map((file) => {
      if (file.response && file.response.url) {
        file.url = file.response.url;
      }
      return file;
    });
    console.log('newFileList', JSON.parse(JSON.stringify(newFileList)));
    setFileList(newFileList);
  };

  return (
    <>
      <Modal
        title="新建课程"
        open={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 800 }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入课程标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="描述"
            name="descript"
            rules={[{ required: true, message: '请输入课程描述' }]}
          >
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item
            label="分类"
            name="class"
            rules={[{ required: true, message: '请输入课程分类' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="级别"
            name="level"
            rules={[{ required: true, message: '请选择课程级别' }]}
          >
            <Select>
              <Select.Option value="初级">初级</Select.Option>
              <Select.Option value="中级">中级</Select.Option>
              <Select.Option value="高级">高级</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="封面" name="img" getValueFromEvent={normFile}>
            <Upload
              action={`${BaseUrl}/admin/image/upload`}
              name={'recfile'}
              headers={{ Authorization: Authorization }}
              onChange={handleOnChange}
              fileList={fileList}
              defaultFileList={[]}
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <div style={{ fontSize: '14px', marginBottom: '20px', fontWeight: 600 }}>章节</div>
          <Form.Item>
            <Form.List name="sections">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Space key={field.key + 'section'} align="baseline">
                      <Form.Item
                        {...field}
                        label={`标题：`}
                        key={`${field}title`}
                        name={[field.name, 'title']}
                        rules={[{ required: true, message: '请输入章节名称' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        key={`${field}descript`}
                        label="描述: "
                        name={[field.name, 'descript']}
                        rules={[{ required: true, message: '请输入章节描述' }]}
                      >
                        <Input />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      添加章节
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LessonModal;
