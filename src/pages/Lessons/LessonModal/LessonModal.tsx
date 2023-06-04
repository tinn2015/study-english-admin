import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Space, Upload } from 'antd';
import React, { useState } from 'react';

const { TextArea } = Input;

interface Props {
  visible: boolean;
  // lesson: LessonItem
  setOpen: (flag: boolean) => void;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const LessonModal: React.FC<Props> = ({ visible, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  console.log('lessonItem', visible);

  const handleOk = () => {
    console.log('form', form.submit());
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const onFinish = (values: any) => {
    console.log('onfinish', values);
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
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="封面" name="img" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <div style={{ fontSize: '14px', marginBottom: '20px', fontWeight: 600 }}>章节</div>
          <Form.Item>
            <Form.List name="section">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        {...field}
                        label="标题："
                        name={[field.name, 'title']}
                        rules={[{ required: true, message: '请输入章节名称' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...field}
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
