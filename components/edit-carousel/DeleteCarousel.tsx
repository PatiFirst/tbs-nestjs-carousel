import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
import React from 'react'

function showDeleteConfirm() {
    confirm({
      title: 'Are you sure delete this carousel?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

export default function DeleteCarousel() {
    return (
        <>
            <Button danger type="link" onClick={showDeleteConfirm}>Delete</Button>
        </>
    )
}
