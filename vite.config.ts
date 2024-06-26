import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';
import dts from 'vite-plugin-dts';

const getPackageName = () => {
    return packageJson.name.split('/').pop() ?? packageJson.name;
};

const getPackageNameCamelCase = () => {
    try {
        return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
    } catch (err) {
        throw new Error('Name property in package.json is missing.');
    }
};

const fileName = {
    es: `main.mjs`,
    umd: `main.umd.cjs`,
    cjs: `main.cjs`,
    iife: `main.iife.js`,
};

const isDemo = process.env.BUILD === 'demo';

const dtsPlugins =
    isDemo
        ? []
        : [
            dts({
                insertTypesEntry: true,
            }),
        ];

export default defineConfig({
    /* root: 'demo', */
    plugins: [react(), ...dtsPlugins],
    build: {
        outDir: isDemo ? 'demo-dist' : 'dist',
        lib:
            process.env.BUILD === 'demo'
                ? undefined
                : {
                    entry: path.resolve(__dirname, 'src/main.ts'),
                    name: getPackageNameCamelCase(),
                    formats: ['umd', 'es'],
                    fileName: (format) => fileName[format],
                },

        rollupOptions: {
            external: isDemo ? [] : ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'reactdom',
                },
            },
        },
    },
});
