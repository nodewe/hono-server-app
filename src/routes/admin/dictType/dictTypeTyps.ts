/**
* @description 字典类型
*/
export interface ISysDictType {
    id?: string;
    name?: string; // 字典名称
    code?: string; // 字典编码
    remark?: string;
    status?: number; // 角色状态(1-正常；0-停用)
    createTime?: string; // 更新时间
    updateTime?: string; // 创建时间
}