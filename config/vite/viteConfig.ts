import { builtinModules } from 'module';
import { resolve } from 'path';
import { UserConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import tsconfigPaths from 'vite-tsconfig-paths';
import devManifest from 'vite-plugin-dev-manifest';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteOptions } from './types/vite';

export function viteConfig( options: ViteOptions ): UserConfig {
    // @ts-ignore
    return {
        css: {
            devSourcemap: true,
        },
        define: options.define,
        publicDir: resolve( options.paths.src, 'assets' ),
        plugins: [
            visualizer( {
                template: 'treemap', // or sunburst
                open: false,
                gzipSize: true,
                brotliSize: true,
                filename: 'dist/analyse.html', // will be saved in project's root
            } ),
            devManifest( {
                manifestName: 'manifest',
            } ),
            tsconfigPaths(),
            createSvgIconsPlugin( {
                iconDirs: [ resolve( options.paths.src, 'assets', 'icons' ) ],
                symbolId: '[name]',
                svgoOptions: {
                    plugins:
                        [
                            {
                                name: 'removeAttrs',
                                params: {
                                    attrs: [ 'class', 'data-name', 'fill', 'stroke' ],
                                },
                            },
                        ],
                },
            } ),
        ],
        root: options.paths.root,
        build: {
            cssCodeSplit: true,
            manifest: true,
            outDir: options.paths.build,
            sourcemap: options.mode === 'development',
            rollupOptions: {
                input: {
                    main: resolve( options.paths.src, options.jsFile ),
                },
                output: {
                    // manualChunks: {
                    //     antd: [ 'antd' ],
                    //     mobx: [ 'mobx' ],
                    // },
                    entryFileNames: '[name].[hash].js',
                    chunkFileNames: '[name].js',
                    assetFileNames: ( assetInfo ) => {
                        // @ts-ignore
                        let extType = assetInfo.name.split( '.' )[ 1 ];

                        if ( /png|jpe?g|svg|gif|tiff|bmp|ico/i.test( extType ) ) {
                            extType = 'img';
                        }

                        if ( /css|scss/i.test( extType ) ) {
                            extType = 'css';
                        }

                        if ( extType === 'css' ) {
                            return `${ extType }/[name].[hash][extname]`;
                        }

                        return `assets/${ extType }/[name].[hash][extname]`;
                    },
                },
            },
        },
        server: {
            cors: true,
            strictPort: true,
            port: options.port,
            https: false,
            origin: options.domain,
            hmr: {
                host: options.host,
            },
        },
        resolve: {
            alias: {
                '@src': resolve( options.paths.src ),
                '@root': resolve( options.paths.root ),
            },
            extensions: [
                '.js',
                '.ts',
                '.tsx',
                '.jsx',
                '.css',
                '.scss',
                '.jpg',
                '.jpeg',
                '.png',
                '.svg',
                '.vue',
            ],
        },
    };
}
