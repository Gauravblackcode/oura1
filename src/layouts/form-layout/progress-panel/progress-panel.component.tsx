import { carterColors, Typography, CarterAccordion } from 'shyftlabs-dsl';

import styles from './progress-panel.module.scss';

export interface IProgressPanel {
  title?: string;
  hasStepsAbove?: boolean;
  data?: Array<{ title: string; data: Array<{ label: string; value: React.ReactNode }> }>;
}

const ProgressPanel: React.FC<IProgressPanel> = props => {
  const { title, data, hasStepsAbove } = props;
  return (
    <div className={styles.container} data-steps={hasStepsAbove}>
      <div className={styles.header_title}>
        <Typography fontWeight="Semibold">{title}</Typography>
      </div>
      {data?.map(item => (
        <CarterAccordion
          title={item.title}
          key={item.title}
          variant="minimal"
          headerHeight="24px"
          contentPadding="16px 0px"
          headerPadding="0"
        >
          <div className={styles.content_wrapper}>
            {item.data.map(dataItem => (
              <div key={dataItem.label} className={styles.data_item}>
                <Typography color={carterColors['text-600']} fontWeight={'Medium'}>
                  {dataItem.label}
                </Typography>
                {typeof dataItem.value === 'string' ? (
                  <div className={styles.text_wrapper}>
                    <Typography fontWeight="Semibold">{dataItem.value}</Typography>
                  </div>
                ) : (
                  dataItem.value
                )}
              </div>
            ))}
          </div>
        </CarterAccordion>
      ))}
    </div>
  );
};

export default ProgressPanel;
