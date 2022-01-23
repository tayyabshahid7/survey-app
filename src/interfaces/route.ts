import { ComponentType } from "react";

export interface IRoute {
  path: string;
  exact: boolean;
  component?: ComponentType<any>;
  routes?: IRoute[];
  redirect?: string;
  private?: boolean;
  restricted?: boolean;
}
