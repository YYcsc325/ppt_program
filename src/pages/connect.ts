import { connect } from 'umi';
import { AppStore } from '@/models/modelsStateType';

const mapStateToProps = ({ page }: AppStore) => {
  return {
    screening: page.screening,
  };
};

export type IPageConnectProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps);
