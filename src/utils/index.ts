import path from 'path'
import fs from 'fs/promises'
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