const swaggerDef = {
    openapi: '3.0.0',
    info: {
      title: 'API REST',
      version: '1.0.0',
      description: 'Mi API REST documentada con swagger',
    },
    "tags": [
      {
        "name": "Users operations",
        "description": "Operations related to users"
      },
      {
        "name": "Post operations",
        "description": "Operations related to post"
      },
      {
        "name": "Comments operations",
        "description": "Operations related to comments"
      },
      {
        "name": "Notifications operations",
        "description": "Operations related to notifications"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
        schemas: {
          Notification: {
            type: 'object',
            properties: {
                userToNotify: {
                type: 'integer',
                format: 'int64',
              },
              viewed: {
                type: 'boolean',
              },
              commentePost: {
                type: 'integer',
                format: 'int64',
              },
              created: {
                type: 'string',
                format: 'date-time',
              },
            },
          },
        },
      },
  };
  
  module.exports = swaggerDef;