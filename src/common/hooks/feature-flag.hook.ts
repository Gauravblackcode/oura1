import useConfigs from '@/contexts/app-configs/app-configs.hooks';
import useUser from '@/contexts/user-data/user-data.hook';

const useFeatureFlag = () => {
  const {
    enableAPIExpose,
    enableAutofillTargeting,
    enableSharedWallet,
    showVideoPerformance,
    showAdItemsInsights,
    enableAutofillTargetingFeedback,
    enableCreativeTargeting,
  } = useConfigs();
  const { isPublisher } = useUser();
  return {
    enableAPIExpose: isPublisher ? enableAPIExpose.showPublisher : enableAPIExpose.showAdvertiser,
    enableSharedWallet: isPublisher ? enableSharedWallet.showPublisher : enableSharedWallet.showAdvertiser,
    enableAutofillTargeting: isPublisher
      ? enableAutofillTargeting?.showPublisher
      : enableAutofillTargeting?.showAdvertiser,
    enableAutofillTargetingFeedback: isPublisher
      ? enableAutofillTargetingFeedback?.showPublisher
      : enableAutofillTargetingFeedback?.showAdvertiser,
    enableCreativeTargeting: isPublisher
      ? enableCreativeTargeting?.showPublisher
      : enableCreativeTargeting?.showAdvertiser,
    showVideoPerformance: isPublisher ? showVideoPerformance.showPublisher : showVideoPerformance.showAdvertiser,
    showAdItemsInsights: isPublisher ? showAdItemsInsights?.showPublisher : showAdItemsInsights?.showAdvertiser,
  };
};

export default useFeatureFlag;
