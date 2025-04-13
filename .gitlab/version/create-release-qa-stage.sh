#!/usr/bin/env bash

# Create a merge request
RELEASE_BRANCH="release/$VERSION"
git checkout -b $RELEASE_BRANCH
if [ "$VERSION" ]; then
  # create pr to qa branch
  BODY_QA="{
      \"id\": ${CI_PROJECT_ID},
      \"source_branch\": \"${RELEASE_BRANCH}\",
      \"target_branch\": \"qa\",
      \"remove_source_branch\": true,
      \"squash\": true,
      \"title\": \"🤖 chore: Release PR to QA with version v$VERSION\"
  }"

  # create pr to qa branch
  BODY_STAGE="{
      \"id\": ${CI_PROJECT_ID},
      \"source_branch\": \"${RELEASE_BRANCH}\",
      \"target_branch\": \"staging\",
      \"remove_source_branch\": true,
      \"squash\": true,
      \"title\": \"🤖 chore: Release PR to Stage with version v$VERSION\"
  }"

  # Require a list of all the merge request and take a look if there is already
  # one with the same source branch
  # LISTMR=$(curl --silent "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/merge_requests?state=opened" --header "PRIVATE-TOKEN:${CI_PIPELINE_TOKEN}")

  # echo "LISTMR: $LISTMR"

  # TO DO: FIX COMMAND ISSUE FOR ALPINE IMAGES
  # COUNTBRANCHES=$(echo ${LISTMR} | grep -o "\"source_branch\":\"${BACKMERGE_BRANCH}\"" | wc -l) || "0"
  COUNTBRANCHES="0"

  # echo "Checked for Existing MRs"

  # No MR found, let's create a new one
  if [ ${COUNTBRANCHES} -eq "0" ]; then
    echo "Creating new Merge Request for QA"
    curl --fail -X POST "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/merge_requests" \
      --header "PRIVATE-TOKEN:${CI_BOT_ACCESS_TOKEN}" \
      --header "Content-Type: application/json" \
      --data "${BODY_QA}"
    echo "Opened a new merge request: \"🤖 chore: Release $VERSION\" to QA and assigned to you"
    echo "Creating new Merge Request for stage"
    curl --fail -X POST "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/merge_requests" \
      --header "PRIVATE-TOKEN:${CI_BOT_ACCESS_TOKEN}" \
      --header "Content-Type: application/json" \
      --data "${BODY_STAGE}"
    echo "Opened a new merge request: \"🤖 chore: Release $VERSION\" to stage and assigned to you"
    exit
  fi
  echo "No new merge request opened"
else
  echo "package.json doesn't have the correct version to be replaced"
fi
