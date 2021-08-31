import React, { useState } from 'react';
import { Steps, AverageLabel, CustomModal } from 'react-dtcomponents';
import { Button } from 'antd';
import 'react-dtcomponents/dist/index.css';

import styles from './index.less';

export default function IndexPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModalClick = () => {
    setIsModalVisible(true);
  };
  const showModalApi = () => {
    const modal = CustomModal.showModal({
      footer: null,
      onCancel: () => {
        modal.destroy();
      },
      onOk: () => {
        modal.destroy();
      },
      children: (
        <div>
          <div>奥术大师多</div>
          <div>按时肯定会啊</div>
        </div>
      ),
    });
  };
  return (
    <div>
      <div>
        <Steps current={1}>
          <Steps.Step title="测试数据1" />
          <Steps.Step title="测试数据2" />
          <Steps.Step title="测试数据3" />
        </Steps>
      </div>
      <div>
        <AverageLabel size={3}>
          <AverageLabel.Item label={'测试1'} value={'1'} key={'1'} />
          <AverageLabel.Item label={'测试2'} value={'2'} key={'2'} />
          <AverageLabel.Item label={'测试3'} value={'3'} key={'3'} />
          <AverageLabel.Item label={'测试4'} value={'4'} key={'4'} />
          <AverageLabel.Item label={'测试5'} value={'5'} key={'5'} />
          <AverageLabel.Item label={'测试6'} value={'6'} key={'6'} />
          <AverageLabel.Item label={'测试7'} value={'7'} key={'7'} />
        </AverageLabel>
      </div>
      <div>
        <CustomModal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </CustomModal>
        <Button type="primary" onClick={showModalClick}>
          Open Modal 组件调用
        </Button>
      </div>
      <div style={{ marginTop: '40px' }}>
        <Button type="primary" onClick={showModalApi}>
          Open Modal api调用
        </Button>
      </div>
      <div className={styles.color}>颜色</div>
    </div>
  );
}
