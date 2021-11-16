import { Button, Table, Space, Modal, Popconfirm, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import router from "next/router";
import { useEffect, useState } from "react";
import { CarouselProps } from "../../services/carousel/carousel.model";
import {
  deleteCarousel,
  getAllCarousel,
} from "../../services/carousel/carousel.service";
import DeleteCarousel from "./DeleteCarousel";
import UpdateCarousel from "./UpdateCarousel";
import UpdateCarouselModal from "./UpdateCarouselModal";
import { UploadFile } from "antd/lib/upload/interface";
import { FieldData } from "rc-field-form/lib/interface";
import axios from "axios";
import { useForm } from "antd/lib/form/Form";

type Transaction = {
  key: string;
  id: string;
  date: string;
  title: string;
  description: string;
  link: string;
  imgUrl: string;
};

interface fieldImg {
  uid: string,
  name: string,
  status: string,
  url: string,
}

const TableCarousel = () => {
  const [ informs, setInforms ] = useState<CarouselProps[]>([]);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ carouId, setCarouId ] = useState('');
  const [ editCarousel, setEditCarousel ] = useState<FieldData[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllCarousel()
      .then((res: any) => {
        setInforms(res?.data);
      })
      .catch((e) => {
        const content =
          e instanceof Error
            ? e.toString()
            : e?.response?.data?.message || null;
        Modal.error({
          title: content,
        });
      });
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (a: any) => (
        <a href={`https://${a}`} target="_blank">
          {a}
        </a>
      ),
    },
    {
      title: "Image",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (a: any) => (
        <a href={a} target="_blank">
          View
        </a>
      ),
    },
    {
      title: "Edit / Delete",
      key: "action",
      render: (action: any, record: Transaction) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                console.log(record)
                onUpdateModal(record);
              }}
            >
              Edit
            </Button>

            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                deleteCarousel(record.id).then((res: any) =>
                  router.reload(window.location.pathname)
                );
              }}
            >
              <a type="danger">Delete</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const onUpdateModal = (record: Transaction) => {
    setIsEditing(true);
    setCarouId(record.id)
    setEditCarousel([
      {
        name: ['title'],
        value: record.title
      },
      {
        name: ['description'],
        value: record.description
      },
      {
        name: ['link'],
        value: record.link
      },
    ]); 
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

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

  return (
    <>
      <Table
        columns={columns}
        dataSource={informs.map((inform) => {
          return {
            key: inform.id,
            id: inform.id,
            date: inform.createdAt,
            title: inform.title,
            description: inform.description,
            link: inform.link,
            imgUrl: inform.imgUrl,
          };
        })}
      />

      <Modal
        visible={isEditing}
        title="Edit Carousel"
        okText="Edit"
        cancelText="Cancel"
        onCancel={() => {
          setIsEditing(false);
        }}
        onOk={() => {
          form
          .validateFields()
          .then((_values: any) => {
            const formData = new FormData();
            formData.append("title", _values.title);
            formData.append("description", _values.description);
            formData.append("link", _values.link);

            if (_values.image[0]){
              formData.append(
                "image",
                _values.image[0].originFileObj,
                _values.image[0].originFileObj.name
              );
            }

            const config = {
              method: "PUT",
              url: `${process.env.NEXT_PUBLIC_API_URL}/carousels/${carouId}/update`,
              data: formData,
            };

            return axios.put(config.url, config.data)
            .then((res: any) => {
              Modal.success({
                content: 'Update This Carousel -- Completed!',
                onOk() {
                  router.reload(window.location.pathname);
                }
              })
            });
          })
          setIsEditing(false); 
        }}
      >
        <Form form={form} fields={editCarousel} layout="vertical" name="edit_carousel_modal">
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
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="If you want to change a image"
          >
            <Upload {...uploadProps} >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  );
};

export default TableCarousel;
