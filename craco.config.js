const path = require('path')
module.exports = {
    webpack: {
        alias: {
            '@authentication': path.resolve(__dirname, 'src/app/modules/authentication'),
            '@dashboard': path.resolve(__dirname, 'src/app/modules/dashboard'),
            '@users': path.resolve(__dirname, 'src/app/modules/Users'),
            '@contacts': path.resolve(__dirname, 'src/app/modules/contacts'),
            '@organisations': path.resolve(__dirname, 'src/app/modules/organisations'),
            '@projects': path.resolve(__dirname, 'src/app/modules/projects'),
            '@leads': path.resolve(__dirname, 'src/app/modules/leads'),
            '@api': path.resolve(__dirname, 'src/app/api'),
            '@hooks': path.resolve(__dirname, 'src/app/hooks'),
            '@routes': path.resolve(__dirname, 'src/app/routes'),  
            '@shared': path.resolve(__dirname, 'src/app/shared'),
            '@store': path.resolve(__dirname, 'src/app/store'),
            '@util': path.resolve(__dirname, 'src/app/util'),
            '@app-types': path.resolve(__dirname, 'src/app/customTypes'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@layout': path.resolve(__dirname, 'src/app/layout'),
            "@users": path.resolve(__dirname,'./src/app/modules/Users')
        },
    },
}
    