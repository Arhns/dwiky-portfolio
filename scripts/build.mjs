import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const name of ['index.html','styles.css','script.js']) await copyFile(name,'dist/'+name);
await cp('public','dist/public',{recursive:true});
await copyFile('.nojekyll','dist/.nojekyll');
console.log('Static website ready in dist/');
