import { FooterToolbar } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { handleRemove } from '../function';

const FooterTool = (props) => {
  const { actionRef, selectedRowsState, setSelectedRows } = props;

  const handleBatchDelete = async () => {
    await handleRemove(selectedRowsState); setSelectedRows([]);
    actionRef.current?.reloadAndRest?.();
  }

  return <FooterToolbar
    extra={
      <div>
        已选择{' '}
        <a
          style={{
            fontWeight: 600,
          }}
        >
          {selectedRowsState.length}
        </a>{' '}
      项&nbsp;&nbsp;
      <span>
          服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
      </span>
      </div>
    }
  >
    <Button onClick={handleBatchDelete}>批量删除</Button>
    <Button type="primary">批量审批</Button>
  </FooterToolbar>
};

export default FooterTool;

