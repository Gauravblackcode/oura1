// import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
// import useDialog from '@/contexts/dialog/dialog.hook';
// import useUser from '@/contexts/user-data/user-data.hook';
// import StorageService from '@/services/storage/storage.service';
// import { useTheme } from '@/contexts/theme/useTheme.hook';
// import useConfigs from '@/contexts/app-configs/app-configs.hooks';
// import useOnboarding from '@/contexts/onboarding/onboarding.hook';
// import oura1Logo from '@/assets/images/oura1_login_logo.svg';
// import Hyperlink from '../hyperlink/hyperlink.component';
// import styles from './tutorial-boundary.module.scss';

// const TutorialBoundary: React.FC<PropsWithChildren> = ({ children }) => {
//   const selectedColor = useTheme();
//   const { showDialog } = useDialog();
//   const { isAdvertiser, refetchUser } = useUser();
//   const { isFirstLogin, isTutorialShown } = useOnboarding();
//   const { client } = useConfigs();
//   const storageService = useMemo(() => new StorageService(), []);

//   const [run, setRun] = useState<boolean>(false);
//   const [currentStep, setCurrentStep] = useState<number>(0);
//   const [domLoaded, setDomLoaded] = useState<boolean>(false);

//   const onboardingSteps = [
//     {
//       title: 'Your Profile',
//       content: 'Change your password, profile icon, and manage all other personal settings through here.',
//       target: '#user-profile',
//       placement: 'right',
//       styles: {
//         tooltip: {
//           transform: 'translate3d(150px, 0px, 0px)',
//         },
//       },
//       disableBeacon: true,
//     },
//     {
//       title: 'Navigation',
//       content: 'This is the navigation panel; you can switch between tabs for easy access to different information.',
//       target: '#navbar',
//       placement: 'right',
//     },
//     {
//       title: 'That's everything!',
//       content: (
//         <div>
//           You are all set and can start working with the platform. Feel free to{' '}
//           <a className={styles.dialog_link} href={`mailto:${client?.supportEmail}`} target="_blank">
//             contact us
//           </a>{' '}
//           if you need further assistance.
//         </div>
//       ),
//       target: 'body',
//       placement: 'center',
//       showSkipButton: true,
//     },
//   ];

//   useEffect(() => {
//     setDomLoaded(true);
//   }, []);

//   const handleOnboarding = () => {
//     showDialog({
//       headerIconProps: {
//         src: oura1Logo,
//         alt: 'oura1_logo_dialog',
//         className: styles.onboarding_header_icon
//       },
//       title: 'Welcome to Oura1!',
//       titleProps: {
//         className: styles.onboarding_dialog_title
//       },
//       message: (
//         <div className={styles.dialog_message}>
//           You have successfully joined the Oura1 platform of{' '}
//           <Hyperlink url={client?.website} target="_blank" label={client?.name} />
//         </div>
//       ),
//       confirmBtnProps: {
//         text: 'Start Guide',
//         variant: 'contained',
//         className: styles.onboarding_dialog_confirm
//       },
//       rejectBtnProps: {
//         text: 'Skip',
//         color: 'info',
//         variant: 'text'
//       },
//       confirmHandler: () => setRun(true),
//       rejectHandler: () => {
//         refetchUser();
//         storageService.setStorage('TUTORIAL_SHOWN_OR_SKIPPED', JSON.stringify(true));
//       },
//       testId: 'platform-intro-dialog',
//       actionContainerClass: styles.onboarding_action_container
//     });
//   };



//   return (
//     <div>
//       {domLoaded && (
//         <Joyride
//           run={run}
//           steps={onboardingSteps as any}
//           continuous
//           styles={{
//             tooltipContainer: {
//               textAlign: 'left',
//             },
//             tooltipContent: {
//               padding: '20px 0px',
//             },
//             buttonBack: {
//               color: colors.textColorInactive,
//             },
//             buttonNext: {
//               backgroundColor: selectedColor.themeColorPrimaryDefault,
//               padding: '8px 12px',
//             },
//             overlay: {
//               zIndex: 1200,
//               left: '-10px',
//             },
//           }}
//           floaterProps={{
//             hideArrow: true,
//             styles: {
//               floaterOpening: {
//                 zIndex: 1201,
//               },
//             },
//           }}
//           locale={{
//             ...customLocale,
//             skip: <TutorialCarouselDots totalDots={onboardingSteps.length} activeDot={currentStep} />,
//           }}
//           showSkipButton
//           callback={handleJoyrideCallback}
//           disableOverlayClose
//         />
//       )}
//       {children}
//     </div>
//   );
// };

// export default TutorialBoundary;
