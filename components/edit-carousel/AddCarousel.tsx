import {
  Form,
  Input,
  Button,
  Upload,
  Divider,
  Modal,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import router from "next/router";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const validateMessages = {
  required: "${label} is required!",
};

const AddCarouselForm = () => {
  const uploadProps: any = {
    name: "img",
    listType: "picture",
    maxCount: 1,
    beforeUpload(file: any) {
      if (file.type !== "image/jpeg") {
        message.error(`${file.name} is not a jpeg/jpg file`);
      }
      return file.type === "image/jpeg"
        ? true
        : Upload.LIST_IGNORE;
    },
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onAddCarousel = (_values: any) => {
    const formData = new FormData();
    formData.append("title", _values.title);
    formData.append("description", _values.description);
    formData.append("link", _values.link);
    formData.append(
      "image",
      _values.image[0].originFileObj,
      _values.image[0].originFileObj.name
    );

    const config = {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/carousels/upload`,
      data: formData,
    };

    return axios.post(config.url, config.data)
    .then((res: any) => {
      Modal.success({
        content: 'Add a New Carousel Complete',
        onOk() {
          router.reload(window.location.pathname);
        }
      })
    });
  };

  return (
    <Form
      {...layout}
      name="add-carousel"
      onFinish={onAddCarousel}
      validateMessages={validateMessages}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={"description"}
        label="Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="link" label="Link" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="image"
        label="Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Only one Image"
        rules={[{ required: true }]}
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Upload
        </Button>
      </Form.Item>
    </Form>
  );
};

export default function AddCarousel() {
  return (
    <>
      <Divider>Add Carousel Here!</Divider>
      <AddCarouselForm />
    </>
  );
}
