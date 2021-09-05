import { connect } from 'umi';
import { AppStore } from '@/models/modelsStateType';

const mapStateToProps = ({ home }: AppStore) => {
  return {
    screening: home?.screening,
  };
};

export type IHomeConnectProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps);
