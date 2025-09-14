/**
* @description 菜单类型
*/

export interface ISysMenu {
    id?: number;
    parentId?: string; // 父菜单ID
    treePath?: string; // 父节点ID路径
    name?: string; // 菜单名称
    type?: number; // 菜单类型(1:菜单；2:目录；3:外链；4:按钮)
    path?: string; // 路由路径(浏览器地址栏路径)
    component?: string; // 组件路径(vue页面完整路径，省略.vue后缀)
    perm?: string; // 权限标识
    visible?: number; // 显示状态(1-显示;0-隐藏)
    sort?: number; // 排序
    icon?: string; // 菜单图标
    redirect?: string; // 跳转路径
    createTime?: string; // 创建时间
    updateTime?: string; // 更新时间
}