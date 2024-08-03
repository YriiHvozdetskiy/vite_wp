

============ [DO NOT MODIFY FILES IN THE] themes/*/dist  ============



## Available Scripts

In the project directory, you can run: | У директорії проекту ви можете запустити:

### `pnpm dev`

Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.

### `pnpm build`

Builds the app for production to the `dist` folder.
It correctly bundles the app in production mode and optimizes the build for the best performance. 

### `pnpm build:dev`

Builds the app for development to the `dist` folder.
It bundles the app in development mode, which can be useful for debugging.

### `pnpm watch`

Builds the app in development mode and watches for changes.
This is useful when you're developing a theme and want to see changes without restarting the build process.

`"dev": "vite"`
[pages/*.html]
    on each page:
        <script type="module" src="/main.js"></script>


`"watch": "vite build --watch --mode development"`
[vite.config.js]
    [project_name] - replace with the project name:
        build: {
        outDir: resolve(__dirname, '../themes/project_name/dist'),
