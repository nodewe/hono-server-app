

/**
* @description 角色表
*/
export interface ISysRole {
    id?: string;
    name?: string; // 角色名称
    code?: string; // 角色编码
    sort?: number; // 显示顺序
    status?: number; // 角色状态(1-正常；0-停用)
    dataScope?: number; // 数据权限(0-所有数据；1-部门及子部门数据；2-本部门数据；3-本人数据)
    deleted?: number; // 逻辑删除标识(0-未删除；1-已删除)
    createTime?: string; // 更新时间
    updateTime?: string; // 创建时间
}