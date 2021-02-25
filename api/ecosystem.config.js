module.exports = {
    apps: [
        {
            script: "./dist/index.js",
            cwd: "./",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
            exec_mode: "cluster",
            kill_timeout: 10000,
            name: "blog",
            wait_ready: true,
            watch: false,
            error_file: "./logs/app-err.log",
            out_file: "./logs/app-out.log",
            ignore_watch: ["node_modules"],
            watch_options: {
                usePolling: true,
            },
        },
    ],
};
