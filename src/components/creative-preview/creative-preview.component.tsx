import { Typography } from 'shyftlabs-dsl';
import { Variable } from 'types';
import { useMemo } from 'react';
import Image from 'next/image';
import NoDataPlaceholder from '../no-data-placeholder/no-data-placeholder.component';
import styles from './creative-preview.module.scss';

interface ICreativePreview {
  content?: string;
  variables?: any[];
  type?: 'url' | 'html' | 'video';
  subtitleUrl?: string | null;
  originalVariables?: Array<Variable>;
  backgroundColor?: string;
}

const CreativePreview: React.FC<ICreativePreview> = props => {
  const { type = 'url', backgroundColor, subtitleUrl, originalVariables = [], variables = [], content = '' } = props;

  const generatedContent = useMemo(() => {
    return variables?.reduce((acc, curr) => {
      const placeholder = originalVariables?.find(item => item.id === curr.key)?.placeholder;
      return acc.replace(placeholder, curr.value);
    }, content || '');
  }, [content, variables, originalVariables]);

  return (
    <div className={styles.container} style={{ backgroundColor }}>
      <Typography fontWeight="Semibold" textAlign="center">
        Ad Preview
      </Typography>
      {!content ? (
        <NoDataPlaceholder
          className={styles.no_data_container}
          title="Upload Creatives to preview Ad"
          description="You will see the Ad Preview here"
        />
      ) : type === 'url' ? (
        <div className={styles.content_wrapper}>
          <Image src={content} fill objectFit="contain" alt="Creative Preview" sizes="(max-width: 768px) 100vw" />
        </div>
      ) : type === 'video' ? (
        <video width="100%" height="267" preload="auto" controls autoPlay loop>
          <source src={content} type="video/mp4" />
          {!!subtitleUrl && <track src={subtitleUrl} kind="subtitles" srcLang="en" label="English" />}
        </video>
      ) : (
        <iframe className={styles.inner_wrapper} srcDoc={generatedContent} title="Creative Preview" />
      )}
    </div>
  );
};

export default CreativePreview;
