import React, { HTMLAttributes, SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import { Tab, Tabs as MaterialTabs, TabProps } from '@/lib/material-ui';
import TabPanel from './panel/panel.component';
import styles from './tabs.module.scss';

export interface TCustomTab {
  title: string;
  additionalData?: { [key: string]: any };
  tabProps?: TabProps;
  component: any;
  testId?: string;
  tooltip?: string;
  panelStyle?: string;
}

type TRightComponentProps = {
  activeTab: number;
};

interface ITabProps extends HTMLAttributes<HTMLDivElement> {
  tabs: TCustomTab[];
  activeTabIndex?: number;
  noPadding?: boolean;
  handleTabChange?: (selectedTab: number) => void;
  RightComponent?: (props: TRightComponentProps) => React.ReactElement | undefined;
}

const Tabs: React.FC<ITabProps> = (props: ITabProps) => {
  const {
    activeTabIndex = undefined,
    tabs,
    noPadding = false,
    handleTabChange = undefined,
    RightComponent,
    ...rest
  } = props;
  const router = useRouter();
  const { tab } = router.query;

  const activeTab =
    activeTabIndex !== undefined
      ? activeTabIndex
      : Math.max(
          tabs.findIndex(item => item.title.toLowerCase() === tab),
          0,
        );

  const handleFilterTabChange = (_: SyntheticEvent, value: number) => {
    if (handleTabChange) {
      handleTabChange(value);
      return;
    }
    const basePath = router.asPath.split('?')[0];
    router.push({
      pathname: basePath,
      query: { tab: tabs[value].title.toLowerCase() },
    });
  };

  return (
    <div {...rest}>
      <div className={styles.tabs_container}>
        <MaterialTabs
          classes={{
            indicator: styles.tab_indicator,
          }}
          TabIndicatorProps={{
            children: <span className={styles.custom_tab_indicator} />,
          }}
          value={activeTab}
          onChange={handleFilterTabChange}
        >
          {tabs.map((item: TCustomTab) => (
            <Tab
              classes={{ root: styles.tab, selected: styles.selected_tab }}
              disableRipple
              key={item.title}
              data-testid={item.testId}
              label={item?.title}
              {...(item.tabProps ?? {})}
            />
          ))}
        </MaterialTabs>
        {RightComponent ? RightComponent({ activeTab }) : undefined}
      </div>
      <div className={styles.tab_panel}>
        {tabs.map((item: TCustomTab, index: number) => {
          const { additionalData = {}, panelStyle } = item;
          return (
            <TabPanel noPadding={noPadding} key={item.title} value={activeTab} index={index} customStyle={panelStyle}>
              <item.component {...additionalData} />
            </TabPanel>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
