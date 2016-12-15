module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        ts : {
            app : {
                files : [{
                    src: ["src/\*\*/\*.ts", "!src/.baseDir.ts", "!src/_all.d.ts"],
                    dest: "."
                }],
                options : {
                    module : "commonjs",
                    noLib : true,
                    target : "es6",
                    sourceMap : false
                }
            },
            client : {
                tsconfig: 'public/javascripts/client/tsconfig.json'
            }
        },
        watch: {
            ts: {
                files: ["js/src/\*\*/\*.ts", "src/\*\*/\*.ts" , "public/javascripts/client/\*\*/\*.ts"],
                tasks: ["ts"]
            }
        }
    })

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("default", [
        "ts"
    ]);
};