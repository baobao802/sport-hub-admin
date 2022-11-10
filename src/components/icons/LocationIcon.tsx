import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const LocationSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='ionicon'
    viewBox='0 0 512 512'
  >
    <title>Location</title>
    <path
      d='M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='32'
    />
    <circle
      cx='256'
      cy='192'
      r='48'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='32'
    />
  </svg>
);

const LocationIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={LocationSvg} {...props} />;
};

export default LocationIcon;
