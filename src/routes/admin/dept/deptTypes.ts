export interface ISysDept {
    id?: string; // 主键
    name?: string; // 部门名称
    parentId?: string; // 父节点id
    treePath?: string; // 父节点id路径
    sort?: number; // 显示顺序
    status?: number; // 状态(1:正常;0:禁用)
    deleted?: number; // 逻辑删除标识(1:已删除;0:未删除)
    createTime?: string; // 创建时间
    updateTime?: string; // 更新时间
    create_by?: string; // 创建人ID
    update_by?: string; // 修改人ID
}