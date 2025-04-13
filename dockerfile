FROM node:22-alpine

# Additional Dependencies
RUN apk add bash --no-cache

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .
COPY shyftlabs-dsl-v*.tgz ./
RUN rm -rf node_modules yarn.lock && yarn cache clean && yarn install --frozen-lockfile --non-interactive --silent

# Copy app source
COPY . .

ARG BUILD_TAG
ENV NEXT_PUBLIC_BUILD_TAG=$BUILD_TAG

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

ARG NEXT_PUBLIC_APP_BASE_URL
ENV NEXT_PUBLIC_APP_BASE_URL=$NEXT_PUBLIC_APP_BASE_URL


# TODO -- Remove these echo after debuging the env variables issue.
RUN echo "NEXT_PUBLIC_BUILD_TAG = $NEXT_PUBLIC_BUILD_TAG"
RUN echo "NEXT_PUBLIC_API_BASE_URL = $NEXT_PUBLIC_API_BASE_URL"
RUN echo "NEXT_PUBLIC_APP_BASE_URL = $NEXT_PUBLIC_APP_BASE_URL"

# Compile application
RUN yarn build

ENTRYPOINT ["/bin/bash", "-c", "yarn start"]

