import { connect, Dispatch } from 'umi';
import { editorActions } from '@/models/editor';
import { AppStore } from '@/store';

const mapStateToProps = ({ editor }: AppStore) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export type IConnectProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);
