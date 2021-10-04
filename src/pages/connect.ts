import { connect } from 'umi';
import { AppStore } from '@/models/types/modelsStateType';

const mapStateToProps = ({ global }: AppStore) => {
  return {
    screening: global?.screening,
  };
};

export type IHomeConnectProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps);
