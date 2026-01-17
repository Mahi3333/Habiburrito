import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename to avoid overwrites
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, ''); // Sanitize
        const filename = `${uniqueSuffix}-${originalName}`;

        // Save to public/uploads
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        const filepath = join(uploadDir, filename);

        // Ensure directory exists (optional, node usually needs mkdir if not exists, but public usually exists. 
        // Ideally we assume public/uploads exists or create it. 
        // I can stick to public/ if simpler, but uploads is better organization.)
        // Since I can't easily run mkdir here without fs, I'll assume it exists or try to write.
        // Actually I can allow it to fail or try to mkdir.

        try {
            await writeFile(filepath, buffer);
        } catch (err: any) {
            if (err.code === 'ENOENT') {
                // Directory doesn't exist, try creating it (requiring fs)
                const fs = require('fs');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                await writeFile(filepath, buffer);
            } else {
                throw err;
            }
        }

        const url = `/uploads/${filename}`;

        return NextResponse.json({ url });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
