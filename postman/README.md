# Postman Collections

This directory contains Postman collections, environments, and globals for testing the Paperview API.

## Directory Structure

```
postman/
├── collections/          # Postman collection files
│   ├── gitignore/        # Local test collections (not committed to git)
│   └── *.postman_collection.json  # Committed collections
├── environments/         # Postman environment files
├── globals/             # Postman global variables
└── README.md            # This file
```

## Collections

### Committed Collections

Collections in the `collections/` directory (excluding `gitignore/` folder) are committed to git and shared with the team:

- **Posts.postman_collection.json** - Main API collection for Posts endpoints
- **Service.postman_collection.json** - Service infrastructure endpoints (health checks, status, etc.)

### Gitignored Collections

Collections that are **not** committed to git (for local testing/playground):

- Collections in the `collections/gitignore/` folder
- Collection names should include the suffix `(.gitignore)` to clearly indicate they are not committed

## Usage

### Importing Collections

1. Open Postman
2. Click **Import** button
3. Select the collection file from `postman/collections/`
4. The collection will be imported with all requests

### Creating Local Test Collections

To create collections that won't be committed to git, place them in the `gitignore/` folder:

```
postman/collections/gitignore/MyTestCollection.postman_collection.json
```

**Important:** Collection names (the `name` field in the JSON) should include the suffix `(.gitignore)` to clearly indicate they are not committed to git. For example: `"name": "My Test Collection (.gitignore)"`

### Variables

Collections use the `{{base_url}}` variable for the API base URL. Default value is `http://localhost:3000`.

You can override this by:
- Setting it in Postman environment variables
- Setting it in Postman global variables
- Updating the collection variable directly

## API Endpoints

### Service Endpoints

The Service API collection includes:

- `GET /health` - Health check endpoint (returns status, message, uptime, and timestamp)

### Posts Endpoints

The Posts API collection includes:

- `GET /api/posts` - List up to 50 posts
- `GET /api/posts/latest` - Get latest 3 posts
- `GET /api/posts/:id` - Get single post by ID
- `POST /api/posts` - Create new post
- `PATCH /api/posts/comment/:id` - Add comment to post
- `DELETE /api/posts/:id` - Delete post by ID

## Configuration

The Postman workspace configuration is stored in `.postman/config.json`. This file tracks which collections, environments, and globals are part of the workspace.

## Notes

- All collections follow the Postman Collection v2.1.0 schema
- Collections are JSON files that can be edited manually or through Postman UI
- Remember to export collections from Postman if you make changes in the UI to keep files in sync

