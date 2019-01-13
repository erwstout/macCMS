// flow
export type $Res = {
  send: any => Res,
  status: number => Res,
  sendStatus: number => Res,
  render: (string, ?Object) => Res,
  locals: Object,
  redirect: (string | number, ?string) => Res,
  header: any,
  json: any => Res
};

export type $Req = {
  body: Object,
  query: Object,
  params: Object,
  user: $SiteUser,
  get: any,
  hostname: any,
  path: any,
  url: string,
  headers: Object,
  protocol: string,
  originalUrl: string,
  session: Object,
  flash: (
    "success" | "info" | "error" | "warning",
    Array<string> | string
  ) => Req
};
