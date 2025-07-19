const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.'));

// Serve admin panel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Save file endpoint
app.post('/save-file', async (req, res) => {
    try {
        const { filePath, content } = req.body;
        
        if (!filePath || !content) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing filePath or content' 
            });
        }

        // Security: only allow saving HTML files in the parent directory
        const normalizedPath = path.normalize(filePath);
        const allowedExtensions = ['.html'];
        const fileExt = path.extname(normalizedPath);
        
        if (!allowedExtensions.includes(fileExt)) {
            return res.status(403).json({ 
                success: false, 
                error: 'Only HTML files are allowed' 
            });
        }

        // Ensure the path is within the project directory
        const projectRoot = path.resolve(__dirname, '..');
        const targetPath = path.resolve(__dirname, normalizedPath);
        
        if (!targetPath.startsWith(projectRoot)) {
            return res.status(403).json({ 
                success: false, 
                error: 'Access denied: Path outside project directory' 
            });
        }

        // Create backup
        try {
            const backupPath = targetPath + '.backup';
            await fs.copyFile(targetPath, backupPath);
            console.log(`Backup created: ${backupPath}`);
        } catch (backupError) {
            console.warn('Could not create backup:', backupError.message);
        }

        // Save the file
        await fs.writeFile(targetPath, content, 'utf8');
        
        console.log(`File saved successfully: ${targetPath}`);
        
        res.json({ 
            success: true, 
            message: 'File saved successfully',
            filePath: targetPath
        });
        
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Get file content endpoint
app.get('/get-file/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '..', filename);
        
        // Security check
        const projectRoot = path.resolve(__dirname, '..');
        const targetPath = path.resolve(filePath);
        
        if (!targetPath.startsWith(projectRoot)) {
            return res.status(403).json({ 
                success: false, 
                error: 'Access denied' 
            });
        }
        
        const content = await fs.readFile(targetPath, 'utf8');
        res.json({ 
            success: true, 
            content: content 
        });
        
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        message: 'Admin panel server is running'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Admin Panel Server running on http://localhost:${PORT}`);
    console.log(`📁 Admin Panel: http://localhost:${PORT}/admin`);
    console.log(`📂 Project Root: ${path.resolve(__dirname, '..')}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down admin panel server...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down admin panel server...');
    process.exit(0);
}); 