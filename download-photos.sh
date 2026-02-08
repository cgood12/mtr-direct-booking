#!/bin/bash
# Run this script to download photos from FurnishedFinder.
# Cloudflare blocks curl/wget, so use a browser or this Python approach:
#
# Option 1: Open each URL in a browser and Save As to the photos/ directory
# Option 2: Use the Python script below (uses requests with session cookies)

cd "$(dirname "$0")/photos"

declare -A URLS=(
  ["living-room.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576145-full.jpg"
  ["kitchen-dining.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576142-full.jpg"
  ["kitchen.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576237-full.jpg"
  ["master-bedroom.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576167-full.jpg"
  ["second-bedroom.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576169-full.jpg"
  ["third-bedroom.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576170-full.jpg"
  ["primary-bathroom.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576173-full.jpg"
  ["second-bathroom.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576174-full.jpg"
  ["workspace.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576178-full.jpg"
  ["dining-area.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576184-full.jpg"
  ["hallway.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576213-full.jpg"
  ["additional-living.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576189-full.jpg"
  ["laundry.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576209-full.jpg"
  ["backyard-hottub.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576214-full.jpg"
  ["jacuzzi.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576242-full.jpg"
  ["firepit.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576215-full.jpg"
  ["weber-grill.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576241-full.jpg"
  ["gated-parking.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576216-full.jpg"
  ["front-porch.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576218-full.jpg"
  ["street-view.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576219-full.jpg"
  ["neighborhood-view.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576220-full.jpg"
  ["outdoor-living.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576232-full.jpg"
  ["evening-exterior.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576233-full.jpg"
  ["gazebo-backyard.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576236-full.jpg"
  ["outdoor-area.jpg"]="https://www.furnishedfinder.com/_pdp_/946153/1/946153_1_61576238-full.jpg"
  ["hosts-chad-michelle.jpg"]="https://staticusers.furnishedfinder.com/_pv_/adb2080b-57e6-41bb-977b-6500d580e361.jpeg"
)

for name in "${!URLS[@]}"; do
  echo "Download: ${URLS[$name]}"
  echo "  Save as: $name"
done

echo ""
echo "Cloudflare blocks automated downloads. Open each URL in Chrome and save to photos/ directory."
