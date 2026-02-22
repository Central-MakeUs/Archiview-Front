'use client';

import { Error, type IErrorProps } from './Error';

export const ErrorPage = ({ title, description }: IErrorProps) => {
  return <Error title={title} description={description} />;
};
