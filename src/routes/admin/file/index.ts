import { Hono } from 'hono';
import { promises as fs } from 'fs'
import { File } from 'formdata-node'
import path from 'path'
const file = new Hono()
/**
* @description 上传文件到本地服务器
*/
file.post('/upload/local', async (ctx) => {
    const formData = await ctx.req.formData()
    // console.log(formData.getAll('file'))
    const files = formData.getAll('file')
    console.log(files,'files')
    const uploadDir = path.join(process.cwd(), 'uploads')
    await fs.mkdir(uploadDir, { recursive: true })
  
    let savedFiles: any[] = []
  
    for (const file of files) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const filePath = path.join(uploadDir, file.name)
        await fs.writeFile(filePath, buffer)
        savedFiles.push({
            filePath,
            url:`http://localhost:3000/static/${file.name}`
        })
      }
    }
    //将文件存到本地服务器
    return ctx.json({
        message: `接收并保存了 ${savedFiles.length} 个文件`,
        files: savedFiles,
      })
})


export default file