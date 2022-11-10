import React, { Fragment, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from './type';

type Props = {
  pageHeader?: PageHeader;
  children?: ReactNode;
  style?: React.CSSProperties;
};

const Page = (props: Props) => {
  const { title, description } = props?.pageHeader || {};

  return (
    <Fragment>
      <Helmet>
        <title>{title || 'Page title'}</title>
        <meta name='description' content={description || 'Page description'} />
      </Helmet>
      <div style={props.style}>{props.children}</div>
    </Fragment>
  );
};

export default Page;
