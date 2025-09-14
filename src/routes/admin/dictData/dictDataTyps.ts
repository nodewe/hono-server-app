/**
* @description 字典数据类型
*/
export interface ISysDictData {
    id?: string;
    name?: string; // 字典名称
    typeCode?: string; // 字典类型编码
    value?: string; // 字典值
    sort?:number;
    remark?: string;
    status?: number; // 字典状态(1-正常；0-停用)
    createTime?: string; // 更新时间
    updateTime?: string; // 创建时间
}