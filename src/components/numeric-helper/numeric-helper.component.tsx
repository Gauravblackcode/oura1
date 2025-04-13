import { Tooltip } from 'shyftlabs-dsl';
import { Maybe } from 'types';
import { formatNumberWithSuffix } from '@/common/helpers';

type TConfig = {
  trimTo: number;
};

interface INumericHelper {
  value?: Maybe<string | number>;
  className?: string;
  fallback?: string;
  mode?: 'currency' | 'percentage' | 'none';
  config?: TConfig;
  showTooltip?: boolean;
}

const defaultConfig: TConfig = {
  trimTo: 2,
};

const convertNumber = (value: string | number, config = defaultConfig) => {
  const allConfigs = { ...defaultConfig, ...config };
  const { trimTo } = allConfigs;
  return formatNumberWithSuffix(value, trimTo);
};

const appendUnit = (value: string, mode: 'currency' | 'percentage' | 'none') => {
  if (mode === 'currency') {
    return `$${value}`;
  }
  if (mode === 'percentage') {
    return `${value}%`;
  }
  return `${value}`;
};

const NumericHelper: React.FC<INumericHelper> = props => {
  const {
    value,
    className = '',
    fallback = '--',
    config = defaultConfig,
    mode = 'currency',
    showTooltip = false,
  } = props;

  if (!value || isNaN(Number(value))) {
    return <span className={className}>{fallback}</span>;
  }
  return (
    <Tooltip title={showTooltip ? appendUnit(`${value}`, mode) : undefined}>
      <span className={className}>{appendUnit(convertNumber(value, config), mode)}</span>
    </Tooltip>
  );
};

export default NumericHelper;
