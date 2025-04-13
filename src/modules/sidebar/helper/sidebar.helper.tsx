import { useCallback, useEffect, useMemo, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { isObject, isBoolean } from 'lodash';
import { Maybe } from 'types';
import { FileCheck } from 'lucide-react';
import { useMediaQuery } from '@/lib/material-ui';
import {
  AwardIcon,
  BoxIcon,
  ChartNetworkIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  HomeIcon,
  SendIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
  DatabaseZapIcon,
  BotMessageSquareIcon,
} from '@/lib/icons';
import useCampaignPermission from '@/contexts/campaign-permission/campaign-permission.hook';
import useUser from '@/contexts/user-data/user-data.hook';
import { ICommonState, IRootState } from '@/redux/reducers';
import LookerInsightService from '@/services/looker-insights/looker-insights.service';
import ROUTES from '@/common/routes';
import useConfigs from '@/contexts/app-configs/app-configs.hooks';
import { SidebarItemType } from '../components/sidebar-item.component';

const useMobileMediaQuery = () => useMediaQuery(`(min-width: 320px) and (max-width: 767px)`);

const useSidebarInsightsHelper = () => {
  const { permission, isAdvertiser, isPublisher } = useUser();
  const insightService = useMemo(() => new LookerInsightService(), []);
  const global_state: ICommonState = useSelector((state: IRootState) => state.common, shallowEqual);

  const [insightList, setInsightList] = useState<
    Partial<{ label: Maybe<string>; id: Maybe<number>; testId: Maybe<string>; link: Maybe<string> }>[]
  >([]);

  const isInsightsGlobal =
    isBoolean(global_state.configs.showLookerTab) &&
    global_state.configs.showLookerTab &&
    permission?.INSIGHT_DASHBOARD.viewAccess;

  const isInsightsPublisher =
    isObject(global_state.configs.showLookerTab) &&
    global_state.configs.showLookerTab?.showPublisher &&
    permission?.INSIGHT_DASHBOARD.viewAccess &&
    isPublisher;

  const isInsightsAdvertiser =
    isObject(global_state.configs.showLookerTab) &&
    global_state.configs.showLookerTab?.showAdvertiser &&
    permission?.INSIGHT_DASHBOARD.viewAccess &&
    isAdvertiser;

  const isInsightsAvailable = isInsightsGlobal || isInsightsPublisher || isInsightsAdvertiser;

  const isDataOpsGlobal = isBoolean(global_state.configs.showDataOpsTab) && global_state.configs.showDataOpsTab;
  const isDataOpsPublisher =
    isObject(global_state.configs.showDataOpsTab) && global_state.configs.showDataOpsTab?.showPublisher;
  const isDataOpsAdvertiser =
    isObject(global_state.configs.showDataOpsTab) && global_state.configs.showDataOpsTab?.showAdvertiser;

  const isDataOpsAvailable = isDataOpsGlobal || isDataOpsPublisher || isDataOpsAdvertiser;

  const isCarterAIPublisher =
    isObject(global_state.configs.carterAI) && global_state.configs.carterAI?.showPublisher && isPublisher;
  const isCarterAIAdvertiser =
    isObject(global_state.configs.carterAI) && global_state.configs.carterAI?.showAdvertiser && isAdvertiser;
  const isCarterAIAvailable = isCarterAIPublisher || isCarterAIAdvertiser;

  const getInsightList = useCallback(async () => {
    if (isInsightsAvailable) {
      const response = await insightService.getInsightDashboards(
        {
          page: 1,
          limit: 10,
          sequence: true,
        },
        { silent: true },
      );
      if (response?.insightDashboards.content) {
        const list = response?.insightDashboards?.content?.map(insight => ({
          label: insight?.title,
          testId: insight?.title,
          id: insight?.id,
          link: insight?.link,
          show: true,
        }));
        setInsightList(list);
      }
    }
  }, [isInsightsAvailable, insightService]);

  useEffect(() => {
    getInsightList();
  }, [getInsightList]);

  return {
    isDataOpsAvailable,
    isInsightsAvailable,
    insightList,
    isCarterAIAvailable,
    getInsightList,
  };
};

export const useSidebarMenuList = () => {
  const { hasNoAccess: hasCampaignNoAccess } = useCampaignPermission();
  const { permission, isPublisher } = useUser();
  const isMobile = useMobileMediaQuery();
  const { showYieldManagementPermission } = useConfigs();
  const isYieldManagementEnabled = isPublisher
    ? showYieldManagementPermission?.showPublisher
    : showYieldManagementPermission?.showAdvertiser;

  const { isInsightsAvailable, insightList, getInsightList, isDataOpsAvailable, isCarterAIAvailable } =
    useSidebarInsightsHelper();

  const MenuItems: Array<SidebarItemType> = [
    {
      id: 1,
      label: 'Dashboard',
      icon: <HomeIcon width={16} height={16} />,
      link: ROUTES.DASHBOARD,
      show: true,
      testId: 'dashboard',
      assist: 'dashboard',
      mobileOnly: true,
    },
    {
      id: 2,
      label: 'Ad Campaigns',
      icon: <ClipboardCheckIcon width={16} height={16} />,
      type: 'button',
      link: ROUTES.CAMPAIGN.BASE,
      subCategories: [
        { id: 1, label: 'Campaigns', link: ROUTES.CAMPAIGN.BASE, show: !hasCampaignNoAccess, testId: 'campaigns' },
        { id: 2, label: 'Creatives', link: ROUTES.CREATIVE.BASE, show: !hasCampaignNoAccess, testId: 'creatives' },
      ],
      show: !hasCampaignNoAccess,
      testId: 'ad-campaigns',
      assist: 'campaigns',
    },
    {
      id: 3,
      label: 'Wallet',
      icon: <WalletIcon width={16} height={16} />,
      link: ROUTES.WALLET.BASE,
      show: !permission?.WALLET.noAccess,
      testId: 'wallet',
      assist: 'wallet',
    },
    {
      id: 4,
      label: 'Inventory',
      icon: <BoxIcon width={16} height={16} />,
      link: ROUTES.INVENTORY.BASE,
      show: permission?.AD_INVENTORY_PLACEMENTS.fullAccess || permission?.AD_INVENTORY_PLACEMENTS.viewAccess,
      testId: 'inventory',
      assist: 'inventory',
    },
    {
      id: 5,
      label: 'Advertisers',
      icon: <AwardIcon width={16} height={16} />,
      link: ROUTES.ADVERTISERS.BASE,
      show: permission?.ADVERTISER_MANAGEMENT.fullAccess || permission?.ADVERTISER_MANAGEMENT.viewAccess,
      testId: 'advertisers',
      assist: 'advertisers',
    },
    {
      id: 6,
      label: 'Audiences',
      icon: <SendIcon width={16} height={16} />,
      link: ROUTES.AUDIENCE.BASE,
      testId: 'audiences',
      show: permission?.AUDIENCE_KEYS_VALUES.fullAccess || permission?.AUDIENCE_KEYS_VALUES.viewAccess,
      assist: 'audiences',
    },
    {
      id: 7,
      label: 'Reporting',
      icon: <FileTextIcon width={16} height={16} />,
      link: ROUTES.REPORT.BASE,
      show: !permission?.REPORT_GENERATION.noAccess,
      testId: 'reports',
      assist: 'reports',
    },
    {
      id: 8,
      label: 'Users',
      icon: <UsersIcon width={16} height={16} />,
      link: ROUTES.USERS.BASE,
      show: permission?.USER_MANAGEMENT.fullAccess || permission?.USER_MANAGEMENT.viewAccess,
      testId: 'users',
      assist: 'users',
    },
    {
      id: 8.5,
      label: 'Yield Management',
      icon: <FileCheck width={16} height={16} />,
      link: ROUTES.YIELD.BASE,
      show: isYieldManagementEnabled && !permission?.YIELD.noAccess,
      subCategories: [
        {
          id: 1,
          label: 'Yield Groups',
          link: ROUTES.YIELD.GROUP,
          testId: 'yieldGroup',
          show: isYieldManagementEnabled && !permission?.YIELD.noAccess,
        },
        {
          id: 2,
          label: 'SSP Integration',
          link: ROUTES.YIELD.SSP,
          testId: 'sspIntegration',
          show: isYieldManagementEnabled && !permission?.YIELD.noAccess,
        },
      ],
      testId: 'yield-management',
      assist: 'yield-management',
    },
    {
      id: 9,
      label: 'Account Settings',
      icon: <SettingsIcon width={16} height={16} />,
      link: ROUTES.ACCOUNT.BASE,
      show: isPublisher && (permission?.ACCOUNT_SETUP.fullAccess || permission?.ACCOUNT_SETUP.viewAccess),
      testId: 'account-settings',
      assist: 'campaigns',
    },

    {
      id: 10,
      label: 'Insights',
      icon: <ChartNetworkIcon width={16} height={16} />,
      link: ROUTES.INSIGHTS,
      show: isInsightsAvailable,
      testId: 'insights',
      assist: 'insights',
      subCategories: insightList as Array<SidebarItemType>,
      mobileOnly: true,
    },
    {
      id: 11,
      label: 'Data Ops',
      icon: <DatabaseZapIcon width={16} height={16} />,
      link: '/data-ops',
      show: isDataOpsAvailable,
      testId: 'data-ops',
      assist: 'data-ops',
    },
    {
      id: 12,
      label: 'Carter AI',
      icon: <BotMessageSquareIcon width={16} height={16} />,
      link: ROUTES.AI,
      show: isCarterAIAvailable,
      testId: 'carter-ai',
      assist: 'carter-ai',
    },
  ];

  return {
    getInsightList,
    MenuItems: isMobile ? MenuItems.filter(item => item.mobileOnly) : MenuItems,
  };
};
