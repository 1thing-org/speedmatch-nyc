import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const routes = ['/', '/explore', '/about', '/contact'];
const baseUrl = 'http://localhost:4173';

async function prerender() {
  console.log('Starting prerendering...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    for (const route of routes) {
      console.log(`Prerendering: ${route}`);
      
      const page = await browser.newPage();
      
      // Visit page
      await page.goto(`${baseUrl}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      
      // Wait for React content loading
      await page.waitForSelector('main', { timeout: 10000 });
      
      // setTimeout wait
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Get full HTML
      const html = await page.content();
      
      // Create and save files
      if (route === '/') {
        fs.writeFileSync('dist/index.html', html);
      } else {
        const dir = `dist${route}`;
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(`${dir}/index.html`, html);
      }
      
      console.log(`Generated: ${route}`);
      await page.close();
    }
  } catch (error) {
    console.error('Prerendering failed:', error);
  } finally {
    await browser.close();
  }
  
  console.log('Prerendering complete!');
}

prerender().catch(console.error);