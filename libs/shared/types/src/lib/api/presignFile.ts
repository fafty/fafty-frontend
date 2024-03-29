export type GetPresignFileResponseType = {
  // url: string;
  // fields: {
  //   key: string;
  //   policy: string;
  //   'x-amz-algorithm': string;
  //   'x-amz-credential': string;
  //   'x-amz-date': string;
  //   'x-amz-signature': string;
  // };
  // method: string;

  method: string
  url: string
  fields: { [type: string]: string }
  headers: { [type: string]: string }
}

//UppyFile<Record<string, unknown>, Record<string, unknown>>;
export type GetPresignFileParamsType = {
  filename: string
  type?: string
}

export type GetPresignFileCallbackType = {
  endpoint: string
  params?: GetPresignFileParamsType
}
