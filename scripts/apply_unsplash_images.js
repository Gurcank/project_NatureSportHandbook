#!/usr/bin/env node

/**
 * Script to update mammals.ts with Unsplash image URLs
 */

const fs = require('fs');
const path = require('path');

const mappingFile = './scripts/mapping.mammals-unsplash.json';
const mammalsFile = './src/data/mammals.ts';

console.log('📝 Updating mammals.ts with Unsplash URLs...\n');

try {
  // Read mapping
  const mappingContent = fs.readFileSync(mappingFile, 'utf-8');
  const mapping = JSON.parse(mappingContent);
  console.log(`✅ Loaded ${Object.keys(mapping).length} image URLs\n`);

  // Read current mammals data
  let mammalsContent = fs.readFileSync(mammalsFile, 'utf-8');
  let updateCount = 0;

  // Process each mammal ID and replace its image URL
  // Pattern: looks for: image: 'old-url' or image: "old-url"
  for (const [mammalId, imageUrl] of Object.entries(mapping)) {
    // Escape special regex characters in the ID
    const escapedId = mammalId.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    
    // Find lines with this ID and update the corresponding image field
    // This pattern looks for id: 'mammalId' followed by any content until image: '...'
    const pattern = new RegExp(
      `(id: ['"]${escapedId}['"][\\s\\S]*?image: ['"]) *([^'"]*)(['"]) *`,
      'g'
    );
    
    // Count how many times we find this pattern for this specific ID
    const testPattern = new RegExp(`id: ['"]${escapedId}['"]`);
    if (testPattern.test(mammalsContent)) {
      const oldContent = mammalsContent;
      
      // Replace image URL for this specific animal
      mammalsContent = mammalsContent.replace(
        new RegExp(`(id: ['"]${escapedId}['"][\\s\\S]*?image: ['"]) *[^'"]*(['"]) *`, ''),
        (match) => {
          // Get the quote character used
          const quoteChar = match.match(/['"]$/)[0];
          return `id: '${mammalId}'` + match.substring(match.indexOf('{'), match.indexOf('image')) + 
                 `image: '${imageUrl}'`;
        }
      );
      
      if (mammalsContent !== oldContent) {
        updateCount++;
        console.log(`✅ ${mammalId}`);
      }
    }
  }

  // Simpler approach: just do a straightforward replacement for each animal
  mammalsContent = fs.readFileSync(mammalsFile, 'utf-8');
  updateCount = 0;
  
  for (const [mammalId, imageUrl] of Object.entries(mapping)) {
    // Match: id: 'animalId', ... image: 'something' (with multiline)
    const lines = mammalsContent.split('\n');
    let inCurrentAnimal = false;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(`id: '${mammalId}'`)) {
        inCurrentAnimal = true;
      }
      
      if (inCurrentAnimal && lines[i].includes(`image: '`)) {
        lines[i] = lines[i].replace(/image: '[^']*'/, `image: '${imageUrl}'`);
        updateCount++;
        inCurrentAnimal = false;
        break;
      }
      
      // Stop searching if we hit the closing brace of this animal
      if (inCurrentAnimal && lines[i].trim() === '},') {
        inCurrentAnimal = false;
      }
    }
  }
  
  mammalsContent = lines.join('\n');

  // Write updated content
  fs.writeFileSync(mammalsFile, mammalsContent, 'utf-8');
  console.log(`\n✨ Updated ${updateCount} mammal entries`);
  console.log('📍 File saved: src/data/mammals.ts');

} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
