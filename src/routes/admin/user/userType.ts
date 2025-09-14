

/**
* @description 用户表
*/
export interface ISysUser {
    id?: number;
    username?: string; // 用户名
    nickname?: string; // 昵称
    gender?: number; // 性别((1:男;2:女))
    password?: string; // 密码
    deptId?: number; // 部门ID
    avatar?: string; // 用户头像
    mobile?: string; // 联系方式
    status?: number; // 用户状态((1:正常;0:禁用))
    email?: string; // 用户邮箱
    deleted?: number; // 逻辑删除标识(0:未删除;1:已删除)
    createTime?: string; // 创建时间
    updateTime?: string; // 更新时间
}