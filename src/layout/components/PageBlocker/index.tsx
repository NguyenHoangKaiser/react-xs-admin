import type { RouteEnum } from '@/router/utils';
import { useAppSelector } from '@/store/hooks';
import { multiTabsSelector } from '@/store/modules/route';
import { App } from 'antd';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import type { unstable_BlockerFunction } from 'react-router-dom';
import { useBlocker } from 'react-router-dom';

const originalBeforeUnload = window.onbeforeunload;

/**
 * Prompt the user when they try to navigate away from the page with unsaved changes.
 * @param title: The title of the prompt
 * @param content: The content of the prompt
 * @param when: Additional condition to trigger the prompt
 * @param useWindowPrompt: Use the window prompt instead of the Antd modal
 * @param tabs: Tabs that should trigger the prompt
 * @returns null Automatically use the Antd modal when navigating inside Route and window prompt when navigating outside Route
 */
function PageBlockerPrompt({
  title = 'Are you sure you want to leave this page?',
  content = 'Any unsaved changes will be lost.',
  when,
  useWindowPrompt,
  tabs,
}: {
  title?: ReactNode;
  content?: ReactNode;
  when: boolean;
  useWindowPrompt?: boolean;
  tabs?: RouteEnum[];
}) {
  const multiTabs = useAppSelector(multiTabsSelector);
  // check if multiTabs is empty or have tabs that are in the tabs array
  const checkTabs = useMemo(() => {
    return tabs
      ? multiTabs.some((tab) => tabs.includes(tab.key as RouteEnum))
      : multiTabs.length > 0;
  }, [multiTabs, tabs]);
  // console.log('checkTabs', checkTabs);

  const { modal } = App.useApp();
  useEffect(() => {
    if (when && checkTabs) {
      window.onbeforeunload = function () {
        return '';
      };
    }
    return () => {
      window.onbeforeunload = originalBeforeUnload;
    };
  }, [when, checkTabs]);

  const shouldBlock = useCallback<unstable_BlockerFunction>(
    ({ currentLocation, nextLocation }) => {
      return (
        !!when &&
        checkTabs &&
        !useWindowPrompt &&
        currentLocation.pathname !== nextLocation.pathname
      );
    },
    [when, useWindowPrompt, checkTabs],
  );

  const blocker = useBlocker(shouldBlock);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      modal.confirm({
        title,
        content,
        onOk: () => {
          if (blocker) {
            blocker.proceed();
          }
        },
        onCancel: () => {
          if (blocker) {
            blocker.reset();
          }
        },
      });
    }
  }, [blocker.state, content, title]);

  return null;
}

export default PageBlockerPrompt;
