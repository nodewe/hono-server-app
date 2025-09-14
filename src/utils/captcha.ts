export interface MathCaptchaResult {
    question: string;    // 数学问题，如 "3 + 5 = ?"
    answer: number;      // 正确答案
    data: string;        // SVG base64 数据
    svg: string;         // 原始 SVG
  }
  
  export interface MathCaptchaOptions {
    width?: number;
    height?: number;
    noiseLevel?: number; // 噪声级别 1-5
    color?: boolean;     // 是否彩色
    difficulty?: 'easy' | 'medium' | 'hard'; // 难度级别
  }
  
  export class MathCaptchaGenerator {
    private width: number = 180;
    private height: number = 60;
  
    generate(options?: MathCaptchaOptions): MathCaptchaResult {
      const width = options?.width || this.width;
      const height = options?.height || this.height;
      const noiseLevel = options?.noiseLevel || 3;
      const useColor = options?.color || false;
      const difficulty = options?.difficulty || 'medium';
  
      // 生成数学问题和答案
      const { question, answer } = this.generateMathProblem(difficulty);
      
      // 生成 SVG
      const svg = this.generateSvg(question, width, height, noiseLevel, useColor);
      
      // 转换为 base64
      const base64Data = Buffer.from(svg).toString('base64');
      
      return {
        question,
        answer,
        data: `data:image/svg+xml;base64,${base64Data}`,
        svg
      };
    }
  
    private generateMathProblem(difficulty: 'easy' | 'medium' | 'hard'): { question: string; answer: number } {
      const operations = ['+', '-', '*'];
      let a: number, b: number, operation: string;
  
      switch (difficulty) {
        case 'easy':
          // 简单：只有加法，数字小
          a = Math.floor(Math.random() * 10) + 1;
          b = Math.floor(Math.random() * 10) + 1;
          operation = '+';
          break;
  
        case 'medium':
          // 中等：加减法，数字稍大
          a = Math.floor(Math.random() * 20) + 1;
          b = Math.floor(Math.random() * 15) + 1;
          operation = operations[Math.floor(Math.random() * 2)]; // + 或 -
          break;
  
        case 'hard':
          // 困难：加减乘，数字更大
          a = Math.floor(Math.random() * 30) + 1;
          b = Math.floor(Math.random() * 20) + 1;
          operation = operations[Math.floor(Math.random() * 3)]; // +, -, 或 *
          break;
  
        default:
          a = Math.floor(Math.random() * 10) + 1;
          b = Math.floor(Math.random() * 10) + 1;
          operation = '+';
      }
  
      // 确保减法结果不为负数
      if (operation === '-' && a < b) {
        [a, b] = [b, a]; // 交换数字
      }
  
      let answer: number;
      switch (operation) {
        case '+': answer = a + b; break;
        case '-': answer = a - b; break;
        case '*': answer = a * b; break;
        default: answer = a + b;
      }
  
      // 生成问题文本
      const question = `${a} ${operation} ${b} = ?`;
  
      return { question, answer };
    }
  
    private generateSvg(question: string, width: number, height: number, noiseLevel: number, useColor: boolean): string {
      // 生成随机背景色
      const backgroundColor = useColor ? this.getRandomLightColor() : '#f8f9fa';
      const textColor = useColor ? this.getRandomDarkColor() : '#333333';
  
      let svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${backgroundColor}" rx="8" ry="8"/>
  `;
  
      // 添加噪声
      svg += this.generateNoise(noiseLevel, width, height, useColor);
  
      // 添加数学问题文本
      const fontSize = 22;
      const x = width / 2;
      const y = height / 2 + fontSize / 3;
  
      svg += `  <text x="${x}" y="${y}" 
              font-family="Arial, sans-serif" 
              font-size="${fontSize}" 
              fill="${textColor}" 
              text-anchor="middle"
              font-weight="bold"
              style="user-select: none;">${question}</text>
  `;
  
      // 添加装饰线条
      svg += this.generateDecorationLines(width, height, useColor);
  
      svg += `</svg>`;
  
      return svg;
    }
  
    private generateNoise(level: number, width: number, height: number, useColor: boolean): string {
      let noiseSvg = '';
      const noiseCount = level * 25;
  
      // 噪声点
      for (let i = 0; i < noiseCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.5 + 0.5;
        const opacity = Math.random() * 0.2 + 0.05;
        
        const color = useColor ? this.getRandomColor() : '#666';
  
        noiseSvg += `  <circle cx="${x}" cy="${y}" r="${size}" fill="${color}" opacity="${opacity}"/>\n`;
      }
  
      // 干扰线
      for (let i = 0; i < level * 2; i++) {
        const x1 = Math.random() * width;
        const y1 = Math.random() * height;
        const x2 = x1 + (Math.random() * 40 - 20);
        const y2 = y1 + (Math.random() * 40 - 20);
        const strokeWidth = Math.random() * 0.8 + 0.2;
        const opacity = Math.random() * 0.15 + 0.05;
        
        const color = useColor ? this.getRandomColor() : '#888';
  
        noiseSvg += `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${strokeWidth}" opacity="${opacity}"/>\n`;
      }
  
      return noiseSvg;
    }
  
    private generateDecorationLines(width: number, height: number, useColor: boolean): string {
      let lines = '';
      
      // 顶部装饰线
      lines += `  <line x1="10" y1="12" x2="${width - 10}" y2="12" stroke="${useColor ? '#4ECDC4' : '#ddd'}" stroke-width="2" stroke-dasharray="5,3"/>\n`;
      
      // 底部装饰线
      lines += `  <line x1="15" y1="${height - 12}" x2="${width - 15}" y2="${height - 12}" stroke="${useColor ? '#FF6B6B' : '#ddd'}" stroke-width="2" stroke-dasharray="3,5"/>\n`;
      
      // 两侧装饰线
      lines += `  <line x1="8" y1="20" x2="8" y2="${height - 20}" stroke="${useColor ? '#45B7D1' : '#eee'}" stroke-width="1.5"/>\n`;
      lines += `  <line x1="${width - 8}" y1="20" x2="${width - 8}" y2="${height - 20}" stroke="${useColor ? '#45B7D1' : '#eee'}" stroke-width="1.5"/>\n`;
  
      return lines;
    }
  
    private getRandomColor(): string {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#77DD77', '#FDFD96', '#836953', '#779ECB'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  
    private getRandomLightColor(): string {
      const colors = ['#f8f9fa', '#e9ecef', '#f1f3f5', '#f8f0fc', '#e6fcf5', '#fff9db'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  
    private getRandomDarkColor(): string {
      const colors = ['#212529', '#343a40', '#495057', '#5c7cfa', '#e67700', '#0b7285'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }
  
  // 单例导出
  export const mathCaptchaGenerator = new MathCaptchaGenerator();