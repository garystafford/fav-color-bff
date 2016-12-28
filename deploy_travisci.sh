#!/bin/sh

# Deploys ZIP build artifact to GitHub (acts as pseudo binary repository)
# (3) environment variables in .travis.yml file used here - two are encypted
# travis encrypt GH_TOKEN=<your_token_hash> --add
# travis encrypt COMMIT_AUTHOR_EMAIL=<your_email_here> --add
# export GH_COLOR_ARTIFACT_REPO=github.com/<your_repo_path>.git

# set -x # setting will expose decrypted values in the output!

zip -r dist-bff-0.1.${TRAVIS_BUILD_NUMBER}.zip dist/

rm -rf .git # remove current git config
git init
git config user.name "travis-ci"
git config user.email "${COMMIT_AUTHOR_EMAIL}"

ls -alh

git add *.zip
git commit -m "Deploy Travis CI Build #${TRAVIS_BUILD_NUMBER} artifacts to GitHub"
git ls-tree --full-tree -r HEAD
git push --force --quiet "https://${GH_TOKEN}@${GH_COLOR_ARTIFACT_REPO}" master:bff
