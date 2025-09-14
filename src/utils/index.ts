import path from 'path'
import fs from 'fs/promises'
import fsOri from "fs"
import dayjs from 'dayjs'

/**
* @description 确保文件所在的目录存在
*/
export async function ensureDirForFile(filePath:string) {
    const dir = path.dirname(filePath)
    try {
      await fs.mkdir(dir, { recursive: true })
      console.log(`目录已确保存在: ${dir}`)
    } catch (err) {
      console.error(`创建目录失败: ${dir}`, err)
      throw err
    }
  }

/**
* @description 错误收集函数
*/
export const errorCollector = async (err:any,ctx:any)=>{ 
  const method = ctx.req.method;
  const url = ctx.req.url;
   const curTime = dayjs();
    const LOG_PATH = `logs/${curTime.format("YYYY-MM-DD")}-error.log`;
    await ensureDirForFile(LOG_PATH);
  
    fs.appendFile(
      LOG_PATH,
      `[${curTime.format("HH:mm:ss")}] ${method} ${url} ERROR - \n ${
        err.stack
      } \n`
    );
}


/**
 *@description 将扁平化的数据转化为 tree类型
 * @param list.list
 * @param list {Array} 数据源
 * @param parentFunc {Function}  父节点的的数据筛选
 * @param childFunc {Function}  后代节点的筛选
 * @param primaryKey {String}  主键字段 默认 id字段
 * @param parentKey {String}  父级id 默认 父级id
 * @param list.parentFunc
 * @param list.childFunc
 * @param list.primaryKey
 * @param list.parentKey
 * @return {Array}  tree 类型数组
 */
//@ts-ignore
 export const buildTree = ({ list, parentFunc, childFunc, primaryKey = 'id', parentKey = 'parentId' })=>{
  //@ts-ignore
  const getNode = id => {
    const nodes = [];
    for (const listElement of list) {
      if (listElement[parentKey] == id) {
        const menuItem = childFunc(listElement);
        menuItem.children = getNode(listElement[primaryKey]);

        nodes.push(menuItem);
      }
    }
    if (nodes.length === 0) return;
    return nodes;
  };

  const nodes = [];
  //筛查出数据源中tree_path 的length 最小的数 作为判断根节点的依据
  //@ts-ignore
  const min = Math.min(...list.map(ele=>ele.treePath.split(',').length))
  // 先处理顶级根节点
  for (const listElement of list) {
    if(listElement.treePath.split(',').length==min){
      const item = parentFunc(listElement);
      item.children = getNode(listElement[primaryKey]);
      nodes.push(item);
    }
    
  }
  return nodes;
}

/**
* @description 转换为模糊查询字符串
*/
export const toLikeStr = (str:string)=>{
  return str.replace(/[%_\\]/g, '\\$&');
}

/**
* @description 获取配置
*/
export const getConfig = ()=>{
  const configFilePath = path.join(process.cwd(),'config.js')
  // console.log(configFilePath)
  const externalConfig = require(configFilePath);
  // const data = fsOri.readFileSync(configFilePath,'utf8')
  // console.log(externalConfig.default,'externalConfig')
  return externalConfig
}