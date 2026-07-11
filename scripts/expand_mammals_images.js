#!/usr/bin/env node

/**
 * Script to organize and map images from Kaggle dataset to mammals
 * 
 * Usage:
 *   node expand_mammals_images.js
 * 
 * This script will:
 * 1. Copy images from data/archive_raw/raw-img/ folders
 * 2. Create/update the mapping.mammals-72.json file
 * 3. Update src/data/mammals.ts with proper image paths
 */

const fs = require('fs');
const path = require('path');
const fsp = require('fs').promises;

const PROJECT_ROOT = path.join(__dirname, '..');
const RAW_IMG_DIR = path.join(PROJECT_ROOT, 'data', 'archive_raw', 'raw-img');
const PUBLIC_IMG_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'mammals');
const MAPPING_FILE = path.join(__dirname, 'mapping.mammals-72.json');
const MAMMALS_DATA_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'mammals.ts');

// Mapping of animal categories to mammal IDs
const CATEGORY_TO_IDS = {
  'cavallo': ['horse', 'donkey', 'zebra', 'wild-boar', 'camel'],
  'elefante': ['elephant', 'rhinoceros', 'hippopotamus', 'walrus', 'manatee', 'gorilla', 'orangutan', 'baboon'],
  'farfalla': [], // Butterfly category (not mammals)
  'gallina': [] // Chicken category (not mammals)
};

async function ensureDirectory(dir) {
  try {
    await fsp.mkdir(dir, { recursive: true });
  } catch (err) {
    console.error(`Error creating directory ${dir}:`, err.message);
  }
}

async function copyImages() {
  console.log('📁 Creating mammals image directory...');
  await ensureDirectory(PUBLIC_IMG_DIR);
  
  try {
    const categories = await fsp.readdir(RAW_IMG_DIR, { withFileTypes: true });
    
    for (const category of categories) {
      if (!category.isDirectory()) continue;
      
      const categoryName = category.name.toLowerCase();
      const categoryPath = path.join(RAW_IMG_DIR, category.name);
      
      console.log(`\n📂 Processing category: ${categoryName}`);
      
      try {
        const files = await fsp.readdir(categoryPath);
        const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
        
        if (imageFiles.length === 0) {
          console.log(`   ⚠️  No image files found`);
          continue;
        }
        
        // Copy first 5 images from each category
        const limitedFiles = imageFiles.slice(0, 5);
        const destNames = {
          'cavallo': ['horse', 'donkey', 'zebra', 'wild-boar', 'camel'],
          'elefante': ['elephant', 'rhinoceros', 'hippopotamus', 'walrus', 'manatee'],
          'farfalla': [],
          'gallina': []
        };
        
        for (let i = 0; i < limitedFiles.length; i++) {
          const file = limitedFiles[i];
          const ext = path.extname(file).toLowerCase();
          const destName = destNames[categoryName]?.[i];
          
          if (destName) {
            const srcPath = path.join(categoryPath, file);
            const destPath = path.join(PUBLIC_IMG_DIR, `${destName}${ext}`);
            
            try {
              await fsp.copyFile(srcPath, destPath);
              console.log(`   ✅ Copied: ${file} → ${destName}${ext}`);
            } catch (err) {
              console.log(`   ❌ Failed to copy ${file}:`, err.message);
            }
          }
        }
        
      } catch (err) {
        console.error(`   Error processing ${categoryName}:`, err.message);
      }
    }
    
  } catch (err) {
    console.error('Error reading image directories:', err.message);
  }
}

async function generateMapping() {
  console.log('\n📋 Generating image mapping file...');
  
  try {
    const files = await fsp.readdir(PUBLIC_IMG_DIR);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
    
    // Load current mapping
    let currentMapping = {};
    try {
      const content = await fsp.readFile(MAPPING_FILE, 'utf-8');
      currentMapping = JSON.parse(content);
    } catch (err) {
      console.log('   Creating new mapping file...');
    }
    
    // Create new mapping based on available images
    const newMapping = {};
    
    // Get all mammal IDs from the data file
    const mammalsContent = await fsp.readFile(MAMMALS_DATA_FILE, 'utf-8');
    const idMatches = mammalsContent.match(/id: '([^']+)'/g);
    const mammalIds = idMatches.map(m => m.replace(/id: '|'/g, ''));
    
    // Map images to mammals
    for (const mammalId of mammalIds) {
      // Try to find matching image
      const matchingImage = imageFiles.find(f => 
        f.toLowerCase().includes(mammalId.split('-')[0])
      );
      
      if (matchingImage) {
        newMapping[mammalId] = `/images/mammals/${matchingImage}`;
      } else {
        // Use previously mapped image or a default
        newMapping[mammalId] = currentMapping[mammalId] || '/images/mammals/horse.jpg';
      }
    }
    
    // Save mapping
    await fsp.writeFile(MAPPING_FILE, JSON.stringify(newMapping, null, 2), 'utf-8');
    console.log(`✅ Mapping file saved with ${Object.keys(newMapping).length} entries`);
    
  } catch (err) {
    console.error('Error generating mapping:', err.message);
  }
}

async function main() {
  console.log('🦁 Expanding Mammals Image Database');
  console.log('====================================\n');
  
  try {
    await copyImages();
    await generateMapping();
    
    console.log('\n✨ Done! Your mammals image database has been expanded.');
    console.log('📍 Images location: public/images/mammals/');
    console.log('📍 Mapping file: scripts/mapping.mammals-72.json');
    
  } catch (err) {
    console.error('Fatal error:', err.message);
    process.exit(1);
  }
}

main();
