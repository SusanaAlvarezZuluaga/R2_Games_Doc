
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/": {
        "get": {
          "operationId": "HealthController_healthCheck",
          "summary": "Return health check status",
          "parameters": [
            {
              "name": "include",
              "required": false,
              "in": "query",
              "example": "database,services",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return health check status",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/HealthEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "health"
          ]
        }
      },
      "/api/v1/games": {
        "get": {
          "operationId": "GameController_getAllActiveGamesThatSatisfyDateCriteria",
          "summary": "Get currently active games that satisfy the criteria start date and end date",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of currently active games that satisfy the criteria start date and end date",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/GameDto"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Couldn't get games"
            },
            "404": {
              "description": "Game Prizes couldn't be retrieved"
            }
          },
          "tags": [
            "games"
          ]
        }
      },
      "/api/v1/games/{id}": {
        "get": {
          "operationId": "GameController_getGameById",
          "summary": "Get Game by Id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": 1,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get Game by id",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GameDto"
                  }
                }
              }
            },
            "404": {
              "description": "Game not found"
            }
          },
          "tags": [
            "games"
          ]
        }
      },
      "/api/v1/games/play/{id}": {
        "post": {
          "operationId": "GameController_playGame",
          "summary": "Play game: This endpoint returns the prize that the customer will win when playing the game",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Game can be played and the prize the user will win is returned ",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GamePrizeDto"
                  }
                }
              }
            },
            "400": {
              "description": "The movement amount is not valid. There are not enough tickets"
            },
            "404": {
              "description": "Game is not available to play right now"
            }
          },
          "tags": [
            "games"
          ]
        }
      },
      "/api/v1/tickets": {
        "get": {
          "operationId": "TicketsController_getCurrentNetaTickets",
          "summary": "Get Customer current neta tickets using user token",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get Game by id",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "number"
                  }
                }
              }
            },
            "404": {
              "description": "Register not found"
            }
          },
          "tags": [
            "tickets"
          ]
        },
        "post": {
          "operationId": "TicketsController_updateCustomerNetaTickets",
          "summary": "Updates the register in table customer.currentNetaTickets and creates register in table ledger. A token is needed",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ModifyTicketsDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created register",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TicketsDto"
                  }
                }
              }
            },
            "400": {
              "description": "The movement amount is not valid. There are not enough tickets"
            }
          },
          "tags": [
            "tickets"
          ]
        }
      },
      "/api/v1/tickets/referral-code": {
        "post": {
          "operationId": "TicketsController_updateCustomerNetaTicketsByReferralCode",
          "summary": "Updates the register in table customer.currentNetaTickets and creates register in table ledger. No authentication token needed",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ModifyTicketsDtoByReferralCode"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created register",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TicketsDto"
                  }
                }
              }
            },
            "400": {
              "description": "The movement amount is not valid. There are not enough tickets"
            }
          },
          "tags": [
            "tickets"
          ]
        }
      },
      "/api/v1/tickets/{id}": {
        "post": {
          "operationId": "TicketsController_updateCustomerNetaTicketsById",
          "summary": "Updates the register in table customer.currentNetaTickets and creates register in table ledger",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ModifyTicketsDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created register",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TicketsDto"
                  }
                }
              }
            },
            "400": {
              "description": "The movement amount is not valid. There are not enough tickets"
            }
          },
          "tags": [
            "tickets"
          ]
        }
      }
    },
    "info": {
      "title": "API Doc - MS GAMES",
      "description": "",
      "version": "1.0.0",
      "contact": {}
    },
    "tags": [],
    "servers": [
      {
        "url": ""
      }
    ],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        },
        "cookie": {
          "type": "apiKey",
          "in": "cookie",
          "name": "token"
        }
      },
      "schemas": {
        "HealthEntity": {
          "type": "object",
          "properties": {
            "alive": {
              "type": "boolean",
              "description": "Indicate if micro service is alive."
            },
            "name": {
              "type": "string",
              "description": "Micro service name."
            },
            "version": {
              "type": "string",
              "description": "Micro service version."
            },
            "environment": {
              "type": "string",
              "description": "Environment where it is running."
            },
            "status": {
              "type": "string",
              "description": "Indicate micro service status"
            },
            "info": {
              "type": "object",
              "description": "Includes information"
            },
            "details": {
              "type": "object",
              "description": "Includes more details information"
            },
            "error": {
              "type": "object",
              "description": "Error information"
            }
          },
          "required": [
            "alive",
            "name",
            "version",
            "environment",
            "status",
            "info",
            "details",
            "error"
          ]
        },
        "GameDto": {
          "type": "object",
          "properties": {
            "Id": {
              "type": "number",
              "example": 1
            },
            "TypeId": {
              "type": "number",
              "example": 1
            },
            "TypeName": {
              "type": "string",
              "example": "Roulette"
            },
            "TicketCost": {
              "type": "number",
              "example": 5
            },
            "Description": {
              "type": "string",
              "example": "Juega la ruleta!!"
            },
            "NumberOfPrizes": {
              "type": "number",
              "example": 7
            },
            "PrizeList": {
              "example": [
                {
                  "Id": 1,
                  "Type": "coin",
                  "ImageURL": "https://r2-games-assets.s3.us-east-2.amazonaws.com/prize_1.png",
                  "Amount": 0,
                  "ProductId": null,
                  "Probability": 0.5
                },
                {
                  "Id": 2,
                  "Type": "coin",
                  "ImageURL": "https://r2-games-assets.s3.us-east-2.amazonaws.com/prize_2.png",
                  "Amount": 500,
                  "ProductId": null,
                  "Probability": 0.05
                }
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "StartDateUTC": {
              "type": "string",
              "example": "2022-08-17T00:00:00.000Z"
            },
            "EndDateUTC": {
              "type": "string",
              "example": "2022-08-30T00:00:00.000Z"
            },
            "CanPlayStartTimeUTC": {
              "type": "string",
              "example": "02:36:00"
            },
            "CanPlayEndTimeUTC": {
              "type": "string",
              "example": "07:36:00"
            },
            "CreatedOnUTC": {
              "type": "string",
              "example": "2022-08-05T00:00:00.000Z"
            },
            "IsActive": {
              "type": "number",
              "example": 1
            },
            "CanPlay": {
              "type": "number",
              "example": 1
            }
          },
          "required": [
            "Id",
            "TypeId",
            "TypeName",
            "TicketCost",
            "Description",
            "NumberOfPrizes",
            "PrizeList",
            "StartDateUTC",
            "EndDateUTC",
            "CanPlayStartTimeUTC",
            "CanPlayEndTimeUTC",
            "CreatedOnUTC",
            "IsActive",
            "CanPlay"
          ]
        },
        "GamePrizeDto": {
          "type": "object",
          "properties": {
            "Id": {
              "type": "number",
              "example": 1
            },
            "Type": {
              "type": "string",
              "example": "coin"
            },
            "ImageUrl": {
              "type": "string",
              "example": "https://r2-games-assets.s3.us-east-2.amazonaws.com/prize_1.png"
            },
            "Amount": {
              "type": "number",
              "example": 100
            },
            "ProductId": {
              "type": "number",
              "example": 40
            },
            "Probability": {
              "type": "number",
              "example": 0.2
            }
          },
          "required": [
            "Id",
            "Type",
            "ImageUrl",
            "Amount",
            "ProductId",
            "Probability"
          ]
        },
        "ModifyTicketsDtoByReferralCode": {
          "type": "object",
          "properties": {
            "CustomerReferralCode": {
              "type": "string",
              "description": "customer's referral code",
              "example": "susana-9382"
            },
            "MovementAmount": {
              "type": "number",
              "description": "number of tickets that will be added or removed to the customer",
              "example": 20
            },
            "MovementDescription": {
              "type": "string",
              "description": "movement description which will only be seen inside the company",
              "example": "PG-25"
            },
            "MovementDescriptionForEU": {
              "type": "string",
              "description": "movement description which will be seen by the customer",
              "example": "Juego ruleta Aug 18,2022"
            }
          },
          "required": [
            "CustomerReferralCode",
            "MovementAmount",
            "MovementDescription",
            "MovementDescriptionForEU"
          ]
        },
        "TicketsDto": {
          "type": "object",
          "properties": {
            "Id": {
              "type": "number",
              "example": 1
            },
            "PreviousBalance": {
              "type": "number",
              "example": 10
            },
            "NewBalance": {
              "type": "number",
              "example": 15
            },
            "MovementTypeId": {
              "type": "number",
              "example": 10
            },
            "MovementAmount": {
              "type": "number",
              "example": 5
            },
            "MovementDescription": {
              "type": "string",
              "example": "RC-ORDER-1110535"
            },
            "MovementDescriptioEU": {
              "type": "string",
              "example": "Susana usó tu codigo de referido en su compra"
            },
            "CustomerId": {
              "type": "string",
              "example": 1110535
            },
            "CreatedOnUTC": {
              "type": "string",
              "example": "2022-08-22T00:09:20.000Z"
            }
          },
          "required": [
            "Id",
            "PreviousBalance",
            "NewBalance",
            "MovementTypeId",
            "MovementAmount",
            "MovementDescription",
            "MovementDescriptioEU",
            "CustomerId",
            "CreatedOnUTC"
          ]
        },
        "ModifyTicketsDto": {
          "type": "object",
          "properties": {
            "MovementAmount": {
              "type": "number",
              "description": "number of tickets that will be added or removed to the customer",
              "example": 20
            },
            "MovementDescription": {
              "type": "string",
              "description": "movement description which will only be seen inside the company",
              "example": "PG-25"
            },
            "MovementDescriptionForEU": {
              "type": "string",
              "description": "movement description which will be seen by the customer",
              "example": "Juego ruleta Aug 18,2022"
            }
          },
          "required": [
            "MovementAmount",
            "MovementDescription",
            "MovementDescriptionForEU"
          ]
        }
      }
    }
  },
  "customOptions": {},
  "swaggerUrl": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
