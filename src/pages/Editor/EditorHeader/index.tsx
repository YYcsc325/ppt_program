import React, { useState } from 'react';
import { Dropdown, Menu, Drawer } from 'antd';
import { utils } from 'react-dtcomponents';
import { IconPosition, IconFont } from '@/components';
import { HOTKEY_DOC } from '@/config/hotKey';

import HotKey from '../conponents/HotKey';
import styles from './index.less';

const editorHeaderPrefixCls = utils.createPrefixCls(
  'editor-header',
  styles,
  'ppt',
);

const EditorHeader: React.FC = () => {
  const [visible, setVisible] = useState(false);

  /** 导出 JSON */
  const exportJSON = () => {};

  /** 导出 PPTX */
  const exportPPTX = () => {};

  /** 撤销 */
  const undo = () => {};

  /** 重做 */
  const redo = () => {};

  /** 添加页面 */
  const createSlide = () => {};

  /** 删除页面 */
  const deleteSlide = () => {};

  /** 打开网格线 */
  const toggleGridLines = () => {};

  /** 重置幻灯片 */
  const resetSlides = () => {};

  /** 从头开始 */
  const enterScreeningFromStart = () => {};

  /** 从当前页开始 */
  const enterScreening = () => {};

  /** 意见反馈 */
  const goIssues = () => {};

  /** 快捷键 */
  const hotKey = () => {};

  /** 操作快捷键 */
  const handleHotkey = (bol: boolean) => {
    setVisible(bol);
  };
  return (
    <div className={editorHeaderPrefixCls()}>
      <div className={editorHeaderPrefixCls('left')}>
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item key="exportJSON" onClick={exportJSON}>
                导出 JSON
              </Menu.Item>
              <Menu.Item key="exportPPTX" onClick={exportPPTX}>
                导出 PPTX
              </Menu.Item>
            </Menu>
          }
        >
          <div className={editorHeaderPrefixCls('menu-item')}>
            <IconPosition type="file" position="left">
              <span>文件</span>
            </IconPosition>
          </div>
        </Dropdown>
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item key="undo" onClick={undo}>
                撤销
              </Menu.Item>
              <Menu.Item key="redo" onClick={redo}>
                重做
              </Menu.Item>
              <Menu.Item key="createSlide" onClick={createSlide}>
                添加页面
              </Menu.Item>
              <Menu.Item key="deleteSlide" onClick={deleteSlide}>
                删除页面
              </Menu.Item>
              <Menu.Item key="toggleGridLines" onClick={toggleGridLines}>
                打开网格线
              </Menu.Item>
              <Menu.Item key="resetSlides" onClick={resetSlides}>
                重置幻灯片
              </Menu.Item>
            </Menu>
          }
        >
          <div className={editorHeaderPrefixCls('menu-item')}>
            <IconPosition type="edit" position="left">
              <span>编辑</span>
            </IconPosition>
          </div>
        </Dropdown>
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item
                key="enterScreeningFromStart"
                onClick={enterScreeningFromStart}
              >
                从头开始
              </Menu.Item>
              <Menu.Item key="enterScreening" onClick={enterScreening}>
                从当前页开始
              </Menu.Item>
            </Menu>
          }
        >
          <div className={editorHeaderPrefixCls('menu-item')}>
            <IconPosition type="screen" position="left">
              <span>演示</span>
            </IconPosition>
          </div>
        </Dropdown>
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item key="goIssues" onClick={goIssues}>
                意见反馈
              </Menu.Item>
              <Menu.Item key="hotKey" onClick={() => handleHotkey(true)}>
                快捷键
              </Menu.Item>
            </Menu>
          }
        >
          <div className={editorHeaderPrefixCls('menu-item')}>
            <IconPosition type="help" position="left">
              <span>帮助</span>
            </IconPosition>
          </div>
        </Dropdown>
      </div>
      <div className={editorHeaderPrefixCls('right')}>
        <div className={editorHeaderPrefixCls('menu-item')}>
          <span>幻灯片播放</span>
        </div>
      </div>
      <Drawer
        width={320}
        title="快捷键"
        placement="right"
        closable={false}
        onClose={() => handleHotkey(false)}
        visible={visible}
      >
        <div className={editorHeaderPrefixCls('hotkey-doc')}>
          {HOTKEY_DOC.map((item) => (
            <HotKey title={item.type} key={item.type}>
              {item.children.map((val) => (
                <HotKey.Item
                  label={val.label}
                  value={val.value}
                  key={val.label}
                />
              ))}
            </HotKey>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default EditorHeader;
