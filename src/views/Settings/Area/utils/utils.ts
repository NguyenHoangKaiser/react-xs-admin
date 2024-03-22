import type { IDevicesListItem1, ISectionListItem } from '@/utils/constant';
import type { TreeDataNode } from 'antd';
export function generateAnchorList2(
  deviceList: IDevicesListItem1[],
  sectionList: ISectionListItem[],
): IAnchorItem2[] {
  const getChildren = (parentId: number | null, level = 0) => {
    const children: IAnchorItem2[] = [];
    sectionList.forEach((item) => {
      const renderDevice = deviceList.filter((device) => device?.building_area?.id === item.id);
      if (item.parent_id === parentId) {
        const child = getChildren(item.id, level + 1);
        if (!renderDevice.length && !child.length) {
          return;
        } else {
          children.push({
            key: `anchor${item.id}`,
            href: `#anchor${item.id}`,
            title: item.name,
            titleWithNoIcon: item.name,
            children: child,
            renderDevice,
            level: level + 1,
          });
        }
      }
    });
    return children;
  };
  const anchorList = getChildren(null);
  return anchorList;
}
export interface IAnchorItem2 {
  key: string;
  href: string;
  title: React.ReactNode;
  titleWithNoIcon: string;
  children?: IAnchorItem2[];
  renderDevice?: IDevicesListItem1[];
  level: number;
  icon?: React.ReactNode;
}

export const getParentTitles = (
  rootNodes: IAnchorItem2[],
  title: string,
  currentPath: string[],
): string | null => {
  for (const node of rootNodes) {
    currentPath.push(node.titleWithNoIcon);
    if (node.titleWithNoIcon === title) {
      return currentPath.join(' / ');
    }
    if (node.children && node.children.length > 0) {
      const result = getParentTitles(node.children, title, currentPath);
      if (result) return result;
    }

    currentPath.pop();
  }
  return '';
};
export function findNodesWithTitle(
  rootNodes: IAnchorItem2[],
  title: string,
  key: React.Key,
  foundNodes: IAnchorItem2[],
) {
  rootNodes.forEach((node) => {
    if (node.titleWithNoIcon === title && node.key === key) {
      foundNodes.push(node);
    }
    if (node.children && node.children.length > 0) {
      findNodesWithTitle(node.children, title, key, foundNodes);
    }
  });
  return foundNodes;
}
export const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};
