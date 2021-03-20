import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import { getColumns } from "./columns";
import CreateForm from './components/CreateForm';
import DetailDrawer from './components/DetailDrawer';
import FooterTool from './components/FooterToolbar';
import Table from './components/ListTable';
import UpdateForm from './components/UpdateForm';
import { handleAdd, handleUpdate } from './function';

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);

  const columns = getColumns(setRow, handleUpdateModalVisible, setStepFormValues);
  const commonProps = {
    columns,
    actionRef,
    createModalVisible,
    handleModalVisible,
    updateModalVisible,
    handleUpdateModalVisible,
    stepFormValues,
    setStepFormValues,
    row,
    setRow,
    selectedRowsState,
    setSelectedRows
  }
  return (
    <PageContainer>
      <Table {...commonProps} />
      {selectedRowsState?.length > 0 && (<FooterTool {...commonProps} />)}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
      <DetailDrawer {...commonProps}></DetailDrawer>
    </PageContainer>
  );
};

export default TableList;
