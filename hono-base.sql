/*
 Navicat Premium Data Transfer

 Source Server         : 洛杉矶mysql
 Source Server Type    : MySQL
 Source Server Version : 80100
 Source Host           : 104.223.55.72:63306
 Source Schema         : hono-base

 Target Server Type    : MySQL
 Target Server Version : 80100
 File Encoding         : 65001

 Date: 15/09/2025 01:05:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '部门名称',
  `parentId` bigint NOT NULL DEFAULT 0 COMMENT '父节点id',
  `treePath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '父节点id路径',
  `sort` int NULL DEFAULT 0 COMMENT '显示顺序',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态(1:正常;0:禁用)',
  `deleted` tinyint NULL DEFAULT 0 COMMENT '逻辑删除标识(1:已删除;0:未删除)',
  `createTime` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建时间',
  `updateTime` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '更新时间',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人ID',
  `update_by` bigint NULL DEFAULT NULL COMMENT '修改人ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 183 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '部门表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
INSERT INTO `sys_dept` VALUES (1, '有来技术', 0, '0', 1, 1, 0, '2025-09-14 22:43:05', '2025-09-13 22:43:01', 1, 1);
INSERT INTO `sys_dept` VALUES (2, '研发部门', 1, '0,1', 1, 1, 0, '2025-09-11 22:46:04', '2025-09-14 22:46:06', 2, 2);
INSERT INTO `sys_dept` VALUES (3, '测试部门11', 1, '0,1', 1, 1, 0, '2025-09-12 22:46:07', '2025-09-14 22:46:10', 2, 2);
INSERT INTO `sys_dept` VALUES (171, '维嘉', 0, '0', 1, 1, 0, '2023-06-27 19:52:26', '2023-06-27 19:52:26', NULL, NULL);
INSERT INTO `sys_dept` VALUES (175, '1122', 0, '0', 1, 1, 0, '2023-06-27 20:26:27', '2023-06-27 20:26:27', NULL, NULL);
INSERT INTO `sys_dept` VALUES (176, '你是1', 171, '0,1', 1, 1, 0, '2025-09-14 22:43:13', '2025-09-13 22:43:10', NULL, NULL);
INSERT INTO `sys_dept` VALUES (177, '你是2', 176, '0,1,2', 1, 1, 0, '2025-09-14 22:43:16', '2025-09-14 22:43:14', NULL, NULL);

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `typeCode` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '字典类型编码',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典项名称',
  `value` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典项值',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  `status` tinyint NULL DEFAULT 0 COMMENT '状态(1:正常;0:禁用)',
  `defaulted` tinyint NULL DEFAULT 0 COMMENT '是否默认(1:是;0:否)',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '备注',
  `createTime` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建时间',
  `updateTime` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 77 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典数据表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES (1, 'gender', '男', '1', 1, 1, 0, '', '2025-09-14 17:43:10', '2025-09-14 17:43:10');
INSERT INTO `sys_dict` VALUES (2, 'gender', '女', '2', 2, 1, 0, NULL, '2019-04-19 11:33:00', '2019-07-02 14:23:05');
INSERT INTO `sys_dict` VALUES (72, '122', '数1', '1', 0, 1, 0, '', '2025-09-13 22:47:04', '2025-09-11 22:47:08');
INSERT INTO `sys_dict` VALUES (76, '122', '数2', '2', 0, 1, 0, '', '2025-09-11 22:47:10', '2025-09-11 22:47:13');

-- ----------------------------
-- Table structure for sys_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_type`;
CREATE TABLE `sys_dict_type`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键 ',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '类型名称',
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '类型编码',
  `status` tinyint(1) NULL DEFAULT 0 COMMENT '状态(0:正常;1:禁用)',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createTime` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建时间',
  `updateTime` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `type_code`(`code` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 98 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典类型表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dict_type
-- ----------------------------
INSERT INTO `sys_dict_type` VALUES (1, '性别', 'gender', 1, NULL, '2019-12-06 19:03:32', '2022-06-12 16:21:28');
INSERT INTO `sys_dict_type` VALUES (97, '测试字典', '122', 1, '', '2025-09-14 22:44:44', '2025-09-13 22:44:47');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `parentId` bigint NOT NULL COMMENT '父菜单ID',
  `treePath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '父节点ID路径',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '菜单名称',
  `type` tinyint NOT NULL COMMENT '菜单类型(1:菜单；2:目录；3:外链；4:按钮)',
  `path` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '路由路径(浏览器地址栏路径)',
  `component` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组件路径(vue页面完整路径，省略.vue后缀)',
  `perm` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `visible` tinyint(1) NOT NULL DEFAULT 1 COMMENT '显示状态(1-显示;0-隐藏)',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  `icon` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '菜单图标',
  `redirect` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '跳转路径',
  `createTime` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建时间',
  `updateTime` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 103 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '菜单管理' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, 0, '0', '系统管理', 2, '/system', 'Layout', NULL, 1, 1, 'system', '/system/user', '2021-08-27 17:12:21', '2021-08-27 17:12:21');
INSERT INTO `sys_menu` VALUES (2, 1, '0,1', '用户管理', 1, 'user', 'system/user/index', NULL, 1, 1, 'user', NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21');
INSERT INTO `sys_menu` VALUES (3, 1, '0,1', '角色管理', 1, 'role', 'system/role/index', NULL, 1, 2, 'role', NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21');
INSERT INTO `sys_menu` VALUES (4, 1, '0,1', '菜单管理', 1, 'menu', 'system/menu/index', NULL, 1, 3, 'menu', NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21');
INSERT INTO `sys_menu` VALUES (5, 1, '0,1', '部门管理', 1, 'dept', 'system/dept/index', NULL, 1, 4, 'tree', NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21');
INSERT INTO `sys_menu` VALUES (6, 1, '0,1', '字典管理', 1, 'dict', 'system/dict/index', NULL, 1, 5, 'dict', NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21');
INSERT INTO `sys_menu` VALUES (20, 0, '0', '多级菜单', 2, '/multi-level', 'Layout', NULL, 1, 9, 'multi_level', '/multi-level/multi-level1', '2022-02-16 23:11:00', '2022-02-16 23:11:00');
INSERT INTO `sys_menu` VALUES (21, 20, '0,20', '菜单一级', 2, 'multi-level1', 'demo/multi-level/level1', NULL, 1, 1, '', '/multi-level/multi-level2', '2022-02-16 23:13:38', '2022-02-16 23:13:38');
INSERT INTO `sys_menu` VALUES (22, 21, '0,20,21', '菜单二级', 2, 'multi-level2', 'demo/multi-level/children/level2', NULL, 1, 1, '', '/multi-level/multi-level2/multi-level3-1', '2022-02-16 23:14:23', '2022-02-16 23:14:23');
INSERT INTO `sys_menu` VALUES (23, 22, '0,20,21,22', '菜单三级-1', 1, 'multi-level3-1', 'demo/multi-level/children/children/level3-1', NULL, 1, 1, '', '', '2022-02-16 23:14:51', '2022-02-16 23:14:51');
INSERT INTO `sys_menu` VALUES (24, 22, '0,20,21,22', '菜单三级-2', 1, 'multi-level3-2', 'demo/multi-level/children/children/level3-2', NULL, 1, 2, '', '', '2022-02-16 23:15:08', '2022-02-16 23:15:08');
INSERT INTO `sys_menu` VALUES (26, 0, '0', '外部链接', 2, '/external-link', 'Layout', NULL, 1, 8, 'link', 'noredirect', '2022-02-17 22:51:20', '2022-02-17 22:51:20');
INSERT INTO `sys_menu` VALUES (30, 26, '0,26', 'document', 3, 'https://juejin.cn/post/7228990409909108793', '', NULL, 1, 1, 'document', '', '2022-02-18 00:01:40', '2022-02-18 00:01:40');
INSERT INTO `sys_menu` VALUES (31, 2, '0,1,2', '用户新增', 4, '', NULL, 'sys:user:add', 1, 1, '', '', '2022-10-23 11:04:08', '2022-10-23 11:04:11');
INSERT INTO `sys_menu` VALUES (32, 2, '0,1,2', '用户编辑', 4, '', NULL, 'sys:user:edit', 1, 2, '', '', '2022-10-23 11:04:08', '2022-10-23 11:04:11');
INSERT INTO `sys_menu` VALUES (33, 2, '0,1,2', '用户删除', 4, '', NULL, 'sys:user:delete', 1, 3, '', '', '2022-10-23 11:04:08', '2022-10-23 11:04:11');
INSERT INTO `sys_menu` VALUES (36, 0, '0', '组件封装', 2, '/component', 'Layout', NULL, 1, 10, 'menu', '', '2022-10-31 09:18:44', '2022-10-31 09:18:47');
INSERT INTO `sys_menu` VALUES (37, 36, '0,36', '富文本编辑器', 1, 'wang-editor', 'demo/wang-editor', NULL, 1, 1, '', '', '2025-09-13 22:44:21', '2025-09-14 22:44:24');
INSERT INTO `sys_menu` VALUES (38, 36, '0,36', '图片上传', 1, 'upload', 'demo/upload', NULL, 1, 2, '', '', '2022-11-20 23:16:30', '2022-11-20 23:16:32');
INSERT INTO `sys_menu` VALUES (39, 36, '0,36', '图标选择器', 1, 'icon-selector', 'demo/icon-selector', NULL, 1, 3, '', '', '2022-11-20 23:16:30', '2022-11-20 23:16:32');
INSERT INTO `sys_menu` VALUES (40, 0, '0', '接口', 2, '/api', 'Layout', NULL, 1, 7, 'api', '', '2022-02-17 22:51:20', '2022-02-17 22:51:20');
INSERT INTO `sys_menu` VALUES (41, 40, '0,40', '接口文档', 1, 'apidoc', 'demo/api-doc', NULL, 1, 1, 'api', '', '2022-02-17 22:51:20', '2022-02-17 22:51:20');
INSERT INTO `sys_menu` VALUES (70, 3, '0,1,3', '角色新增', 4, '', NULL, 'sys:role:add', 1, 1, '', NULL, '2023-05-20 23:39:09', '2023-05-20 23:39:09');
INSERT INTO `sys_menu` VALUES (71, 3, '0,1,3', '角色编辑', 4, '', NULL, 'sys:role:edit', 1, 2, '', NULL, '2023-05-20 23:40:31', '2023-05-20 23:40:31');
INSERT INTO `sys_menu` VALUES (72, 3, '0,1,3', '角色删除', 4, '', NULL, 'sys:role:delete', 1, 3, '', NULL, '2023-05-20 23:41:08', '2023-05-20 23:41:08');
INSERT INTO `sys_menu` VALUES (73, 4, '0,1,4', '菜单新增', 4, '', NULL, 'sys:menu:add', 1, 1, '', NULL, '2023-05-20 23:41:35', '2023-05-20 23:41:35');
INSERT INTO `sys_menu` VALUES (74, 4, '0,1,4', '菜单编辑', 4, '', NULL, 'sys:menu:edit', 1, 3, '', NULL, '2023-05-20 23:41:58', '2023-05-20 23:41:58');
INSERT INTO `sys_menu` VALUES (75, 4, '0,1,4', '菜单删除', 4, '', NULL, 'sys:menu:delete', 1, 3, '', NULL, '2023-05-20 23:44:18', '2023-05-20 23:44:18');
INSERT INTO `sys_menu` VALUES (76, 5, '0,1,5', '部门新增', 4, '', NULL, 'sys:dept:add', 1, 1, '', NULL, '2023-05-20 23:45:00', '2023-05-20 23:45:00');
INSERT INTO `sys_menu` VALUES (77, 5, '0,1,5', '部门编辑', 4, '', NULL, 'sys:dept:edit', 1, 2, '', NULL, '2023-05-20 23:46:16', '2023-05-20 23:46:16');
INSERT INTO `sys_menu` VALUES (78, 5, '0,1,5', '部门删除', 4, '', NULL, 'sys:dept:delete', 1, 3, '', NULL, '2023-05-20 23:46:36', '2023-05-20 23:46:36');
INSERT INTO `sys_menu` VALUES (79, 6, '0,1,6', '字典类型新增', 4, '', NULL, 'sys:dict_type:add', 1, 1, '', NULL, '2023-05-21 00:16:06', '2023-05-21 00:16:06');
INSERT INTO `sys_menu` VALUES (81, 6, '0,1,6', '字典类型编辑', 4, '', NULL, 'sys:dict_type:edit', 1, 2, '', NULL, '2023-05-21 00:27:37', '2023-05-21 00:27:37');
INSERT INTO `sys_menu` VALUES (84, 6, '0,1,6', '字典类型删除', 4, '', NULL, 'sys:dict_type:delete', 1, 3, '', NULL, '2023-05-21 00:29:39', '2023-05-21 00:29:39');
INSERT INTO `sys_menu` VALUES (85, 6, '0,1,6', '字典数据新增', 4, '', NULL, 'sys:dict:add', 1, 4, '', NULL, '2023-05-21 00:46:56', '2023-05-21 00:47:06');
INSERT INTO `sys_menu` VALUES (86, 6, '0,1,6', '字典数据编辑', 4, '', NULL, 'sys:dict:edit', 1, 5, '', NULL, '2023-05-21 00:47:36', '2023-05-21 00:47:36');
INSERT INTO `sys_menu` VALUES (87, 6, '0,1,6', '字典数据删除', 4, '', NULL, 'sys:dict:delete', 1, 6, '', NULL, '2023-05-21 00:48:10', '2023-05-21 00:48:20');
INSERT INTO `sys_menu` VALUES (88, 2, '0,1,2', '重置密码', 4, '', NULL, 'sys:user:reset_pwd', 1, 4, '', NULL, '2023-05-21 00:49:18', '2023-05-21 00:49:18');
INSERT INTO `sys_menu` VALUES (96, 0, '0', '合同菜单', 2, '/contract', 'Layout', NULL, 1, 8, 'close_all', NULL, '2025-09-13 22:44:29', '2025-09-14 22:44:32');
INSERT INTO `sys_menu` VALUES (99, 96, '0,1', '合同管理', 1, 'contractIndex', 'contract/contractIndex/index', NULL, 1, 1, 'brand', NULL, '2025-09-13 22:44:32', '2025-09-14 22:44:36');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '角色名称',
  `code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '角色编码',
  `sort` int NULL DEFAULT NULL COMMENT '显示顺序',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT '角色状态(1-正常；0-停用)',
  `dataScope` tinyint NULL DEFAULT NULL COMMENT '数据权限(0-所有数据；1-部门及子部门数据；2-本部门数据；3-本人数据)',
  `deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '逻辑删除标识(0-未删除；1-已删除)',
  `createTime` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '更新时间',
  `updateTime` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 134 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', 'ROOT', 1, 1, 0, 0, '2021-05-21 14:56:51', '2018-12-23 16:00:00');
INSERT INTO `sys_role` VALUES (2, '系统管理员', 'ADMIN', 2, 1, 1, 0, '2025-09-14 22:45:03', '2025-09-13 22:44:58');
INSERT INTO `sys_role` VALUES (3, '访问游客1', 'GUEST', 3, 1, 2, 0, '2021-05-25 23:49:05', '2023-06-26 19:41:55');
INSERT INTO `sys_role` VALUES (4, '系统管理员1', 'ADMIN1', 2, 1, 1, 0, '2025-09-14 22:45:06', '2025-09-12 22:45:04');
INSERT INTO `sys_role` VALUES (5, '系统管理员2', 'ADMIN1', 2, 1, 1, 0, '2025-09-14 22:45:10', '2025-09-18 22:45:07');
INSERT INTO `sys_role` VALUES (6, '系统管理员3', 'ADMIN1', 2, 1, 1, 0, '2025-09-14 22:45:13', '2025-09-25 22:45:11');
INSERT INTO `sys_role` VALUES (7, '系统管理员4', 'ADMIN1', 2, 1, 1, 0, '2025-09-14 22:45:17', '2025-09-10 22:45:14');
INSERT INTO `sys_role` VALUES (8, '系统管理员5', 'ADMIN1', 2, 1, 1, 0, '2025-09-14 22:45:20', '2025-09-11 22:45:18');
INSERT INTO `sys_role` VALUES (9, '系统管理员6', 'ADMIN1', 2, 1, 1, 0, '2025-09-14 22:45:24', '2025-09-04 22:45:21');
INSERT INTO `sys_role` VALUES (10, '系统管理员7', 'ADMIN1', 2, 1, 1, 0, '2025-09-14 22:45:29', '2025-09-11 22:45:26');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `roleId` bigint NOT NULL COMMENT '角色ID',
  `menuId` bigint NOT NULL COMMENT '菜单ID'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色和菜单关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (11, 1);
INSERT INTO `sys_role_menu` VALUES (11, 2);
INSERT INTO `sys_role_menu` VALUES (11, 31);
INSERT INTO `sys_role_menu` VALUES (11, 32);
INSERT INTO `sys_role_menu` VALUES (11, 33);
INSERT INTO `sys_role_menu` VALUES (11, 88);
INSERT INTO `sys_role_menu` VALUES (11, 3);
INSERT INTO `sys_role_menu` VALUES (11, 70);
INSERT INTO `sys_role_menu` VALUES (11, 71);
INSERT INTO `sys_role_menu` VALUES (11, 72);
INSERT INTO `sys_role_menu` VALUES (11, 4);
INSERT INTO `sys_role_menu` VALUES (11, 73);
INSERT INTO `sys_role_menu` VALUES (11, 74);
INSERT INTO `sys_role_menu` VALUES (11, 75);
INSERT INTO `sys_role_menu` VALUES (11, 5);
INSERT INTO `sys_role_menu` VALUES (11, 76);
INSERT INTO `sys_role_menu` VALUES (11, 77);
INSERT INTO `sys_role_menu` VALUES (11, 78);
INSERT INTO `sys_role_menu` VALUES (11, 6);
INSERT INTO `sys_role_menu` VALUES (11, 79);
INSERT INTO `sys_role_menu` VALUES (11, 81);
INSERT INTO `sys_role_menu` VALUES (11, 84);
INSERT INTO `sys_role_menu` VALUES (11, 85);
INSERT INTO `sys_role_menu` VALUES (11, 86);
INSERT INTO `sys_role_menu` VALUES (11, 87);
INSERT INTO `sys_role_menu` VALUES (2, 1);
INSERT INTO `sys_role_menu` VALUES (2, 2);
INSERT INTO `sys_role_menu` VALUES (2, 31);
INSERT INTO `sys_role_menu` VALUES (2, 32);
INSERT INTO `sys_role_menu` VALUES (2, 33);
INSERT INTO `sys_role_menu` VALUES (2, 88);
INSERT INTO `sys_role_menu` VALUES (2, 3);
INSERT INTO `sys_role_menu` VALUES (2, 70);
INSERT INTO `sys_role_menu` VALUES (2, 71);
INSERT INTO `sys_role_menu` VALUES (2, 72);
INSERT INTO `sys_role_menu` VALUES (2, 4);
INSERT INTO `sys_role_menu` VALUES (2, 73);
INSERT INTO `sys_role_menu` VALUES (2, 74);
INSERT INTO `sys_role_menu` VALUES (2, 75);
INSERT INTO `sys_role_menu` VALUES (2, 5);
INSERT INTO `sys_role_menu` VALUES (2, 76);
INSERT INTO `sys_role_menu` VALUES (2, 77);
INSERT INTO `sys_role_menu` VALUES (2, 78);
INSERT INTO `sys_role_menu` VALUES (2, 6);
INSERT INTO `sys_role_menu` VALUES (2, 79);
INSERT INTO `sys_role_menu` VALUES (2, 81);
INSERT INTO `sys_role_menu` VALUES (2, 84);
INSERT INTO `sys_role_menu` VALUES (2, 85);
INSERT INTO `sys_role_menu` VALUES (2, 86);
INSERT INTO `sys_role_menu` VALUES (2, 87);
INSERT INTO `sys_role_menu` VALUES (2, 20);
INSERT INTO `sys_role_menu` VALUES (2, 21);
INSERT INTO `sys_role_menu` VALUES (2, 22);
INSERT INTO `sys_role_menu` VALUES (2, 23);
INSERT INTO `sys_role_menu` VALUES (2, 24);
INSERT INTO `sys_role_menu` VALUES (133, 1);
INSERT INTO `sys_role_menu` VALUES (133, 2);
INSERT INTO `sys_role_menu` VALUES (133, 31);
INSERT INTO `sys_role_menu` VALUES (133, 32);
INSERT INTO `sys_role_menu` VALUES (133, 33);
INSERT INTO `sys_role_menu` VALUES (133, 88);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '用户名',
  `nickname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '昵称',
  `gender` tinyint(1) NULL DEFAULT 1 COMMENT '性别((1:男;2:女))',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '123456' COMMENT '密码',
  `deptId` int NULL DEFAULT NULL COMMENT '部门ID',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '用户头像',
  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '联系方式',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT '用户状态((1:正常;0:禁用))',
  `email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '用户邮箱',
  `deleted` tinyint(1) NULL DEFAULT 0 COMMENT '逻辑删除标识(0:未删除;1:已删除)',
  `createTime` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建时间',
  `updateTime` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `login_name`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 302 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'root', '有来技术', 0, '123456', NULL, 'https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif', '17621590365', 1, 'youlaitech@163.com', 0, '2025-09-20 22:45:40', '2025-09-18 22:45:43');
INSERT INTO `sys_user` VALUES (2, 'admin', '系统管理员', 1, '123456', 1, 'https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif', '17621210366', 1, '', 0, '2019-10-10 13:41:22', '2022-07-31 12:39:30');
INSERT INTO `sys_user` VALUES (3, 'test', '测试小用户', 1, '123456', 3, 'https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif', '17621210366', 1, 'youlaitech@163.com', 0, '2021-06-05 01:31:29', '2021-06-05 01:31:29');
INSERT INTO `sys_user` VALUES (5, 'admin1', '系统管理员11', 1, '123456', 1, 'https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif', '17621210366', 1, '', 0, '2019-10-10 13:41:22', '2022-07-31 12:39:30');
INSERT INTO `sys_user` VALUES (293, '11', '22', 0, '123456', 1, '', '14984426606', 1, '2a92@0ic0t0r.com.cn', 0, '2025-09-06 22:45:46', '2025-09-18 22:45:50');
INSERT INTO `sys_user` VALUES (298, 'test01', 'user', NULL, '123', 0, '', '19781970114', 0, '323c@xr91hf9.site', 0, '2025-09-13 15:03:25', '2025-09-13 15:03:25');
INSERT INTO `sys_user` VALUES (301, 'time', '时间', NULL, 'hiarc8u29b', 0, '', '19322070185', 1, '61a2@2y9651.com', 0, '2025-09-14 22:59:51', '2025-09-14 22:59:51');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `userId` bigint NOT NULL COMMENT '用户ID',
  `roleId` bigint NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`userId`, `roleId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户和角色关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1);
INSERT INTO `sys_user_role` VALUES (2, 2);
INSERT INTO `sys_user_role` VALUES (3, 3);
INSERT INTO `sys_user_role` VALUES (5, 2);
INSERT INTO `sys_user_role` VALUES (287, 2);
INSERT INTO `sys_user_role` VALUES (288, 3);
INSERT INTO `sys_user_role` VALUES (291, 3);
INSERT INTO `sys_user_role` VALUES (291, 4);
INSERT INTO `sys_user_role` VALUES (292, 1);
INSERT INTO `sys_user_role` VALUES (292, 2);
INSERT INTO `sys_user_role` VALUES (293, 2);
INSERT INTO `sys_user_role` VALUES (298, 2);
INSERT INTO `sys_user_role` VALUES (301, 2);
INSERT INTO `sys_user_role` VALUES (301, 3);

SET FOREIGN_KEY_CHECKS = 1;
