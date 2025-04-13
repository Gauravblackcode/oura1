import { AccessLevel, PermissionType } from 'types';
import { USER_ROLE, USER_TYPE } from '@/common/constants';

export const DefaultPermForAdminBasic = {
  publisher: {
    standardUser: [
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.AdInventoryPlacements },
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.AudienceKeysValues },
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.AllPublisherCampaigns },
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.AllAdvertiserCampaigns },
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.CreativeTemplate },
      { accessLevel: AccessLevel.CampaignLevel, permissionType: PermissionType.ReportGeneration },
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.AdvertiserManagement },
      { accessLevel: AccessLevel.NoAccess, permissionType: PermissionType.AccountSetup },
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.UserManagement },
      { accessLevel: AccessLevel.NoAccess, permissionType: PermissionType.ApprovalRequests },
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.Wallet },
      { accessLevel: AccessLevel.NoAccess, permissionType: PermissionType.InsightDashboard },
      { accessLevel: AccessLevel.NoAccess, permissionType: PermissionType.PublicApiAccess },
      { accessLevel: AccessLevel.NoAccess, permissionType: PermissionType.YieldManagement },
    ],
    admin: [
      { accessLevel: AccessLevel.FullAccess, permissionType: PermissionType.AdInventoryPlacements },
      { accessLevel: AccessLevel.FullAccess, permissionType: PermissionType.AudienceKeysValues },
      { accessLevel: AccessLevel.FullAccess, permissionType: PermissionType.AllPublisherCampaigns },
      { accessLevel: AccessLevel.FullAccess, permissionType: PermissionType.AllAdvertiserCampaigns },
      { accessLevel: AccessLevel.FullAccess, permissionType: PermissionType.CreativeTemplate },
      { accessLevel: AccessLevel.FullAccess, permissionType: PermissionType.ReportGeneration },
      { accessLevel: AccessLevel.FullAccess, permissionType: PermissionType.AdvertiserManagement },
      { accessLevel: AccessLevel.FullAccess, permissionType: PermissionType.AccountSetup },
      { accessLevel: AccessLevel.FullAccess, permissionType: PermissionType.UserManagement },
      { accessLevel: AccessLevel.AllRequests, permissionType: PermissionType.ApprovalRequests },
      { accessLevel: AccessLevel.ManageWallet, permissionType: PermissionType.Wallet },
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.InsightDashboard },
      { accessLevel: AccessLevel.NoAccess, permissionType: PermissionType.PublicApiAccess },
      { accessLevel: AccessLevel.FullAccess, permissionType: PermissionType.YieldManagement },
    ],
  },
  advertiser: {
    standardUser: [
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.AllAdvertiserCampaigns },
      { accessLevel: AccessLevel.CampaignLevel, permissionType: PermissionType.ReportGeneration },
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.UserManagement },
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.Wallet },
      { accessLevel: AccessLevel.NoAccess, permissionType: PermissionType.InsightDashboard },
      { accessLevel: AccessLevel.NoAccess, permissionType: PermissionType.PublicApiAccess },
    ],
    admin: [
      { accessLevel: AccessLevel.FullAccess, permissionType: PermissionType.AllAdvertiserCampaigns },
      { accessLevel: AccessLevel.CampaignLevel, permissionType: PermissionType.ReportGeneration },
      { accessLevel: AccessLevel.FullAccess, permissionType: PermissionType.UserManagement },
      { accessLevel: AccessLevel.ManageWallet, permissionType: PermissionType.Wallet },
      { accessLevel: AccessLevel.ViewAccess, permissionType: PermissionType.InsightDashboard },
      { accessLevel: AccessLevel.NoAccess, permissionType: PermissionType.PublicApiAccess },
    ],
  },
};

export const getRoles = (user: any) => {
  if (user.userType === USER_TYPE.PUBLISHER) {
    if (user.roleType === USER_ROLE.ADMIN) {
      return DefaultPermForAdminBasic.publisher.admin;
    }
    return DefaultPermForAdminBasic.publisher.standardUser;
  }
  if (user.userType === USER_TYPE.ADVERTISER) {
    if (user.roleType === USER_ROLE.ADMIN) {
      return DefaultPermForAdminBasic.advertiser.admin;
    }
    return DefaultPermForAdminBasic.advertiser.standardUser;
  }
  return [];
};
