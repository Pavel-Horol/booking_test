import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'

const options   = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Booking test app",
            version: '1.0.0',
            desorption: 'Api doc for this app'
        }
    },
    apis: [path.join(__dirname, './routes/**/*.ts')], 
}
const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec

