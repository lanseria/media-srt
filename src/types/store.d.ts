interface UserTokenVO {
  access_token: string;
  active: boolean;
  expires_in: number;
  license: string;
  org_id: number;
  real_name: string;
  refresh_token: string;
  safe_password: string;
  scope: string;
  tenant_id: number;
  token_type: string;
  user_id: number;
  username: string;
}

interface OrgDictItemVO {
  orgId: number;
  name: string;
  abrName?: string;
  dueDate?: string;
  isMailList?: boolean;
  type?: number;
  userId?: number;
}

interface RoleResponseVo {
  id: number;

  name: string;

  permissions: PermissionResponseVo[];

  active: boolean;
}

interface PermissionResponseVo {
  id: number;

  slug: string;

  description: string;

  active: boolean;
}

interface UserInfoVO {
  id: string;

  username: string;

  firstName: string;

  lastName: string;

  avatar: string;

  status: string;

  isSuperUser: boolean;
}

interface UserInfoLoginVO extends UserInfoVO {
  roles?: RoleResponseVo[];

  permissions?: PermissionResponseVo[];

  isSuperUser: boolean;
}
