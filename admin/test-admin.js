// Test script for admin panel functionality
console.log('Testing admin panel functionality...');

// Test 1: Check if server is running
async function testServerConnection() {
    try {
        const response = await fetch('/health');
        const data = await response.json();
        console.log('✅ Server connection test:', data);
        return true;
    } catch (error) {
        console.error('❌ Server connection test failed:', error);
        return false;
    }
}

// Test 2: Check if gallery.html can be read
async function testGalleryFileRead() {
    try {
        const response = await fetch('/get-file/gallery.html');
        const data = await response.json();
        if (data.success) {
            console.log('✅ Gallery file read test: Success');
            console.log('File size:', data.content.length, 'characters');
            return true;
        } else {
            console.error('❌ Gallery file read test failed:', data.error);
            return false;
        }
    } catch (error) {
        console.error('❌ Gallery file read test failed:', error);
        return false;
    }
}

// Test 3: Check if gallery items can be extracted
async function testGalleryItemExtraction() {
    try {
        const response = await fetch('/get-file/gallery.html');
        const data = await response.json();
        if (!data.success) {
            console.error('❌ Gallery item extraction test failed: Could not read file');
            return false;
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data.content;
        const items = tempDiv.querySelectorAll('.gallery-item');
        
        console.log('✅ Gallery item extraction test: Found', items.length, 'items');
        return items.length > 0;
    } catch (error) {
        console.error('❌ Gallery item extraction test failed:', error);
        return false;
    }
}

// Run all tests
async function runTests() {
    console.log('🚀 Starting admin panel tests...\n');
    
    const tests = [
        { name: 'Server Connection', fn: testServerConnection },
        { name: 'Gallery File Read', fn: testGalleryFileRead },
        { name: 'Gallery Item Extraction', fn: testGalleryItemExtraction }
    ];
    
    let passed = 0;
    let total = tests.length;
    
    for (const test of tests) {
        console.log(`\n📋 Running test: ${test.name}`);
        const result = await test.fn();
        if (result) {
            passed++;
        }
    }
    
    console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);
    
    if (passed === total) {
        console.log('🎉 All tests passed! Admin panel should be working correctly.');
    } else {
        console.log('⚠️  Some tests failed. Check the console for details.');
    }
}

// Run tests when script is loaded
if (typeof window !== 'undefined') {
    // Browser environment
    window.addEventListener('load', runTests);
} else {
    // Node.js environment
    runTests();
} 