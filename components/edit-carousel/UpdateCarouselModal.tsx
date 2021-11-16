import { Button, Modal, Form, Input, Radio, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}
const UpdateCarouselModal = (props: any) => {
  const [visible, setVisible] = useState(false);
  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

//   if(visible) {
//     const { body } = props;
//     console.log()

//     const uploadProps = {
//       name: "img",
//       listType: "picture",
//       defaultFileList: [
//         {
//           uid: '1',
//           title: body,
//           url: "",
//         }
//       ],
//       maxCount: 1,
//     }
//   }
  const uploadProps = {
    name: "img",
    listType: "picture",
    defaultFileList: [
        {
            uid: '1',
            name: 'yyy.png',
            status: 'done',
            url: {},
        },
    ],
    maxCount: 1,
  }


  
const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Edit Carousel"
      okText="Edit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of this carousel!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input the description of this carousel!",
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="link" label="Link" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Image"
          valuePropName="fileList"
          //   getValueFromEvent={normFile}
          rules={[{ required: true }]}
          // extra="longgggggggggggggggggggggggggggggggggg"
        >
          {/* <Upload
            {...uploadProps}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload> */}
        </Form.Item>
      </Form>
    </Modal>
  );
};

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Edit
      </Button>

      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
}


export default UpdateCarouselModal;