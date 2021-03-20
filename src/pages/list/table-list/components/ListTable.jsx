import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { queryRule } from '../service';

const Table = (props) => {
  const { columns, actionRef, handleModalVisible, setSelectedRows } = props;
  return <ProTable
    headerTitle="查询表格"
    actionRef={actionRef}
    rowKey="key"
    search={{
      labelWidth: 120,
    }}
    toolBarRender={() => [
      <Button type="primary" onClick={() => handleModalVisible(true)}>
        <PlusOutlined /> 新建
    </Button>,
    ]}
    request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
    columns={columns}
    rowSelection={{
      onChange: (_, selectedRows) => setSelectedRows(selectedRows),
    }}
  />
};

export default Table;

