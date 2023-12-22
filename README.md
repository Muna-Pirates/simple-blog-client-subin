
# Simple Blog Application

This is a blog application built using React, TypeScript, and Vite. It features a comprehensive suite of functionalities including post management, user authentication, and profile management.

## Getting Started

##### Clone the Repository and Install Dependencies

```bash
git clone <repository-url>
cd <repository-name>
yarn
```

##### Running the Application

Start the application with:

```bash
yarn dev
```

Access the application at [http://localhost:7777](http://localhost:7777).

## Features

- User registration and authentication
- CRUD operations for blog posts
- Search operations for blog posts
- CRUD operations for Commenting on posts
- Assigning categories to posts
- Pagination and search for posts
- Role-based access control

### GraphQL

Uses GraphQL for data fetching. Schema and queries:

- **Schema**: `.graphqlrc` 
- **Queries**: `src/lib/graphql/graphql.ts`

Trigger codegen when there are changes in the specified GraphQL schemas

```bash
yarn watch
```


### Styling

Styled using Tailwind CSS and shadcn

## Testing

No tests currently included. Can be added using Jest and React Testing Library.

## Deployment

This guide details the steps for deploying the application using GitHub Actions, as defined in the `deploy.yaml` file.

### Prerequisites

Before you start, ensure you have the following:

- An **AWS S3 bucket** for deploying the built application.
- **AWS credentials** (access key ID and secret access key) with permissions for S3 bucket operations.
- A **CloudFront distribution** for serving the application.

### Steps for Deployment

#### 1. Set Up AWS Credentials in GitHub Secrets

Add your AWS credentials to your GitHub repository secrets:

1. Go to your repository on GitHub.
2. Click on `Settings` > `Secrets` > `New repository secret`.
3. Add the following secrets:
   - `AWS_S3_ACCESS_KEY_ID`: Your AWS access key ID.
   - `AWS_S3_SECRET_ACCESS_KEY_ID`: Your AWS secret access key.
   - `AWS_S3_BUCKET_NAME`: The name of your S3 bucket.

#### 2. Trigger the Workflow

The deployment workflow is triggered with every push to the main branch:

- Push your changes to the main branch to start the deployment process.