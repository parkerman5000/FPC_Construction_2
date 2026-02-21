#!/bin/bash
# FPC Construction — Broken Image URL Fix Runner
# Date: 2026-02-20
#
# NOTE: This script is NOT APPLICABLE to the current site.
# fpcconstructions.com is a static HTML site on GitHub Pages.
# There is no WordPress installation, no WP-CLI, no database.
#
# This file exists as a placeholder per the deliverables spec.
# If the site ever migrates to WordPress, this script would run
# the SQL patch via: wp db query < fix-broken-image-urls.sql

echo "FPC Construction is a static HTML site — no database to patch."
echo "All image URLs use relative paths. No fixes needed."
echo ""
echo "To update project images, use the Image Picker tool:"
echo "  cd tools/image-picker && bun run server.ts"
echo "  Open http://localhost:3456"
exit 0
