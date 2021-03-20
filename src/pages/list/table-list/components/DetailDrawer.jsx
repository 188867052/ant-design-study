import ProDescriptions from '@ant-design/pro-descriptions';
import { Drawer } from 'antd';

const DetailDrawer = (props) => {
  const { columns, row, setRow } = props;

  return <Drawer width={600} visible={!!row} onClose={() => { setRow(undefined); }} closable={false}  >
    {row?.name && (
      <ProDescriptions
        column={2}
        title={row?.name}
        request={async () => ({ data: row || {}, })}
        params={{ id: row?.name, }}
        columns={columns}
      />
    )}
  </Drawer>
};

export default DetailDrawer;

